import { ConnectToDB } from "@utils/database";
import Product from "@models/products";

export  const GET = async (req, {params})=>{
       try{
        await  ConnectToDB();
        //   get a single  product from product collection
        let product = await Product.findOne({_id: params.id});
         return new Response(JSON.stringify( { data:product} ) , {status:200}) ;   
       }
       catch(error){
          return new Response(JSON.stringify({ message:"Error in get product",error }),{status:500})
       }
}