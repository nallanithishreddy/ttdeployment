import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "../App.css";

// ✅ ADD THIS
const BASE_URL = "http://localhost:8080";

function AdminSubjects() {

  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [courseName, setCourseName] = useState("");

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    loadSubjects();
  }, []);

  function loadSubjects() {
    axios.get(`${BASE_URL}/api/subjects/all`)   // ✅ FIXED
      .then(res => setSubjects(res.data))
      .catch(err => console.log(err));
  }

  function addSubject() {

    if (!subjectName || !subjectCode || !courseName) {
      alert("Please fill all fields");
      return;
    }

    const newSubject = {
      subjectName,
      subjectCode,
      courseName
    };

    axios.post(`${BASE_URL}/api/subjects/add`, newSubject)   // ✅ FIXED
      .then(() => {

        alert("Subject Added");

        setSubjectName("");
        setSubjectCode("");
        setCourseName("");

        loadSubjects();

      });

  }

  function deleteSubject(id) {

    if (window.confirm("Delete this subject?")) {

      axios.delete(`${BASE_URL}/api/subjects/delete/${id}`)   // ✅ FIXED
        .then(() => loadSubjects());

    }

  }

  return (
    <>
      <AdminNavbar />

      <div className="subjects-page">

        <h1 className="subject-title">
          Subject Management
        </h1>

        <div className="subject-form-row">

          <input
            type="text"
            placeholder="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Subject Code"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
          />

          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />

          <button onClick={addSubject}>
            Add Subject
          </button>

        </div>

        <div className="subject-table-box">

          <table className="subjects-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {subjects.map(s => (

                <tr key={s.id}>

                  <td>{s.id}</td>
                  <td>{s.subjectName}</td>
                  <td>{s.subjectCode}</td>
                  <td>{s.courseName}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteSubject(s.id)}
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

export default AdminSubjects;