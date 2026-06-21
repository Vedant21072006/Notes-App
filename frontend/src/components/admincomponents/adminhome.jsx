// AdminHome.jsx

import { useEffect, useState } from "react";
import "../../styles/adminhome.css";

export const AdminHome = () => {
     const [data,setData]= useState({})
     useEffect(()=>{
        getStats()
     },[])
    const getStats=async(req,resp)=>{
           let res = await fetch('http://localhost:3000/admin/stats')  
           res =await res.json()
           setData(res)  
    }
    return (
        <div className="admin-home">

            <h1>
                Hello Admin 👋
            </h1>

            <p className="welcome-text">
                Welcome back to your dashboard
            </p>

            <div className="stats-container">

               <div className="stats-card">
        <h2>Total Users</h2>
        <p>{data.totalUsers}</p>
    </div>

    <div className="stats-card">
        <h2>Total Notes</h2>
        <p>{data.totalNotes}</p>
    </div>

    <div className="stats-card">
        <h2>Today Users</h2>
        <p>{data.todayUsers}</p>
    </div>

    <div className="stats-card">
        <h2>Today Notes</h2>
        <p>
            {data.todayNotes}
        </p>
    </div>

            </div>

            <div className="admin-info">

                <h2>Quick Overview</h2>

                <ul>
                    <li>Manage all users</li>

                    <li>View and control notes</li>

                    <li>Monitor app activity</li>

                    <li>Access analytics dashboard</li>
                </ul>

            </div>

        </div>
    );
};