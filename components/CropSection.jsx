"use client"

import React, { Fragment, useState  } from 'react'
import Cropper from 'react-easy-crop'
import { IoMdCheckmark } from 'react-icons/io'
import { IoCloseSharp } from 'react-icons/io5';
import CropImage from './CropImage';

const CropSection = ({ aspect, imageSetHandler , image ,cancelhandler  }) => {
    const [crop, setCrop] = useState({ x: 1, y: 3 });
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null);


const onCropComplete = async (_, croppedAreaPixels) => {
        const croppedImg = await CropImage(image, croppedAreaPixels);
        // console.log('cropped image',croppedImg.file);
        setCroppedImage(croppedImg.file);
         
      };
          
const handleOkClick = async () => { 
        imageSetHandler(croppedImage);
      };
    
const handleCancelClick = () => {
        setCroppedImage(image);
        cancelhandler()
      };

  return (
   <Fragment>
        <div className='top-0 left-0 right-0  bottom-0 m-auto   fixed z-50 bg-white'>
            <div className='w-[100%] relative z-50 grid grid-cols-3 text-[white]  bg-[black] p-4 font-bold text-[18px]'>
                  <div className='col-span-1'>
                    <div className='flex items-center justify-start'>
                    <IoCloseSharp onClick={handleCancelClick} className='text-[30px]' />
                    </div>
                 </div>
                  <div className='col-span-1'>
                    <div className='flex items-center justify-center'>
                   Crop Photo
                    </div>
                    </div>
                  <div className='col-span-1'>
                    <div className='flex items-center justify-end'>
                    <IoMdCheckmark onClick={handleOkClick} className='text-[30px]' />
                    </div>
                    </div>
            </div>
            <div className=''>
            <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{width:"100%"}}
           
          />
            </div>
        </div>

    

   </Fragment>
  )
}

export default CropSection