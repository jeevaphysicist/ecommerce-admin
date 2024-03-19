'use client'

import React, { Fragment, useEffect, useState } from 'react'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import 'quill/dist/quill.bubble.css'
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

const ReactQuill = dynamic(() => import('react-quill'), { // Dynamically import ReactQuill
  ssr: false, // Disable server-side rendering
});

const page = () => {
    const [blog,setBlog] = useState('');
    const searchParams = useSearchParams()
 
    const blogid = searchParams.get('id');
    // console.log("Blogid",blogid);

    useEffect(()=>{
         GetBlogData()
    },[]);

    const GetBlogData = async ()=>{
        let response = await fetch(`/api/blog/getsingleblog/${blogid}`);
        const data = await response.json();
        setBlog(data);
    }

   
  
    var formats = [
      "header", "height", "bold", "italic",
      "underline", "strike", "blockquote",
      "list", "color", "bullet", "indent",
      "link", "image", "align", "size","video","code-block","font","clean"
    ];


  return (
   <Suspense>
    {
        blog ? 
        <div className='w-[100%] flex items-center justify-center'>
        
        <div className='w-[100%] md:w-[700px] flex gap-5 flex-col mb-20 lg:w-[800px]'>
        <h1 className='text-[50px] font-bold'>{blog.title}</h1>
        <img src={blog.coverimage} alt="coverimage..." />
        <ReactQuill
        value={blog.blogdata}
        readOnly={true}
        theme="bubble"
       
        formats={formats}
        modules={{ toolbar: false }}
        />
      </div>
        
      </div>
     
      :
      <div>No Blog Found</div>
    }
   </Suspense>
  )
}

export default page