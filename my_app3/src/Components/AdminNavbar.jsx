import { Link } from "react-router-dom";
import { useState } from "react";
import "../App.css";

function AdminNavbar() {

  const [collapsed, setCollapsed] = useState(false);

  // LOGOUT FUNCTION
  function logout() {
    localStorage.clear();
    alert("Logged out successfully");
    window.location.href = "/login";
  }

  return (

    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>

      {/* ===== SIDEBAR HEADER ===== */}

      <div className="sidebar-header">

        <h2>{collapsed ? "AP" : "Admin Panel"}</h2>

        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          ☰
        </button>

      </div>


      {/* ===== MENU ===== */}

      <nav className="sidebar-menu">

        <Link to="/admin/dashboard">
          🏠 {collapsed ? "" : "Home"}
        </Link>
        <Link to="/admin/students">
  👨‍🎓 {collapsed ? "" : "Students"}
</Link>
        <Link to="/admin/subjects">
          📚 {collapsed ? "" : "Subjects"}
        </Link>
       <Link to="/admin/notes">
📚 {collapsed ? "" : "Notes"}
</Link>
        <Link to="/admin/courses">
          📘 {collapsed ? "" : "Courses"}
        </Link>

        <Link to="/admin/attendance">
          📊 {collapsed ? "" : "Attendance"}
        </Link>

        <Link to="/admin/marks">
          📝 {collapsed ? "" : "Marks"}
        </Link>

        {/* PROFILE PAGE */}
        <Link to="/admin/profile">
          👤 {collapsed ? "" : "Profile"}
        </Link>
        
      </nav>


      {/* ===== LOGOUT ===== */}

      <button className="logout-btn" onClick={logout}>
        🚪 {collapsed ? "" : "Logout"}
      </button>

    </div>

  );
}

export default AdminNavbar;