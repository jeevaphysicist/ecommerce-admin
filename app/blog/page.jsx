"use client";
import React, { Fragment, useEffect, useState } from "react";
import "quill/dist/quill.bubble.css";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import Link from "next/link";
import BlogCard from "@components/BlogCard";

const ReactQuill = dynamic(() => import("react-quill"), {
  // Dynamically import ReactQuill
  ssr: false, // Disable server-side rendering
});

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    GetAllBlogs();
  }, []);

  const GetAllBlogs = async () => {
    let response = await fetch("/api/blog/new");
    const data = await response.json();
    setBlogs(data);
    console.log("data", data);
  };

  const DeleteBlogData = async (blogid) => {
    let response = await fetch(`/api/blog/getsingleblog/${blogid}`, {
      method: "DELETE",
    });
    const data = await response.json();
    GetAllBlogs();
  };

  return (
    <Fragment>
      <div className=" px-5 md:px-10 mt-10 h-[5vh] flex items-center justify-between">
        <div className="text-[50px]">Blogs</div>
        <Link
          href="/create-blog"
          className="border-2 border-black py-2 px-4 text-black"
        >
          Create
        </Link>
      </div>
      <div className="grid px-5 md:px-10 mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10">
        {blogs.length > 0 &&
          blogs.map((post) => (
            <BlogCard
              key={post._id}
              DeleteHandler={DeleteBlogData}
              blog={post}
            />
          ))}
      </div>
    </Fragment>
  );
};

export default Page;
