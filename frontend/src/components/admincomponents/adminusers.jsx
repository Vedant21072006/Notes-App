import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/adminuser.css";
import { useEffect } from "react";

export const AdminUsers = () => {
  const navigate = useNavigate();
  const [users,setUsers]=useState([])
  useEffect(()=>{
       getuserdata()
  },[])
  const getuserdata=async()=>{
    let res= await fetch('http://localhost:3000/user-data')
    res = await res.json()

    setUsers(res)

  }
  const searchuserdata=async(val)=>{
       let res= await fetch('http://localhost:3000/user-data?search='+val)
       res =await res.json()
       setUsers(res)
  }
  const deleteuser=async(id)=>{
    let result = await fetch('http://localhost:3000/delete-user/'+id,{
      method:'DELETE',
      body:JSON.stringify(users),
      headers:{
        'Content-Type':'application/json'
      }
    })
    result = await result.json()
    if(result){
      alert(`Account-> Name:${result.name} deleted`)
      getuserdata()
    }
    else{
      alert("operation failed")
    }
  }

  return (
    <div className="admin-users-container">
      <h1>Users Management</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or email..."
          onChange={(e)=>searchuserdata(e.target.value)}
        />
      </div>

      <div className="users-table">
        <div className="table-header">
          <span>Name</span>
          <span>Email</span>
          <span>User ID</span>
          <span>Actions</span>
        </div>

        {users.map((user) => (
          <div className="table-row" key={user._id}>
            <span>{user.name}</span>

            <span>{user.email}</span>

            <span>{user._id}</span>

            <div className="action-buttons">
              <button
                className="notes-btn"
                onClick={()=>navigate(`/admin/user-notes/${user._id}`)}
              >
                User Notes
              </button>

              <button
                className="delete-btn"
                onClick={()=>deleteuser(user._id)}
              >
                Remove User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};