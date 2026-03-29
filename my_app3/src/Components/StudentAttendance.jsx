import { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";
import "../App.css";

function StudentAttendance() {

  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [subjectStats, setSubjectStats] = useState([]);
  const [overallPercent, setOverallPercent] = useState(0);

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      window.location.href = "/login";
      return;
    }

    loadSubjects();
    fetchAttendance(user.username);

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

  const fetchAttendance = async (username) => {
    try {
      const res = await axios.get(
        `http://localhost:8085/api/attendance/student/${username}`
      );

      setAttendance(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= CALCULATE =================

  useEffect(() => {
    if (subjects.length === 0) return;
    calculateStats();
  }, [subjects, attendance]);

  const calculateStats = () => {

    // ===== OVERALL =====
    let total = attendance.length;

    let present = attendance.filter(
      a => a.status && a.status.toLowerCase().trim() === "present"
    ).length;

    const overall =
      total === 0 ? 0 : ((present / total) * 100).toFixed(2);

    setOverallPercent(overall);

    // ===== SUBJECT-WISE =====
    const stats = subjects.map(sub => {

      const records = attendance.filter(
        a =>
          a.subjectName?.toLowerCase().trim() ===
          sub.subjectName?.toLowerCase().trim()
      );

      const totalSub = records.length;

      const presentSub = records.filter(
        a => a.status && a.status.toLowerCase().trim() === "present"
      ).length;

      const percent =
        totalSub === 0 ? 0 : ((presentSub / totalSub) * 100).toFixed(2);

      return {
        subject: sub.subjectName,
        percent: percent
      };
    });

    setSubjectStats(stats);
  };

  // ================= CLICK =================

  const handleClick = (subject) => {

    setSelectedSubject(subject);

    const filtered = attendance.filter(
      a =>
        a.subjectName?.toLowerCase().trim() ===
        subject?.toLowerCase().trim()
    );

    setFilteredRecords(filtered);
  };

  return (
    <>
      <StudentNavbar />

      <div className="subjects-page">

        <h1 className="subject-title">My Attendance</h1>

        {/* ===== OVERALL CARD ===== */}
        <div className="subject-table-box" style={{ marginBottom: "20px" }}>
          <h3 style={{ textAlign: "center" }}>Overall Attendance</h3>
          <h2 style={{ textAlign: "center", color: "#6366f1" }}>
            {overallPercent}%
          </h2>
        </div>

        {/* ===== SUBJECT TABLE ===== */}
        <div className="subject-table-box">

          <table className="subjects-table">

            <thead>
              <tr>
                <th>Subject</th>
                <th>Attendance %</th>
              </tr>
            </thead>

            <tbody>

              {subjectStats.map((s, i) => (
                <tr
                  key={i}
                  onClick={() => handleClick(s.subject)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{s.subject}</td>
                  <td>{s.percent}%</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* ===== DETAILS ===== */}
        {selectedSubject && (
          <div className="subject-table-box" style={{ marginTop: "25px" }}>

            <h3>{selectedSubject} - Attendance Details</h3>

            <table className="subjects-table">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="2">No Attendance Records</td>
                  </tr>
                ) : (
                  filteredRecords.map((a, i) => (
                    <tr key={i}>
                      <td>{a.date}</td>
                      <td>
                        {a.status && a.status.toLowerCase().trim() === "present"
                          ? "✅ P"
                          : "❌ A"}
                      </td>
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

export default StudentAttendance;