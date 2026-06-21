export const isAdmin=(req,resp,next)=>{
    if(req.user.role != "Admin"){
        return  resp.status(403).send({
             success: false,
         message: "Access denied: Admin only"
        })


    }
    next();
}