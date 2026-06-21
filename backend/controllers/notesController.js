import {dbConnect } from '../config/dbconfig.js'
import { ObjectId } from 'mongodb'
import {verifyToken} from '../middleware/verifyToken.js'


// list data
export const listdatacontroller=async(req,resp)=>{
     let coll = await dbConnect()   
     
     const{title} =req.query
     const queryObject ={}
     if(title){
       queryObject.title={
           $regex: title,
          $options: "i"
       }
     }
    
     let apiData = coll.find({
       userEmail:req.user.email,
       ...queryObject
     })
    
     let res = await apiData.toArray()
    
     if(res){
        resp.send(res)  
     }
     else{
       resp.send({
          message:'error'
       })
     }
}

export const adddatacontroller=async(req,resp)=>{
       if(!req.body.title || !req.body.content){
            return resp.status(400).send({
    
          success:false,
    
          message:"All fields are required"
    
       });
       }
    
       let coll = await dbConnect()  
       
        let data= {...req.body, userEmail:req.user.email}
        let res = await coll.insertOne(data)
         if(res){
            resp.send({
                success:true,
                body:data
            })
         }
}

export const deletedatacontroller=async(req,resp)=>{
       let coll = await dbConnect() 
          let res = await coll.deleteOne({_id: new ObjectId(req.params.id),userEmail:req.user.email})
            if(res.deletedCount>0){
            resp.send({
                success:true
               
            })
    
         }
}

export const populatedatacontroller=async(req,resp)=>{
      let coll = await dbConnect() 
          let res =  await coll.findOne({_id:new ObjectId(req.params.id),userEmail:req.user.email})
          if(res){
          resp.send({
             success:true,
             body:res
          })
       }
}

export const updatedatacontroller=async(req,resp)=>{
     if(!req.body.title || !req.body.content){
        return resp.status(400).send({

      success:false,

      message:"All fields are required"

   });
   }
   
   try{
   let coll = await dbConnect() 
     let res =await coll.updateOne(
      {_id:new ObjectId(req.params.id),userEmail:req.user.email},
      {$set:req.body},
     
     )
  
  
  
     if(res){
      resp.send({
         success:true
      })
   
    }
    else{
       resp.send({
         success:false
      })
   
    }
   }
   catch(error){
      
        console.log(error);

      resp.status(500).send({
         success:false,
         message:error.message
      });
   }
}