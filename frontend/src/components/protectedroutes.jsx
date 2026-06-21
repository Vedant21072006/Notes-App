import { Navigate } from "react-router-dom";


export const ProtectedRoutes=({children})=>{
 
    let token = localStorage.getItem("token")
    if(token){
        return children;

    }
    else{
     return <Navigate  to="/login"/>
    }
}