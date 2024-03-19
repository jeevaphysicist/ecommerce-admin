import { ConnectToDB } from "@utils/database";
import User from "@models/user";

export const  GET = async (req) =>{
    // console.log("get all user controlers");
      try{
         await ConnectToDB();
          let users= await User.find({});
          // console.log("user",users);
           return new Response (JSON.stringify(users),{status:200});
      }
      catch(error){
        return new Response ({status:500});
      }
}