"use client";
import React, { Fragment } from "react";
import CreateProduct from "@components/CreateEditProduct";

const CreateBlog = () => {
  return (
    <Fragment>
      <div className="py-10">
        <CreateProduct isCreate={true} />
      </div>
    </Fragment>
  );
};

export default CreateBlog;
