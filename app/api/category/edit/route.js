import { ConnectToDB } from "@utils/database";
import Category from "@models/category";

// Update Category
export const PATCH = async (req) => {
  const {
   name,
    _id,
  } = await req.json();

  try {
    await ConnectToDB();
    // Find Category is Available or not in database ( Category Collection )
    let findCategory = await Category.findOne({ _id: _id });

    if (!findCategory)
      return new Response(
        JSON.stringify({ message: "Error in Category Creation", error }),
        { status: 500 }
      );

    // If the Category is available then update it otherwise throw an error
    let updatedCategory = await Category.updateOne(
      { _id: _id },
      {
        $set: {
          name: name || findCategory.name,
        },
      }
    );

    return new Response(JSON.stringify(updatedCategory), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error in Category Update", error }),
      { status: 500 }
    );
  }
};
