import { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";
import "../App.css";

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

  // ================= FETCH =================

  const loadSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:8085/api/subjects/all");
      setSubjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMarks = async (username) => {
    try {
      const res = await axios.get(
        `http://localhost:8085/api/marks/student/username/${username}`
      );
      setMarks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= CALCULATE =================

  useEffect(() => {
    if (subjects.length === 0) return;
    calculateStats();
  }, [subjects, marks]);

  const calculateStats = () => {

    // ===== CGPA =====
    let total = marks.length;

    let sum = 0;
    marks.forEach(m => {
      sum += (m.marks || 0);   // ✅ FIXED HERE
    });

    const avg = total === 0 ? 0 : (sum / total).toFixed(2);

    setCgpa(avg);

    // ===== SUBJECT-WISE =====
    const stats = subjects.map(sub => {

      const records = marks.filter(
        m => m.subjectId === sub.id   // ✅ MORE RELIABLE THAN NAME
      );

      let totalMarks = 0;
      records.forEach(r => {
        totalMarks += (r.marks || 0);  // ✅ FIXED HERE
      });

      const avgMarks =
        records.length === 0
          ? 0
          : (totalMarks / records.length).toFixed(2);

      return {
        subject: sub.subjectName,
        avg: avgMarks
      };
    });

    setSubjectStats(stats);
  };

  // ================= CLICK =================

  const handleClick = (subject, subjectId) => {

    setSelectedSubject(subject);

    const filtered = marks.filter(
      m => m.subjectId === subjectId   // ✅ FIXED HERE
    );

    setFilteredMarks(filtered);
  };

  return (
    <>
      <StudentNavbar />

      <div className="subjects-page">

        <h1 className="subject-title">My Marks</h1>

        {/* ===== CGPA CARD ===== */}
        <div className="subject-table-box" style={{ marginBottom: "20px" }}>
          <h3 style={{ textAlign: "center" }}>Overall CGPA / Average</h3>
          <h2 style={{ textAlign: "center", color: "#22c55e" }}>
            {cgpa}
          </h2>
        </div>

        {/* ===== SUBJECT TABLE ===== */}
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

        {/* ===== DETAILS ===== */}
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
                      <td>{m.marks}</td> {/* ✅ FIXED */}
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