import { models, model, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Please provide the name of the product."],
    },
    productDescription: {
      type: String,
      required: [true, "Please provide the name of the description."],
    },
    productImages: {
      type: Array,
      required: [true, "Please provide the Images of the product."],
    },
    productPrice: {
      type: Number,
      required: [true, "Please provide the price of the product."],
    },
    productDiscount: {
      type: Number,
      default: 0,
    },
    productInStock: {
      type: String,
      enum:['yes','no']
    },
    productCategoryID: {
      type: Schema.Types.ObjectId,
      ref: "category", //referencing to category collection in db
    },
  },
  { timestamps: true }
);

const ProductModel = models.product || model("product", ProductSchema);

export default ProductModel;
