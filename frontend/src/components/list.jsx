import { useEffect, useState } from 'react';
import '../styles/list.css'
import { useNavigate } from 'react-router-dom';
export const List = () => {
  let navigate = useNavigate()
   const [listdata,setListData]= useState([])
    const [seachdata,setSearchData]=useState([])
   useEffect(()=>{
      extractData()
   },[])

   const searchitems=async(val)=>{
       setSearchData(val)
       let res = await fetch('http://localhost:3000/list?title='+val,{
        credentials:'include'
       })
       res= await res.json()
       setListData(res) 
   }

   const extractData=async()=>{
     let res = await fetch('http://localhost:3000/list',{
      credentials:'include'
     })
     res= await res.json()
     setListData(res)
     
     
   }
   const deleteNote=async(id)=>{
        let res = await fetch('http://localhost:3000/delete/'+id,{
            method:'DELETE',
            credentials:'include'
        })
        res= await res.json()
        extractData()
     
    
   }
  const updateNote=()=>{

  }
  return (
  <div className="list-container">

  <div className="list-header">

    <h2 className="list-title">Your Notes</h2>

    {/* Search Bar */}
    <div className="search-box">
      <input
        type="text"
        placeholder="Search notes..."
        className="search-input"
        onChange={(e)=>searchitems(e.target.value)}
      />
    </div>

  </div>

  <div className="notes-grid">

    {
      listdata.map((element)=>{

        return (

          <div className="note-card" key={element._id} >

            <h3 className="note-title">{element.title}</h3>

            <p className="note-content">
              {element.content}
            </p>

            <div className="note-footer">

              <span className="note-date">
                {new Date(element.createdAt).toLocaleDateString()} <br />{new Date(element.createdAt).toLocaleTimeString()}
              </span>

              <div className="note-actions">

                <button
                  className="edit-btn"
                  onClick={()=>navigate(`/update/${element._id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={()=>deleteNote(element._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        )

      })
    }

  </div>

</div>
  );
};