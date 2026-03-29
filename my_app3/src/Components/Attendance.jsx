import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

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

  function markAttendance() {
    axios.post("http://localhost:2011/api/attendance/mark", attendance)
      .then(() => {
        alert("Attendance Marked");
        getAllAttendance();
      });
  }

  function getAllAttendance() {
    axios.get("http://localhost:2011/api/attendance/all")
      .then(res => setRecords(res.data));
  }

  function deleteAttendance(id) {
    axios.delete(`http://localhost:2011/api/attendance/delete/${id}`)
      .then(() => getAllAttendance());
  }

  return (
    <div className="dashboard-container">
      <h2>Attendance Management</h2>

      <input placeholder="Roll No" onChange={e => setAttendance({ ...attendance, rollNo: e.target.value })} />
      <input placeholder="Student Name" onChange={e => setAttendance({ ...attendance, studentName: e.target.value })} />
      <input placeholder="Course Name" onChange={e => setAttendance({ ...attendance, courseName: e.target.value })} />
      <input placeholder="Subject Name" onChange={e => setAttendance({ ...attendance, subjectName: e.target.value })} />
      <input type="date" onChange={e => setAttendance({ ...attendance, date: e.target.value })} />

      <select onChange={e => setAttendance({ ...attendance, status: e.target.value })}>
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
                <button onClick={() => deleteAttendance(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
