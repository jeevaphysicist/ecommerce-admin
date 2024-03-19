"use client";

import React, { useEffect } from "react";
import "quill/dist/quill.snow.css";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaRegImage } from "react-icons/fa6";
import { UploadFile } from "./Uploadfile";
const ReactQuill = dynamic(() => import("react-quill"), {
  // Dynamically import ReactQuill
  ssr: false, // Disable server-side rendering
});

const CreateBlogPost = () => {
  const [blogData, setBlogData] = useState("");
  const [coverimage, setCoverimage] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [blogSize, setBlogSize] = useState(0);

  let router = useRouter();
  const { data: session } = useSession();

  var modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
    "video",
    "code-block",
    "font",
    "clean",
  ];

  const handlefilechange = (e) => {
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
  };

  const handleProcedureContentChange = (content) => {
    // console.log("content---->", content);
    setBlogData(content);
  };

  useEffect(() => {
    let blogsize = calculateVariableSize(blogData);
    setBlogSize(blogsize);
  }, [blogData]);

  const handleUploadBlogData = async () => {
    let newdata = {
      Data: blogData,
      id: session?.user.id,
      title,
      coverimage,
    };
    setIsLoading(true);
    // console.log("front-emd data sens check,",newdata);
    let options = {
      method: "POST",
      body: JSON.stringify(newdata),
    };
    let response = await fetch("/api/blog/new", options);
    setIsLoading(false);

    if (response.status === 200) {
      router.push("/");
    }
  };

  function calculateVariableSize(variable) {
    const sizeInBytes = new Blob([variable]).size;
    const sizeInMB = sizeInBytes / (1024 * 1024); // Convert bytes to megabytes
    return sizeInMB.toFixed(2);
  }

  return (
    <div>
      {/* <h1 style={{ textAlign: "center" }}>Text Editor In React JS</h1> */}
      <div className="w-[100%] flex items-center justify-center">
        <div className="w-[100%] md:w-[700px] h-[90vh] lg:w-[800px]">
          <div style={{ display: "grid", justifyContent: "center" }}>
            <div className="flex items-center justify-between w-[100%]">
              <div>
                {" "}
                <span className={blogSize > 12 ? "text-[red] font-bold" : ""}>
                  {blogSize}MB
                </span>{" "}
                / 12MB{" "}
              </div>
              <button
                disabled={blogSize > 12}
                className={`${
                  blogSize > 12
                    ? " bg-[#efebeb] cursor-not-allowed"
                    : "bg-black active:bg-[#ffffff] cursor-pointer active:text-[black]"
                }  text-white rounded-[10px] px-4 py-2`}
                onClick={handleUploadBlogData}
              >
                {" "}
                {isLoading ? "POST..." : "POST"}
              </button>
            </div>
            <div className="my-5">
              <label className="ml-4 font-bold text-[black]">
                Title<sup className="text-[red]">*</sup>
              </label>
              <input
                type="text"
                maxLength={100}
                onChange={(e) => setTitle(e.target.value)}
                className="w-[100%] h-[60px] border-2 rounded-[10px] text-[30px] font-bold px-5"
              />
            </div>
            <div className="my-5">
              <label>
                <div className="w-[100%]   flex items-center justify-center border">
                  {coverimage ? (
                    <img
                      src={coverimage}
                      alt=""
                      className="w-[100%] h-[100%] object-cover"
                    />
                  ) : (
                    <div className="w-[100%] py-10">
                      <FaRegImage className="w-[100%] " />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  onChange={handlefilechange}
                  className="w-[100%] hidden h-[60px] border"
                />
              </label>
            </div>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              onChange={handleProcedureContentChange}
              style={{ height: "80vh", maxWidth: "800px" }}
            ></ReactQuill>
          </div>

          {/* <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={handleProcedureContentChange}
         className="h-[60vh]"
        >
        </ReactQuill> */}
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPost;
