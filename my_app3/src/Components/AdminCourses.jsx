import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "../App.css";

// ✅ ADD THIS
const BASE_URL = "http://localhost:8080";

function AdminCourses() {

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  function loadCourses() {
    axios.get(`${BASE_URL}/api/courses/all`)   // ✅ FIXED
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
  }

  function addCourse() {

    if (!courseName || !courseCode) {
      alert("Please fill all fields");
      return;
    }

    const newCourse = {
      courseName,
      courseCode
    };

    axios.post(`${BASE_URL}/api/courses/add`, newCourse)   // ✅ FIXED
      .then(() => {

        alert("Course Added");

        setCourseName("");
        setCourseCode("");

        loadCourses();

      });

  }

  function deleteCourse(id) {

    if (window.confirm("Delete this course?")) {

      axios.delete(`${BASE_URL}/api/courses/delete/${id}`)  // ✅ FIXED
        .then(() => loadCourses());

    }

  }

  return (
    <>
      <AdminNavbar />

      <div className="subjects-page">

        <h1 className="subject-title">
          Course Management
        </h1>

        <div className="subject-form-row">

          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />

          <button onClick={addCourse}>
            Add Course
          </button>

        </div>

        <div className="subject-table-box">

          <table className="subjects-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {courses.map(c => (

                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.courseName}</td>
                  <td>{c.courseCode}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteCourse(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default AdminCourses;