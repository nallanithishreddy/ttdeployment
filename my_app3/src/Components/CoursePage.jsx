import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function CoursePage() {

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.href = "/login";
    }
  }, []);

  const [course, setCourse] = useState({
    courseName: "",
    courseCode: ""
  });

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  function addCourse() {
    axios.post("http://localhost:2011/api/courses/add", course)
      .then(() => {
        alert("Course Added");
        setCourse({ courseName: "", courseCode: "" });
        getAllCourses();
      });
  }

  function getAllCourses() {
    axios.get("http://localhost:2011/api/courses/all")
      .then(res => setCourses(res.data));
  }

  function searchCourse() {
    axios.get(`http://localhost:2011/api/courses/search/${search}`)
      .then(res => setCourses(res.data));
  }

  function deleteCourse(id) {
    axios.delete(`http://localhost:2011/api/courses/delete/${id}`)
      .then(() => {
        alert("Course Deleted");
        getAllCourses();
      });
  }

  return (
    <div className="dashboard-container">
      <h2>Course Management</h2>

      <input
        placeholder="Course Name"
        value={course.courseName}
        onChange={(e) =>
          setCourse({ ...course, courseName: e.target.value })
        }
      />

      <input
        placeholder="Course Code"
        value={course.courseCode}
        onChange={(e) =>
          setCourse({ ...course, courseCode: e.target.value })
        }
      />

      <button onClick={addCourse}>Add Course</button>
      <button onClick={getAllCourses}>All Courses</button>

      <div className="search-box">
        <input
          placeholder="Search Course Name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchCourse}>Search</button>
      </div>

      <table className="users-table">
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
  );
}

export default CoursePage;