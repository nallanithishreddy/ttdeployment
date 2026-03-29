import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "../App.css";

function AdminCourses() {

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  function loadCourses() {
    axios.get("http://localhost:8085/api/courses/all")
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
  }

  function addCourse() {

    if (!courseName || !courseCode) {
      alert("Please fill all fields");
      return;
    }

    const newCourse = {
      courseName: courseName,
      courseCode: courseCode
    };

    axios.post("http://localhost:8085/api/courses/add", newCourse)
      .then(() => {

        alert("Course Added");

        setCourseName("");
        setCourseCode("");

        loadCourses();

      });

  }

  function deleteCourse(id) {

    if (window.confirm("Delete this course?")) {

      axios.delete("http://localhost:8085/api/courses/delete/" + id)
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


        {/* INPUT ROW */}

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


        {/* TABLE */}

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