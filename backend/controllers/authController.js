
import { userdbconnect} from '../config/dbconfig.js'
import {verifyToken} from '../middleware/verifyToken.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'






// login controller
export const logincontroller=async(req,resp)=>{

     let data = req.body;

   // validation
   if(!data.email || !data.password){

      return resp.send({
         login:false,
         message:"All fields required"
      });

   }

   let coll = await userdbconnect();

   let user = await coll.findOne({

      email:data.email,
      

   });

   // wrong credentials
   if(!user){

      return resp.send({
         login:false,
         message:"Invalid email or password"
      });

   }

   const isMatch = await bcrypt.compare(
   data.password,
   user.password
)
  
  if(isMatch){
   jwt.sign(

      { email:user.email ,role:user.role},

       process.env.JWT_SECRET,

      { expiresIn:'5d' },

      (error, token)=>{

         if(error){

            resp.send({
               login:false,
               tokenval:undefined
            });

         }
            

         resp.cookie("token", token, {
            httpOnly: true,   // 🔒 prevents JS access (VERY IMPORTANT)
            secure: false,    // true only in production (HTTPS)
            sameSite: "lax",  // protects from CSRF
            maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days
         });

        

           return resp.send({
               login:true,
               tokenval:token,
               role:user.role
            });

       

      }
  

   )}
          else{

   resp.send({
      login:false,
      message:"Invalid email or password"
   });

}



   
}


export const signupcontroller=async(req,resp)=>{
      let data = {...req.body,
         role:"user"
      }
    
      
       if(!data.name || !data.email || !data.password){

      return resp.send({
         signin:false,
         message:"All fields required",
         emptyfield:true,
         userexist:false,

      });

   }


       let coll = await userdbconnect()
      
      let existinguser = await coll.findOne({email:data.email})
      
      if(existinguser){
       return resp.send({
             signin:false,
         message:"User already exists",
          emptyfield:true,
         userexist:true
        })
      }
      let hashedpassword = await bcrypt.hash(data.password,10)
      data.password = hashedpassword


      let res = await coll.insertOne(data)

     
     
      

   if(res){
   jwt.sign({email:data.email}, process.env.JWT_SECRET,{expiresIn:'5d'},(error,token)=>{
      
      
         if (error) {
      return resp.send({
         signin: false,
         message: "Token error"
      });
   }

   resp.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 5 * 24 * 60 * 60 * 1000
   });

   return resp.send({
      signin: true
   });

            
   })
   }
   else{
      resp.send({
          signin:false,
         tokenval:undefined
      })
   }

}

export const logoutcontroller=async(req,resp)=>{
       resp.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false
   });

   resp.send({
      success: true,
      message: "Logged out successfully"
   });
}