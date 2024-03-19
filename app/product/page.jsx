"use client"

import ProductCard from '@components/ProductCard';
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'

const page = () => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    GetAllproducts();
  }, []);

  const GetAllproducts = async () => {
    let response = await fetch("/api/product/get-all-products");
    const data = await response.json();
    setproducts(data.data);
    console.log("data", data);
  };

  const DeleteProductData = async (blogid) => {
    let response = await fetch(`/api/product/delete/${blogid}`, {
      method: "DELETE",
    });
    const data = await response.json();
    GetAllproducts();
  };
  console.log("products",products);
  return (
    <Fragment>
    <div className=" px-5 md:px-10 mt-10 h-[5vh] flex items-center justify-between">
      <div className="text-[50px]">Products</div>
      <Link
        href="/product/create-product"
        className="border-2 border-black py-2 px-4 text-black"
      >
        Create
      </Link>
    </div>
    <div className="grid px-5 md:px-10 mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10">
      {products.length > 0 &&
        products.map((product) => (
         
          <ProductCard
            key={product._id}
            DeleteHandler={DeleteProductData}
            product={product}
          />
         
        ))}
    </div>
  </Fragment>
  )
}

export default page