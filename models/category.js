import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {   
    name: {
      type: String,
      require: true,
    }
  },
  { timestamps: true }
);

const Category = models.category || model("category", CategorySchema);

export default Category;
