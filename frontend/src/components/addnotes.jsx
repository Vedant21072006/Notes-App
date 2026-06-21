import { useState } from 'react';
import '../styles/addnotes.css'
import { useNavigate } from 'react-router-dom';

export const CreateNote = () => {
    let  navigate =useNavigate()
    const [data,setData]=useState({ })

    const addData=async()=>{
         
        if(!data.title || !data.content){
          alert("Please enter data in all fields")
          return
        }
      
        let finaldata =  {...data,
          createdAt:new Date()
        }
    let res = await fetch('http://localhost:3000/add',{
            method:'POST',
            credentials:'include',
            body: JSON.stringify(finaldata),
            headers:{
               'Content-Type':'application/json'
            }
         })
         if(res){
             navigate('/list')
            }
        else{
            navigate('/addnotes')
        }

      
         
    }
    
  return (
    <div className="create-container">

      <h2 className="create-title">Create a New Note</h2>

      <div className="create-form">

        <input
          type="text"
          className="input-field"
          placeholder="Enter title..."
          onChange={(event)=>setData({...data,title:event.target.value})}
        />

        <textarea
          className="textarea-field"
          placeholder="Enter note content..."
               onChange={(event)=>setData({...data,content:event.target.value})}
        ></textarea>

        <button className="submit-btn" onClick={addData} >
          Add Note
        </button>

      </div>

    </div>
  );
};