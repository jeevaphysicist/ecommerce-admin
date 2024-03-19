import { ConnectToDB } from "@utils/database";
import Product from "@models/products";

// Create Product 
export const POST = async (req) => {
  const {
    productName,
    productDescription,
    productImages,
    productPrice,
    productDiscount,
    productInStock,
    productCategoryID
  } = await req.json();

  try {
    await ConnectToDB();
    let product = new Product({
      productName,
      productDescription,
      productImages,
      productPrice,
      productDiscount,
      productInStock,
      productCategoryID,
    });
    product = await product.save();
    return new Response(
      JSON.stringify({ message: "Product create successfully", data: product }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error in Product Creation", error }),
      { status: 500 }
    );
  }
};
