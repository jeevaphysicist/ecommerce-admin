import { ConnectToDB } from "@utils/database";
import Product from "@models/products";

export  const GET = async (req)=>{
       try{
        await  ConnectToDB();
        //   get all product from product collection
        let products= await Product.find();
         return new Response(JSON.stringify( { data:products} ) , {status:200}) ;   
       }
       catch(error){
          return new Response(JSON.stringify({ message:"Error in get product",error }),{status:500})
       }
}