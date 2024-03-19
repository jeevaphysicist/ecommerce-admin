"use client"
import CreateProduct from '@components/CreateEditProduct'
import React, { Fragment, useEffect, useState } from 'react'

const page = ({params}) => {
  const [product,setProduct] = useState('');

  useEffect(() => {
    Getproduct();
  }, []);

  const Getproduct = async () => {
    let response = await fetch(`/api/product/get-single-product/${params.id}`);
    const data = await response.json();
    setProduct(data.data);
    console.log("data", data);
  };
  return (
    <Fragment>
    <div className="py-10">
      <CreateProduct editProduct={product} isEdit={true} />
    </div>
   </Fragment>
  )
}

export default page