import mongoose from "mongoose";

let isConnect = false ;

export const ConnectToDB = async () => {
    mongoose.set('strictQuery',true)
    if (isConnect) return;
    
    try{
        await mongoose.connect(process.env.MONGO_URI, {dbName:"jeevalearnnext",useNewUrlParser: true , useUnifiedTopology :true});
        console.log("MongoDB Connected...");
        isConnect=true;
        
    } catch(err){
        console.error(err);
        process.exit();
    }
}  

// export const getDb = ()=>{