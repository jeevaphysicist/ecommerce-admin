"use client"
import Popup from '@components/Popup'
import React, { Fragment, useEffect, useState } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { MdOutlineModeEditOutline } from 'react-icons/md'

const page = () => {
    const [editdata,setEditdata] = useState('');
    const [createdata,setCreatedata] = useState('');
    const [deletedata,setDeletedata] = useState('');
    const [categorylist,setCategorylist] = useState([]);

    const [isPopup, setIsPopup] = React.useState(false);

      const handlePopup = (action) => {
          if (action) DeleteHandler();

          setIsPopup(!isPopup);
    };

    const DeleteHandler= async ()=>{
        let response = await fetch(`/api/category/delete/${deletedata._id}`, {
            method: "DELETE",
          });
          const data = await response.json();
          GetAllCategory();
    }

    const EditHandler = async ()=>{
        if(editdata.name){
        let newdata = editdata ;
        let options = {
            method: "PATCH",
            body: JSON.stringify(newdata),
          };
          let response = await fetch("/api/category/edit", options);
          // setIsLoading(false);
        //   console.log("response",response)
            GetAllCategory();
            setEditdata('');
        }
          
    }

    const CreateHandler = async ()=>{
        if(createdata){
        let newdata = {name : createdata} ;
        let options = {
            method: "POST",
            body: JSON.stringify(newdata),
          };
         
          let response = await fetch("/api/category/create", options);
          // setIsLoading(false);
        //   console.log("response",response)
          
            GetAllCategory();
            setCreatedata('');
        }
          
    }

useEffect(()=>{
        GetAllCategory();
},[])

const GetAllCategory = async ()=>{
        let response = await fetch("/api/category");
        let data = await  response.json();
        setCategorylist(data);
        // console.log("data",data);
}

  return (
   <Fragment>
     {isPopup ? <Popup isDelete={true} handleModel={handlePopup} /> : null}
      <div>
        <div className='flex my-5 items-center justify-center text-[30px] font-bold'>Category</div>
         <div className='flex items-center justify-center w-[100%] gap-5 flex-col px-5'>
            <div className='flex items-center justify-start w-[100%] text-[30px] fond-semibold'>Category List</div>
            {
                editdata ?
                <div className='flex items-center justify-center w-[100%] gap-10'>
                <input type="text" value={editdata.name} onChange={(e)=>{setEditdata((prev)=>({...prev, name:e.target.value}))}} maxLength={20} className='h-[60px] px-5 rounded-[5px] border-black border-2 w-[100%]' />
                <button className='border-2 border-black font-bold rounded-[5px] text-[20px] py-2 px-4' onClick={EditHandler}>Edit</button>
               </div>
              :
              <div className='flex items-center justify-center w-[100%] gap-10'>
                <input type="text" value={createdata} onChange={(e)=>setCreatedata(e.target.value)} maxLength={20} className='h-[60px] px-5 rounded-[5px] border-black border-2 w-[100%]' />
                <button className='border-2 border-black font-bold rounded-[5px] text-[20px] py-2 px-4' onClick={CreateHandler}>Create</button>
              </div>
             }
             <div className='grid mt-10 grid-cols-6 border-b py-2 border-black w-[100%] gap-5 text-[25px]'>
               <div className='m-auto col-span-1 '>S.no</div>
               <div className='m-auto col-span-3 '>Category</div>
               <div className=' m-auto col-span-1 '>Edit Action</div>
               <div className='m-auto col-span-1'>Delete Action</div>
            </div>
            {
                categorylist.length > 0 && categorylist.map((item,index)=>
                    <div key={item._id} className='grid grid-cols-6 border-b py-2 border-black w-[100%] gap-5 text-[25px]'>
                    <div className='m-auto col-span-1 '>{index+1}.</div>
                    <div className='m-auto col-span-3 '>{item?.name}</div>
                    <div className=' m-auto col-span-1 '><MdOutlineModeEditOutline className=' cursor-pointer' onClick={()=>{setEditdata(item)}} /></div>
                    <div className='m-auto col-span-1'><FaRegTrashCan className=' cursor-pointer' onClick={()=>{setDeletedata(item);setIsPopup(true)}} /></div>
                 </div>) 
            }
          

         </div>
      </div>
   </Fragment>
  )
}

export default page