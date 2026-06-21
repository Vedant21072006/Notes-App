import { dbConnect, userdbconnect } from '../config/dbconfig.js'
import { ObjectId } from 'mongodb';

// user data 
export const UserData=async(req,resp)=>{
    let coll = await userdbconnect();
    const {search}= req.query
    let querydata= {}
   
    if(search){
        querydata={
            $or:[
                {
               name:{
                $regex:search,
            $options:"i"
                }},
                {
                email:{

           $regex:search,
            $options:"i"
                }}
            ]
           
        }
    }

    
    let res = await coll.find(querydata).toArray()
    resp.send(res)

}

export const deleteUseranddata=async(req,resp)=>{
     let usercoll = await userdbconnect()
    let notescoll= await dbConnect()

     let user  = await usercoll.findOne({_id:new ObjectId(req.params.id)})
    let res1 = await usercoll.deleteOne({_id:new ObjectId(req.params.id)})
    let res2 = await notescoll.deleteMany({
        userEmail:user.email
    })

    if(res1 && res2){
        resp.send({
            success:true,
            message:'user and its notes deleted'
        })
    }
    else{
          resp.send({
            success:false,
            message:'operation failed'
        })
    }

}
// user specific notes 
export const UserSpecificNotes=async(req,resp)=>{
    let coll =await dbConnect()
        let coll2 = await userdbconnect()
        let user = await coll2.findOne({_id:new ObjectId(req.params.id)})
        let res = await coll.find({userEmail:user.email} ).toArray()
        if(res){
            resp.send({
                success:true,
                data:res
            })
        }
        else{
           
            resp.send({
                success:false,
                data:'no data found'
            })
        
        }
}
// delete user specidic notes 
export const DeleteUserSpecificNotes=async(req,resp)=>{
     let coll = await dbConnect();
    
            let result = await coll.deleteOne({
                _id: new ObjectId(req.params.id)
            });
    
            if(result.deletedCount > 0){
                resp.send({
                    success:true,
                    message:"Note deleted"
                });
            }
            else{
                resp.send({
                    success:false,
                    message:"Note not found"
                });
            }
}

export const UpdateUserSpecificNotes=async(req,resp)=>{
     if(!req.body.title || !req.body.content){
        return resp.status(400).send({

      success:false,

      message:"All fields are required"

   });
   }
   
   try{
   let coll = await dbConnect() 
     let res =await coll.updateOne(
      {_id:new ObjectId(req.params.id)},
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

export const PopulateUserSpecificnotes=async(req,resp)=>{
       let coll = await dbConnect() 
          let res =  await coll.findOne({_id:new ObjectId(req.params.id)})
          if(res){
          resp.send({
             success:true,
             body:res
          })
       }
}

export const AdminStats = async (req, resp) => {
  try {
    let notesColl = await dbConnect();
    let usersColl = await userdbconnect();

    // total counts
    let totalUsers = await usersColl.countDocuments();
    let totalNotes = await notesColl.countDocuments();

    // 🧠 define start of today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // today's counts
    let todayUsers = await usersColl.countDocuments({
      createdAt: { $gte: startOfToday }
    });

    let todayNotes = await notesColl.countDocuments({
      createdAt: { $gte: startOfToday }
    });

    resp.send({
      success: true,
      totalUsers,
      totalNotes,
      todayUsers,
      todayNotes
    });

  } catch (error) {
    console.log(error);

    resp.status(500).send({
      success: false,
      message: "Failed to fetch stats"
    });
  }
};