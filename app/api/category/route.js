import { ConnectToDB } from "@utils/database";
import Category from "@models/category";

// Update Category
export const GET = async (req) => { 
  try {
    await ConnectToDB();
    // Find Category is Available or not in database ( Category Collection )
    let category = await Category.find();
    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
     return new Response(
      JSON.stringify({ message: "Error in Category Get", error }),
      { status: 500 }
    );
  }
};
