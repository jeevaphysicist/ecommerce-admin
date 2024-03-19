import { ConnectToDB } from "@utils/database";
import Blogs from "@models/blogs";


export const  GET = async (req , {params} ) =>{
//   console.log("params",params);

    try{
       await ConnectToDB();
        let blogs= await Blogs.findOne({_id: params.id});
         return new Response (JSON.stringify(blogs),{status:200});
    }
    catch(error){
      return new Response ({status:500});
    }
}

export const  DELETE = async (req , {params} ) =>{
  //   console.log("params",params);
  
      try{
         await ConnectToDB();
          let blogs= await Blogs.deleteOne({_id: params.id});
           return new Response (JSON.stringify(blogs),{status:200});
      }
      catch(error){
        return new Response ({status:500});
      }
  }