import { ConnectToDB } from "@utils/database";
import Product from "@models/products";

// Update Product
export const PATCH = async (req) => {
  const {
    productName,
    productDescription,
    productImages,
    productPrice,
    productDiscount,
    productInStock,
    productCategoryID,
    id,
  } = await req.json();

  try {
    await ConnectToDB();
    // Find Product is Available or not in database ( product Collection )
    let findProduct = await Product.findOne({ _id: id });

    if (!findProduct)
      return new Response(
        JSON.stringify({ message: "Error in Product Creation", error }),
        { status: 500 }
      );

    // If the product is available then update it otherwise throw an error
    let updatedProduct = await Product.updateOne(
      { _id: id },
      {
        $set: {
          productName: productName || findProduct.productName,
          productDescription: productDescription || findProduct.productDescription,
          productImages: productImages || findProduct.productImages,
          productPrice: productPrice || findProduct.productPrice,
          productDiscount: productDiscount || findProduct.productDiscount,
          productInStock: productInStock || findProduct.productInStock,
          productCategoryID:productCategoryID || findProduct.productCategoryID
        },
      }
    );

    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error in Product Update", error }),
      { status: 500 }
    );
  }
};
