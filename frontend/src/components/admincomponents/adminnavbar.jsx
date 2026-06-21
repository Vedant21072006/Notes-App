// AdminNavbar.jsx

import { Link, useNavigate } from "react-router-dom";
import "../../styles/AdminNavbar.css"

export const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // later connect backend logout API
    navigate("/login");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-logo">
        Admin Panel
      </div>

      <div className="admin-links">
        <Link to="/admin">Home</Link>

        

        <Link to="/admin/user">
          Users
        </Link>

        <Link to="/admin/mynotes">
          My Notes
        </Link>
      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};