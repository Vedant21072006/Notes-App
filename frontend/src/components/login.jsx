import { use } from 'react'
import '../styles/auth.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
   let nav =useNavigate()
const [userdata,setUserData]=useState({})
const loginuser=async()=>{
    
    if(userdata.email && userdata.password){
        let res =await fetch('http://localhost:3000/login',{
            method:'POST',
            credentials:'include',
            body:JSON.stringify(userdata),
            headers:{
                 'Content-type':'application/json'
            }
        })
        res = await res.json()

        // store the token
        
        if(res.login){
          
         localStorage.setItem('token',res.tokenval)
         localStorage.setItem('role',res.role)

       if(res.role == 'Admin'){
         nav('/admin')
       }
       else{

            nav('/list')
       }
        }
        else{
           alert("user not found")
         
        }
        
    }
    else{
        alert("enter details")
        nav('/login')
    }

}
   return(

      <div className="auth-container">

         <div className="auth-card">

            <h2 className="auth-title">
               Login
            </h2>

            <div className="auth-form">

               <input
                  type="email"
                  placeholder="Enter email"
                  className="auth-input"
                  onChange={(e)=>setUserData({...userdata,email:e.target.value})}
               />

               <input
                  type="password"
                  placeholder="Enter password"
                  className="auth-input"
                  onChange={(e)=>setUserData({...userdata,password:e.target.value})}
               />

               <button className="auth-btn" onClick={()=>loginuser()} >
                  Login
               </button>
               <p className="auth-switch">
   Don't have an account? 
   <span onClick={()=>nav('/signup')}>
      Sign Up
   </span>
</p>

            </div>

         </div>

      </div>

   )

}