import { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";
import "../App.css";

function StudentSubjects() {

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      window.location.href = "/login";
      return;
    }

    loadSubjects();

  }, []);

  // ================= FETCH =================

  const loadSubjects = async () => {
    try {
      const res = await axios.get("https://ttdeployment-l4ag.onrender.com/api/subjects/all");
      setSubjects(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <StudentNavbar />

      <div className="subjects-page">

        <h1 className="subject-title">My Subjects</h1>

        <div className="subject-table-box">

          <table className="subjects-table">

            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Subject Code</th>
              </tr>
            </thead>

            <tbody>

              {subjects.length === 0 ? (
                <tr>
                  <td colSpan="2">No Subjects Available</td>
                </tr>
              ) : (
                subjects.map((sub, i) => (
                  <tr key={i}>
                    <td>{sub.subjectName}</td>
                    <td>{sub.subjectCode}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default StudentSubjects;