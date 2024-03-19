"use client";
import React, { Fragment, useEffect, useState } from "react";

const Page = () => {
  return (
    <Fragment>
      <div className="text-[50px] mt-10 px-10 h-[5vh] flex items-center justify-center">
        {" "}
        Dashboard{" "}
      </div>
      <div className="grid px-5 md:px-10 mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10"></div>
    </Fragment>
  );
};

export default Page;
