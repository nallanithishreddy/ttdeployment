import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "25px",
        padding: "15px 25px",
        background: "#3742fa",
        alignItems: "center"
      }}
    >
      <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
        Dashboard
      </Link>

      <Link to="/subjects" style={{ color: "white", textDecoration: "none" }}>
        Subjects
      </Link>

      <Link to="/courses" style={{ color: "white", textDecoration: "none" }}>
        Courses
      </Link>
      <Link to="/attendance" style={{ color: "white" }}>Attendance</Link>


      <Link
        to="/login"
        style={{
          color: "white",
          textDecoration: "none",
          marginLeft: "auto"
        }}
      >
        Login
      </Link>
    </nav>
  );
}

export default Navbar;
