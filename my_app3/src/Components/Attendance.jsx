import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

// ✅ ADD THIS
const BASE_URL = "http://localhost:8080";

function Attendance() {

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.href = "/login";
    }
  }, []);

  const [attendance, setAttendance] = useState({
    rollNo: "",
    studentName: "",
    courseName: "",
    subjectName: "",
    date: "",
    status: "Present"
  });

  const [records, setRecords] = useState([]);

  // MARK ATTENDANCE
  function markAttendance() {
    axios.post(`${BASE_URL}/api/attendance/mark`, attendance)   // ✅ FIXED
      .then(() => {
        alert("Attendance Marked");
        getAllAttendance();
      })
      .catch(err => {
        console.log(err);
        alert("Error marking attendance");
      });
  }

  // GET ALL
  function getAllAttendance() {
    axios.get(`${BASE_URL}/api/attendance/all`)   // ✅ FIXED
      .then(res => setRecords(res.data))
      .catch(err => console.log(err));
  }

  // DELETE
  function deleteAttendance(id) {
    axios.delete(`${BASE_URL}/api/attendance/delete/${id}`)   // ✅ FIXED
      .then(() => getAllAttendance())
      .catch(err => console.log(err));
  }

  return (
    <div className="dashboard-container">
      <h2>Attendance Management</h2>

      <input placeholder="Roll No"
        onChange={e => setAttendance({ ...attendance, rollNo: e.target.value })} />

      <input placeholder="Student Name"
        onChange={e => setAttendance({ ...attendance, studentName: e.target.value })} />

      <input placeholder="Course Name"
        onChange={e => setAttendance({ ...attendance, courseName: e.target.value })} />

      <input placeholder="Subject Name"
        onChange={e => setAttendance({ ...attendance, subjectName: e.target.value })} />

      <input type="date"
        onChange={e => setAttendance({ ...attendance, date: e.target.value })} />

      <select
        onChange={e => setAttendance({ ...attendance, status: e.target.value })}
      >
        <option>Present</option>
        <option>Absent</option>
      </select>

      <button onClick={markAttendance}>Mark Attendance</button>
      <button onClick={getAllAttendance}>View Attendance</button>

      <table className="users-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {records.map(a => (
            <tr key={a.id}>
              <td>{a.date}</td>
              <td>{a.rollNo}</td>
              <td>{a.studentName}</td>
              <td>{a.subjectName}</td>
              <td>{a.status}</td>
              <td>
                <button onClick={() => deleteAttendance(a.id)}>
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

export default Attendance;