import { Link } from "react-router-dom";
import { useState } from "react";
import "../App.css";

function StudentNavbar() {

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

        <h2>{collapsed ? "SP" : "Student Panel"}</h2>

        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          ☰
        </button>

      </div>


      {/* ===== MENU ===== */}

      <nav className="sidebar-menu">

        <Link to="/student/dashboard">
          🏠 {collapsed ? "" : "Home"}
        </Link>

        <Link to="/student/subjects">
          📚 {collapsed ? "" : "Subjects"}
        </Link>

        <Link to="/student/attendance">
          📊 {collapsed ? "" : "Attendance"}
        </Link>

        <Link to="/student/marks">
          📝 {collapsed ? "" : "Marks"}
        </Link>

        <Link to="/student/notes">
          📁 {collapsed ? "" : "Notes"}
        </Link>

        <Link to="/student/profile">
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

export default StudentNavbar;