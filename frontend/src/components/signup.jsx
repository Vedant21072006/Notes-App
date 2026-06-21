import { useState } from 'react'
import '../styles/auth.css'
import {  useNavigate } from 'react-router-dom'

export const Signup = () => {
    const nav =useNavigate()
 const [userdata,setUserData]=useState({})
 const signupuser=async()=>{
   let finalData = {...userdata,
      accountCreatedOn:new Date()
   }
    let res = await fetch('http://localhost:3000/signup',{
        method:'POST',
        credentials:'include',
        body:JSON.stringify(finalData),
        headers:{
            'Content-type':'application/json'
        }
    })
    res= await res.json()
    if(res.signin){
    
        localStorage.setItem('token',res.tokenval)
        nav("/list")

    }
    else if(res.userexist){
        alert("user already exist")
        nav("/signup")
    }
    else if(res.emptyfield){
      alert("Enter all details")
       nav("/signup")
    } 

 }
   return(

      <div className="auth-container">

         <div className="auth-card">

            <h2 className="auth-title">
               Sign Up
            </h2>

            <div className="auth-form">

               <input
                  type="text"
                  placeholder="Enter name"
                  className="auth-input"
                  onChange={(e)=>setUserData({...userdata,name:e.target.value})}
               />

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

               <button className="auth-btn" onClick={()=>signupuser()} >
                  Create Account
               </button>

               <p className="auth-switch">
   Already have an account? 
   <span onClick={()=>nav('/login')}>
      Login
   </span>
</p>

            </div>

         </div>

      </div>

   )

}