import { useState } from 'react';
import '../../styles/addnotes.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const UpdateUserNote = () => {
    const[data,setData]=useState({
          title:"",
    content:""
    })
const {id} =useParams() 
const nav = useNavigate()
useEffect(()=>{
    fillData()
},[])
const fillData =async()=>{
    let res  = await fetch('http://localhost:3000/admin/user-old-data/'+id,{
     credentials:'include'
    })
    res= await res.json()
    setData(res.body)
}

const updateNotedata=async()=>{

     
   const { _id, ...updatedData } = data;
 
     let res = await fetch('http://localhost:3000/admin/update-user-note/' + id, {

      method:'PUT',
   credentials:'include',
      body: JSON.stringify(updatedData),

      headers:{
         'Content-Type':'application/json'
      }

   });

   res = await res.json();

   console.log(res);

   if(res.success){
      nav("/admin/user/")
   }
} 

  return (
    <div className="create-container">

      <h2 className="create-title">Update task</h2>

      <div className="create-form">

        <input
          type="text"
          className="input-field"
          placeholder="Enter title..."
          value={data.title}
          onChange={(event)=>setData({...data,title:event.target.value})}
        />

        <textarea
          className="textarea-field"
          placeholder="Enter note content..."
          value={data.content}
            onChange={(event)=>setData({...data,content:event.target.value})}
        ></textarea>

        <button className="submit-btn" 
        onClick={()=>updateNotedata()}
        > update
          </button>

      </div>

    </div>
  );
};