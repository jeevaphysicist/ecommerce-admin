import { ConnectToDB } from "@utils/database";
import Product from "@models/products";


export const  DELETE = async (req , {params} ) =>{
    //   console.log("params",params);
    
        try{
           await ConnectToDB();
            let product= await Product.deleteOne({_id: params.id});
             return new Response (JSON.stringify(product),{status:200});
        }
        catch(error){
          return new Response ({status:500});
        }
    }