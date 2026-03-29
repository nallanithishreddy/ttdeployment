import { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";
import "../App.css";

// ✅ BASE URL
const BASE_URL = "https://ttdeployment-l4ag.onrender.com";

function StudentSubjects() {

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    loadSubjects();
  }, []);

  function loadSubjects() {
    axios.get(`${BASE_URL}/api/subjects/all`)   // ✅ FIXED
      .then(res => setSubjects(res.data))
      .catch(err => console.log(err));
  }

  return (
    <>
      <StudentNavbar />

      <div className="subjects-page">

        <h1 className="subject-title">
          My Subjects
        </h1>

        <div className="subject-table-box">

          <table className="subjects-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Course</th>
              </tr>
            </thead>

            <tbody>

              {subjects.length > 0 ? (
                subjects.map(s => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.subjectName}</td>
                    <td>{s.subjectCode}</td>
                    <td>{s.courseName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No subjects available
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default StudentSubjects;