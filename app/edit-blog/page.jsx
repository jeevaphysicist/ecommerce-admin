"use client"
import React, { Fragment, useEffect, useState } from 'react';
import { Suspense } from 'react'
import { useSearchParams ,useRouter } from 'next/navigation'
import 'quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import { FaRegImage } from 'react-icons/fa6';
import { UploadFile } from '@components/Uploadfile';

const ReactQuill = dynamic(() => import('react-quill'), { // Dynamically import ReactQuill
  ssr: false, // Disable server-side rendering
});

const CreateBlog = () => {
    const [editblogdata,setEditBlogData] = useState(null);
    const [blogSize,setBlogSize] = useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const [edittitle,setEditTitle] = useState('');
    const [coverimage,setCoverimage] = useState('');
    const searchParams = useSearchParams();
    let router = useRouter();
 
    const blogid = searchParams.get('id');
    // console.log("Blogid",blogid);

    useEffect(()=>{
         GetBlogData()
    },[]);

    const GetBlogData = async ()=>{
        let response = await fetch(`/api/blog/getsingleblog/${blogid}`);
        const data = await response.json();
        console.log("data",data.title);
        setEditBlogData(data.blogdata);
        setEditTitle(data.title);
        setCoverimage(data.coverimage);
       
    }
    useEffect(()=>{
      let blogsize = calculateVariableSize(editblogdata);
      setBlogSize(blogsize);
    },[editblogdata])

 
  
  var modules = {
    toolbar:[
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
    
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
    
      ['clean']                                         // remove formatting button
    ]
  };

  var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size","video","code-block","font","clean"
  ];

  const handleProcedureContentChange = async (content) => {
    // console.log("content---->", content);
    setEditBlogData(content);
    let blogsize = await calculateVariableSize(editblogdata);
    setBlogSize(blogsize);
  };

  

  

  const handleUpdateBlogData = async ()=>{
        setIsLoading(true);
        let newdata = {
             Data: editblogdata,
             id: blogid,
             title:edittitle,
             coverimage         
        }
        
        let options = {
                       method:"PATCH",
                       body:JSON.stringify(newdata)
                      }
        let response = await fetch("/api/blog/edit",options);
        const data = await response.json();
        // console.log("data",data);
        setIsLoading(false);
        if(response.status===200){
           router.push(`/blog/q?id=${blogid}`)
        }
      
        
  }

  function calculateVariableSize(variable) {
    const sizeInBytes = new Blob([variable]).size;
    const sizeInMB = sizeInBytes / (1024 * 1024); // Convert bytes to megabytes
    return sizeInMB.toFixed(2);// Return the fixed number with two
}

const handlefilechange = (e)=>{
  let file = e.target.files[0];
    if (file) { 
UploadFile(file)
.then((downloadURL) => {
//  console.log("Download URL: ", downloadURL);
    setCoverimage(downloadURL);
    // setUploading2(false);
 })
.catch((error) => {
  console.error("Error:", error);
  // setUploading2(false);
 });
}
}





 

  return (
   <Suspense>
    {/* <div></div> */}
    <div >
      {/* <h1 style={{ textAlign: "center" }}>Text Editor In React JS</h1> */}
      <div className='w-[100%] mt-10 flex flex-col items-center justify-center'>
        <div className='flex items-center justify-center text-[30px] font-bold mb-10'>Edit Blog</div>
      <div className='w-[100%] md:w-[700px] h-[90vh] lg:w-[800px]'>
        <div style={{ display: "grid", justifyContent: "center"}}>
        <div className="flex items-center justify-between w-[100%]">
          <div> <span className={blogSize > 12 ? "text-[red] font-bold":""}>{blogSize}MB</span> / 12MB </div>
          <button disabled={blogSize > 12} className={`${blogSize > 12 ? " bg-[#efebeb] cursor-not-allowed": "bg-black active:bg-[#ffffff] cursor-pointer active:text-[black]"}  text-white rounded-[10px] px-4 py-2`} onClick={handleUpdateBlogData}> {isLoading ? "SAVE...": "SAVE" }</button>
        </div>
        <div className="my-5">
          <label className='ml-4 font-bold text-[black]'>Title<sup className="text-[red]">*</sup></label>
          <input type="text"  maxLength={100} value={edittitle} onChange={(e)=>setEditTitle(e.target.value)} className="w-[100%] h-[60px] border-2 rounded-[10px] text-[30px] font-bold px-5" />
        </div>
        <div className="my-5">
          <label>
          <div className="w-[100%]  flex items-center justify-center border">
                {
                coverimage ? 
                <img src={coverimage} alt="" className="w-[100%] h-[100%] object-cover"  />
                :
                <FaRegImage className="w-[80%] h-[80%]"/>
                }
              </div>
          <input type="file" onChange={handlefilechange} className="w-[100%] hidden h-[60px] border" />

          </label>
        </div>
        <ReactQuill
          value={editblogdata}
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={handleProcedureContentChange}
          style={{ height: "80vh",maxWidth:"800px" }}
        >
        </ReactQuill>
        
      </div>

      
        </div>
        </div>

      
     
     
    </div>
   </Suspense>
  )
}

export default CreateBlog