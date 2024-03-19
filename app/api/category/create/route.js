import { ConnectToDB } from "@utils/database";
import Category from "@models/category";

// Create Category 
export const POST = async (req) => {
  try {
    await ConnectToDB();
    const { name } = await req.json();
    let category = new Category({ name });
    category = await category.save();
    
    return new Response(
      JSON.stringify({ message: "Category created successfully", data: category }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error in Category Creation", error: error.message }),
      { status: 500 }
    );
  }
};
