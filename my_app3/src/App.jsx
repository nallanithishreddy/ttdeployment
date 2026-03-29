import { Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./Components/AuthPage.jsx";

// ADMIN
import AdminDashboard from "./Components/AdminDashboard.jsx";
import AdminSubjects from "./Components/AdminSubjects.jsx";
import AdminCourses from "./Components/AdminCourses.jsx";
import AdminAttendance from "./Components/AdminAttendance.jsx";
import AdminMarks from "./Components/AdminMarks.jsx";
import AdminProfile from "./Components/AdminProfile.jsx";
import AdminStudents from "./Components/AdminStudents.jsx";
import AdminNotes from "./Components/AdminNotes.jsx";
import StudentAttendance from "./Components/StudentAttendance";
import StudentMarks from "./Components/StudentMarks.jsx";
import StudentNotes from "./Components/StudentNotes";
import StudentProfile from "./Components/StudentProfile";


// STUDENT
import StudentDashboard from "./Components/StudentDashboard.jsx";
import StudentSubjects from "./Components/StudentSubjects.jsx";   // ✅ NEW
// (later you can add more pages)

function App() {

  const role = localStorage.getItem("role");

  return (

    <Routes>

      {/* ================= DEFAULT ROUTE ================= */}

      <Route
        path="/"
        element={
          role === "ADMIN"
            ? <Navigate to="/admin/dashboard" />
            : role === "STUDENT"
            ? <Navigate to="/student/dashboard" />
            : <Navigate to="/login" />
        }
      />

      {/* ================= LOGIN ================= */}

      <Route path="/login" element={<AuthPage />} />

      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/admin/dashboard"
        element={role === "ADMIN" ? <AdminDashboard /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin/subjects"
        element={role === "ADMIN" ? <AdminSubjects /> : <Navigate to="/login" />}
      />
      <Route
  path="/student/marks"
  element={role === "STUDENT" ? <StudentMarks /> : <Navigate to="/login" />}
/>
      <Route
        path="/admin/courses"
        element={role === "ADMIN" ? <AdminCourses /> : <Navigate to="/login" />}
      />
       <Route
  path="/student/attendance"
  element={role === "STUDENT" ? <StudentAttendance /> : <Navigate to="/login" />}
/>
      <Route
        path="/admin/attendance"
        element={role === "ADMIN" ? <AdminAttendance /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin/marks"
        element={role === "ADMIN" ? <AdminMarks /> : <Navigate to="/login" />}
      />
  <Route
  path="/student/notes"
  element={role === "STUDENT" ? <StudentNotes /> : <Navigate to="/login" />}
/>
      <Route
        path="/admin/profile"
        element={role === "ADMIN" ? <AdminProfile /> : <Navigate to="/login" />}
      />
  
<Route
  path="/student/profile"
  element={role === "STUDENT" ? <StudentProfile /> : <Navigate to="/login" />}
/>
      <Route
        path="/admin/students"
        element={role === "ADMIN" ? <AdminStudents /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin/notes"
        element={role === "ADMIN" ? <AdminNotes /> : <Navigate to="/login" />}
      />

      {/* ================= STUDENT ROUTES ================= */}

      <Route
        path="/student/dashboard"
        element={role === "STUDENT" ? <StudentDashboard /> : <Navigate to="/login" />}
      />

      <Route
        path="/student/subjects"
        element={role === "STUDENT" ? <StudentSubjects /> : <Navigate to="/login" />}
      />

      {/* 👉 You can add more later:
      <Route path="/student/attendance" ... />
      <Route path="/student/marks" ... />
      <Route path="/student/notes" ... />
      */}

      {/* ================= PAGE NOT FOUND ================= */}

      <Route
        path="*"
        element={
          <h2 style={{ textAlign: "center", marginTop: "50px" }}>
            Page Not Found
          </h2>
        }
      />

    </Routes>

  );
}

export default App;