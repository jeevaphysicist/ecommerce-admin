import NextAuth from "next-auth";
import GoogleProviders from "next-auth/providers/google";
import { ConnectToDB } from "@utils/database";
import User from "@models/user";

// console.log("clientid" ,process.env.GOOGLE_CLIENT_ID ,process.env.GOOLOG_SECRET);

const handler = NextAuth({
     providers: [  
         // Configure the provider with your own values.
        GoogleProviders({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOLOG_SECRET,
          }) 
    ],
    callbacks:{
        async session({session}) {
            try{
            await ConnectToDB();
            const sessionUser = await User.findOne( { email : session.user.email } )
            if(sessionUser){
            session.user.id =  sessionUser._id.toString();
            }            
            }
            catch(err){
                console.error("Error fetching user from database:", err);
            }
            return session;
        },
    
        async signIn({profile}) {
            // console.log("profile",profile);
            try{
            await ConnectToDB();
                 const userExists = await User.findOne({ email: profile.email });
                // console.log("userExists",userExists);
                 
                 if(!userExists) {
                    let data = {
                                email:profile.email,
                                username:profile.name,
                                photo:profile.picture
                               }  
                     await User.create(data);
                    }
             return true;
            }
            catch(err){
             console.log(err);
             return false
            }
    
        }
    }
    


   
}) 

export { handler as GET , handler as POST} ;
