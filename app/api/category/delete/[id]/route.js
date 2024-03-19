import { ConnectToDB } from "@utils/database";
import Category from "@models/category";


export const  DELETE = async (req , {params} ) =>{
    //   console.log("params",params);
    
        try{
           await ConnectToDB();
            let category= await Category.deleteOne({_id: params.id});
             return new Response (JSON.stringify(category),{status:200});
        }
        catch(error){
          return new Response ({status:500});
        }
    }