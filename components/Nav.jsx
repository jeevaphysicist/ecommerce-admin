"use client";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RiMenu4Fill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { TbBrandBlogger } from "react-icons/tb";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaCertificate } from "react-icons/fa";

const Nav = () => {
  const [providers, setProviders] = useState("");
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const { data: session } = useSession();

  let pathName = usePathname();
  // console.log("pathname",pathName);

  // console.log("session " ,session);
  useEffect(() => {
    handleProviders();
  }, []);
  const handleProviders = async () => {
    let response = await getProviders();
    // console.log("response");
    setProviders(response);
  };

  const handleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };
  // console.log("providers",providers)
  return (
    <Fragment>
      <div className="flex sticky top-0 shadow-lg bg-white z-50 items-center justify-start gap-5 p-5">
        <RiMenu4Fill
          className="font-bold text-[30px] cursor-pointer"
          onClick={handleAside}
        />
        <Link href="/" className="font-bold text-[30px]">
          {" "}
          Admin
        </Link>
      </div>

      <div
        className={`fixed  h-[100vh] top-0 left-0 bottom-0 z-50 right-0 bg-[#000000] opacity-[37%]    ${
          isAsideOpen ? "w-full " : "w-0"
        }`}
        onClick={handleAside}
      ></div>
      <div
        className={`fixed  h-[100vh]  top-0 bottom-0 left-0 z-50  rounded-r-[7px]  bg-white    transition-all duration-500 w-[300px] ease-in-out ${
          isAsideOpen ? " ml-0" : " -ml-[300px] "
        }`}
      >
        <div className="flex flex-col gap-3 py-10 px-5">
          <Link href="/" className="font-bold text-[30px]">
            {" "}
            Admin
          </Link>
          <Link
            href="/"
            className={` ${
              pathName === "/" ? "bg-black text-white" : ""
            } p-4 rounded-r-[5px] font-bold text-[16px] flex items-center gap-3`}
          >
            {" "}
            <MdDashboard /> Dashboard
          </Link>
          <Link
            href="/blog"
            className={` ${
              pathName === "/blog" ? "bg-black text-white" : ""
            } p-4 rounded-r-[5px] font-bold text-[16px] flex items-center gap-3`}
          >
            <TbBrandBlogger /> Blog
          </Link>
          <Link
            href="/product"
            className={` ${
              pathName === "/product" ? "bg-black text-white" : ""
            } p-4 rounded-r-[5px] font-bold text-[16px] flex items-center gap-3`}
          >
            <MdOutlineProductionQuantityLimits /> Product
          </Link>
          <Link
            href="/category"
            className={` ${
              pathName === "/category" ? "bg-black text-white" : ""
            } p-4 rounded-r-[5px] font-bold text-[16px] flex items-center gap-3`}
          >
            <FaCertificate /> Category
          </Link>
          
        </div>
      </div>
    </Fragment>
  );
};

export default Nav;
