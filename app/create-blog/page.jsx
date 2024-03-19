"use client";
import React, { Fragment } from "react";
import CreateBlogPost from "@components/CreateBlog";

const CreateBlog = () => {
  return (
    <Fragment>
      <div className="py-10">
        <CreateBlogPost />
      </div>
    </Fragment>
  );
};

export default CreateBlog;
