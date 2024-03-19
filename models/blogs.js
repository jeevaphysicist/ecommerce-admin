import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    blogdata: {
      type: String,
      required: [true, "Blog data is required"],
    },
    title: {
      type: String,
      require: true,
    },
    coverimage: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Blog = models.blogs || model("blogs", BlogSchema);

export default Blog;
