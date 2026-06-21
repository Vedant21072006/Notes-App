// Navbar.jsx

import { useNavigate } from 'react-router-dom'
import '../styles/navbar.css'

const  Navbar=()=>{

  let nav = useNavigate()
   const logout=async()=>{
   let res = await fetch('http://localhost:3000/logout',{
    method:'POST',
    credentials:'include'
   })
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    
   
    nav("/login")
   }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Notes App</h2>
      </div>

      <ul className="navbar-links">
  
            <li><a href="/">Home</a></li>
            <li><a href="/list">My Notes</a></li>
            <li><a href="/addnotes">Create</a></li>
            <li>
              <button onClick={logout}>
                Logout
              </button>
            </li>
          
 
      
      </ul>
    </nav>
    
  )
}

export default Navbar;