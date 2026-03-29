import { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";
import "../App.css";

// ✅ ADD THIS
const BASE_URL = "https://ttdeployment-l4ag.onrender.com";

function StudentMarks() {

  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);

  const [subjectStats, setSubjectStats] = useState([]);
  const [cgpa, setCgpa] = useState(0);

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [filteredMarks, setFilteredMarks] = useState([]);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      window.location.href = "/login";
      return;
    }

    loadSubjects();
    fetchMarks(user.username);

  }, []);

  const loadSubjects = async () => {
    const res = await axios.get(`${BASE_URL}/api/subjects/all`);   // ✅ FIXED
    setSubjects(res.data);
  };

  const fetchMarks = async (username) => {
    const res = await axios.get(
      `${BASE_URL}/api/marks/student/username/${username}`   // ✅ FIXED
    );
    setMarks(res.data);
  };

  useEffect(() => {
    if (subjects.length === 0) return;
    calculateStats();
  }, [subjects, marks]);

  const calculateStats = () => {

    let sum = 0;
    marks.forEach(m => sum += (m.marks || 0));

    const avg = marks.length === 0 ? 0 : (sum / marks.length).toFixed(2);
    setCgpa(avg);

    const stats = subjects.map(sub => {

      const records = marks.filter(m => m.subjectId === sub.id);

      let totalMarks = 0;
      records.forEach(r => totalMarks += (r.marks || 0));

      const avgMarks =
        records.length === 0 ? 0 : (totalMarks / records.length).toFixed(2);

      return {
        subject: sub.subjectName,
        avg: avgMarks
      };
    });

    setSubjectStats(stats);
  };

  const handleClick = (subject, subjectId) => {

    setSelectedSubject(subject);

    const filtered = marks.filter(m => m.subjectId === subjectId);
    setFilteredMarks(filtered);
  };

  return (
    <>
      <StudentNavbar />

      <div className="subjects-page">

        <h1 className="subject-title">My Marks</h1>

        <div className="subject-table-box" style={{ marginBottom: "20px" }}>
          <h3 style={{ textAlign: "center" }}>Overall CGPA / Average</h3>
          <h2 style={{ textAlign: "center", color: "#22c55e" }}>
            {cgpa}
          </h2>
        </div>

        <div className="subject-table-box">

          <table className="subjects-table">

            <thead>
              <tr>
                <th>Subject</th>
                <th>Average Marks</th>
              </tr>
            </thead>

            <tbody>

              {subjects.map((sub, i) => {

                const stat = subjectStats.find(
                  s => s.subject === sub.subjectName
                );

                return (
                  <tr
                    key={i}
                    onClick={() => handleClick(sub.subjectName, sub.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{sub.subjectName}</td>
                    <td>{stat ? stat.avg : 0}</td>
                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        {selectedSubject && (
          <div className="subject-table-box" style={{ marginTop: "25px" }}>

            <h3>{selectedSubject} - Exam Details</h3>

            <table className="subjects-table">

              <thead>
                <tr>
                  <th>Exam Type</th>
                  <th>Marks</th>
                </tr>
              </thead>

              <tbody>

                {filteredMarks.length === 0 ? (
                  <tr>
                    <td colSpan="2">No Marks Available</td>
                  </tr>
                ) : (
                  filteredMarks.map((m, i) => (
                    <tr key={i}>
                      <td>{m.examType}</td>
                      <td>{m.marks}</td>
                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </>
  );
}

export default StudentMarks;