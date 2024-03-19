"use client";

import React, { Fragment, Suspense, useEffect } from "react";
import "quill/dist/quill.snow.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaRegImage } from "react-icons/fa6";
import { UploadFile } from "./Uploadfile";

import { LuImagePlus } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import CropSection from "./CropSection";
import ReactLoading from "react-loading";

const steps = ["Product Details", "Product Images", "Create Product"];
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const CreateProduct = ({ isCreate, isEdit ,editProduct }) => {
  const [blogData, setBlogData] = useState("");
  const [Photo, setPhoto] = useState(null);
  const [coverimage, setCoverimage] = useState("");
  console.log("editProduct",editProduct);
  const [productImages, setproductImages] = useState(editProduct ? editProduct.productImages : []);
  const [productName, setproductName] = useState(editProduct ? editProduct.productName :"");
  const [productDescription, setproductDescription] = useState(editProduct ? editProduct.productDescription :"");
  const [productCategoryID, setproductCategoryID] = useState(editProduct ? editProduct.productCategoryID :"");
  const [productPrice, setproductPrice] = useState(editProduct ? editProduct.productPrice :0);
  const [productDiscount, setproductDiscount] = useState(editProduct ? editProduct.productDiscount :0);
  const [productInStock, setproductInStock] = useState(editProduct ? editProduct.productInStock :"yes");
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [croppingModal1Open, setCroppingModel1Open] = useState(false);

  const [categorylist, setCategorylist] = useState([]);

  const [blogSize, setBlogSize] = useState(0);

  let router = useRouter();
  const { data: session } = useSession();
  const [isdisable, setIsdisable] = React.useState(true);

  useEffect(()=>{
        if(isEdit){
           setproductName(editProduct.productName);
           setproductPrice(editProduct.productPrice);
           setproductDiscount(editProduct.productDiscount);
           setproductInStock(editProduct.productInStock);
           setproductDescription(editProduct.productDescription);
           setproductCategoryID(editProduct.productCategoryID);
           setproductImages(editProduct.productImages);
        }
  },[editProduct])

  const handleCreateProduct = async () => {
    let newdata = {
      productName,
      productDescription,
      productImages,
      productCategoryID,
      productDiscount,
      productInStock,
      productPrice
    };
    setIsLoading(true);
    // console.log("front-emd data sens check,",newdata);
    let options = {
      method: "POST",
      body: JSON.stringify(newdata),
    };
    let response = await fetch("/api/product/create", options);
    // setIsLoading(false);

    if (response.status === 200) {
      router.push("/product");
    }
  };

  const handleEditProduct = async () => {
    let newdata = {
      productName,
      productDescription,
      productImages,
      productCategoryID,
      productDiscount,
      productInStock,
      productPrice,
      id:editProduct._id
    };
    setIsLoading(true);
    // console.log("front-emd data sens check,",newdata);
    let options = {
      method: "PATCH",
      body: JSON.stringify(newdata),
    };
    let response = await fetch("/api/product/edit", options);
    // setIsLoading(false);

    if (response.status === 200) {
      router.push("/product");
    }
  };

  const handlefilechange = (e) => {
    // console.log(" image",e.target.files[0]);
    let file = e.target.files[0];
    if (file) {
      var imageUrl = URL.createObjectURL(file);
      setPhoto(imageUrl);
      setCroppingModel1Open(true);
    }
  };

  const handleprofilecancel = () => {
    setCroppingModel1Open(false);
  };

  const handleProfileCroppedImgSet = (image) => {
    //  console.log("image",image);
    setUploading(true);

    setCroppingModel1Open(false);

    UploadFile(image)
      .then((downloadURL) => {
        console.log("Download URL: ", downloadURL);
        setproductImages((prev) => [...prev, downloadURL]);
        setPhoto("");
        setUploading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setUploading(false);
      });
  };

  const ImageDeleteHandler = (index) => {
    let updatearray = [...productImages];
    updatearray.splice(index, 1);
    setproductImages(updatearray);
  };

  useEffect(() => {
    DataCheckerHander();
  }, [uploading]);

  const DataCheckerHander = () => {
    if (
      uploading ||
      !productName ||
      !productDescription ||
      !productCategoryID ||
      productImages.length < 5 ||
      !productPrice
    ) {
      setIsdisable(true);
      return true;
    } else {
      setIsdisable(false);
      return false;
    }
  };

  const disabledHandler = () => {
    console.log("DataCheckerHander",DataCheckerHander());
    if (DataCheckerHander()) {
      setIsdisable(true);
    } else {
      setIsdisable(false);
      handleCreateProduct();
    }
  };

  const EditdisabledHandler = () => {
    console.log("DataCheckerHander",DataCheckerHander());
    if (DataCheckerHander()) {
      setIsdisable(true);
    } else {
      setIsdisable(false);
      handleEditProduct();
    }
  };

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
      {croppingModal1Open ? (
        <CropSection
          imageSetHandler={handleProfileCroppedImgSet}
          image={Photo}
          cancelhandler={handleprofilecancel}
          aspect={1}
        />
      ) : null}
      <div className="px-5 lg:px-20">
        <div className="flex items-center justify-center font-bold text-[30px]">
          {isCreate ? "Create" : "Edit"} Product
        </div>
        <div className="flex flex-col gap-5 items-center  w-[100%]">
          <div className="flex flex-col gap-3 items-center  w-[100%]">
            <label
              htmlFor="productName"
              className="flex ml-4 font-bold items-center justify-start w-[100%]"
            >
              Name<sup className="text-[red]">*</sup>
            </label>
            <input
              id="productName"
              value={productName}
              onChange={(e) => setproductName(e.target.value)}
              type="text"
              maxLength={100}
              placeholder="Eg. iPhone 13 Pro Max"
              className="rounded-[10px] w-[100%] border-2 border-black h-[60px] px-5"
            />
          </div>
          <div className="flex flex-col gap-3 items-center  w-[100%]">
            <label
              htmlFor="productDescripiton"
              className="flex ml-4 font-bold items-center justify-start w-[100%]"
            >
              Description<sup className="text-[red]">*</sup>
            </label>
            <textarea
              id="productDescripiton"
              value={productDescription}
              placeholder="Eg. The iPhone 13 Pro Max is Apple's flagship smartphone, offering a large 6.7-inch Super Retina XDR display with ProMotion technology for smooth scrolling and responsiveness. It features a powerful A15 Bionic chip for enhanced performance and efficiency, enabling advanced computational photography and immersive gaming experiences. The device boasts a triple-camera system with improved low-light performance and enhanced optical zoom capabilities. It also supports 5G connectivity for faster download speeds and expanded coverage. With its premium design, long battery life, and advanced features, the iPhone 13 Pro Max caters to users seeking top-of-the-line performance and cutting-edge technology in a smartphone. "
              onChange={(e) => setproductDescription(e.target.value)}
              rows={10}
              type="text"
              maxLength={500}
              className="rounded-[10px] py-5 w-[100%] border-2 border-black  px-5"
            />
          </div>
          <div className="flex flex-col gap-3 items-center  w-[100%]">
            <label
              htmlFor="productPrice"
              className="flex ml-4 font-bold items-center justify-start w-[100%]"
            >
              Price<sup className="text-[red]">*</sup>
            </label>
            <input
              id="productPrice"
              type="text"
              value={productPrice}
              onChange={(e) => setproductPrice(e.target.value)}
              className="rounded-[10px] w-[100%] border-2 border-black h-[60px] px-5"
            />
          </div>
          <div className="flex flex-col gap-3 items-center  w-[100%]">
            <label
              htmlFor="productCategory"
              className="flex ml-4 font-bold items-center justify-start w-[100%]"
            >
              Category<sup className="text-[red]">*</sup>
            </label>
            <select
              type="text"
              value={productCategoryID}
              onChange={(e) => setproductCategoryID(e.target.value)}
              className="rounded-[10px] w-[100%] border-2 border-black h-[60px] px-5"
            >
              <option>--Select Category--</option>
              {
                categorylist.length > 0 && categorylist.map(item=>
                  <option key={item._id} value={item._id}>{item.name}</option>
                  )
              }
              
             
            </select>
          </div>
          <div className="flex flex-col gap-3 items-center  w-[100%]">
            <label
              htmlFor="productImage"
              className="flex ml-4 font-bold items-center justify-start gap-3 flex-col w-[100%]"
            >
              <span className="felex items-center justify-start w-[100%] ">
                Images<sup className="text-[red]">*</sup>
              </span>
              <div className="w-[100%] border-2 py-4 rounded-[10px] flex items-center justify-center">
                <LuImagePlus className="text-[30px]" />
              </div>
            </label>
            <input
              id="productImage"
              type="file"
              className="hidden"
              onChange={handlefilechange}
            />
            <div className="flex items-center flex-wrap gap-10 justify-center">
              {productImages?.length > 0 && productImages?.map((item, index) => (
                <div
                  key={index}
                  className="w-[100px] relative h-[100px] bg-[blue] rounded-[7px] "
                >
                  {uploading ? (
                    <div className="w-[100px] absolute h-[100%] flex items-center justify-center ">
                      <ReactLoading
                        className=" flex items-center justify-center "
                        type={"spinningBubbles"}
                        color={"white"}
                        height={50}
                        width={50}
                      />
                    </div>
                  ) : null}
                  <img
                    src={item}
                    alt=""
                    className="w-[100px]  h-[100px] rounded-[7px] "
                  />
                  <MdDelete
                    className="absolute top-0 right-0 text-[red]"
                    onClick={() => ImageDeleteHandler(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center  w-[100%]">
            <label
              htmlFor="productDiscount"
              className="flex ml-4 font-bold items-center justify-start w-[100%]"
            >
              Discount<sup className="text-[red]">*</sup>
            </label>
            <input
              id="productDiscount"
              value={productDiscount}
              onChange={(e) => setproductDiscount(e.target.value)}
              type="text"
              className="rounded-[10px] w-[100%] border-2 border-black h-[60px] px-5"
            />
          </div>
          <div className="flex flex-col gap-3 items-center  w-[100%]">
            <label className="flex ml-4 font-bold items-center justify-start w-[100%]">
              Product In Stock<sup className="text-[red]">*</sup>
            </label>
            <div className="flex items-center justify-start w-[100%] gap-3">
              <div className="flex  items-center justify-start gap-3">
                <input
                  type="radio"
                  value="yes"
                  checked={productInStock === "yes"}
                  onChange={(e) => setproductInStock(e.target.value)}
                  className="rounded-[10px] w-[100%] border-2 border-black h-[60px] px-5"
                  name="ProductinStock"
                />{" "}
                <span>YES</span>
              </div>
              <div className="flex  items-center justify-start gap-3">
                <input
                  type="radio"
                  value="no"
                  checked={productInStock === "no"}
                  onChange={(e) => setproductInStock(e.target.value)}
                  className="rounded-[10px] w-[100%] border-2 border-black h-[60px] px-5"
                  name="ProductinStock"
                />{" "}
                <span>NO</span>
              </div>
            </div>
          </div>

          {isCreate ? (
            <div className="flex  gap-3 my-5 items-center  justify-start w-[100%]">
              <button
                className={`${
                  isdisable ? "bg-[gray] text-[white]" : "bg-black text-[white]"
                }  rounded-[10px] p-4 `}
                onClick={disabledHandler}
              >
                {" "}
                {true ? "Create..." : "Create"}{" "}
              </button>
            </div>
          ) : (
            <div className="flex  gap-3 my-5 items-center  justify-start w-[100%]">
              <button
                className={`${
                  isdisable ? "bg-[gray] text-[white]" : "bg-black text-[white]"
                }  rounded-[10px] p-4 `}
                onClick={EditdisabledHandler}
              >
                {" "}
                {true ? "Edit..." : "Edit"}{" "}
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default CreateProduct;
