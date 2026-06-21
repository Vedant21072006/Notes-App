import { useEffect, useState } from 'react';
import '../../styles/list.css'
import { useNavigate, useParams } from 'react-router-dom';
export const AdminUserList = () => {
    const navigate = useNavigate()
  const {id} = useParams()
  const [listdata,setListData]=useState([])
  useEffect(()=>{
     getusernotes()
      
        
  },[])
  const getusernotes=async()=>{
       let data = await fetch('http://localhost:3000/user-notes/'+id)
       data = await data.json()
        setListData(data.data)
      
}
 const deleteNote=async(id)=>{
       console.log("Deleting:", id);

        let res = await fetch('http://localhost:3000/admin/delete-user-notes/'+id,{
            method:'DELETE',
            credentials:'include'
        })

        res= await res.json()
       getusernotes()
     
    
   }
  return (
  <div className="list-container">

  <div className="list-header">

    <h2 className="list-title"> Notes</h2>

    {/* Search Bar */}
    <div className="search-box">
      <input
        type="text"
        placeholder="Search notes..."
        className="search-input"
        // onChange={(e)=>searchitems(e.target.value)}
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
                {element.createdAt}
              </span>

              <div className="note-actions">

                <button
                  className="edit-btn"
                onClick={()=>navigate(`/admin/edit-user-note/${element._id}`)}
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