import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "../App.css";

// ✅ ADD THIS
const BASE_URL = "https://ttdeployment-l4ag.onrender.com";

function AdminAttendance() {

  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    getSubjects();
  }, []);

  function getSubjects() {
    axios.get(`${BASE_URL}/api/subjects/all`)   // ✅ FIXED
      .then(res => setSubjects(res.data))
      .catch(err => console.error(err));
  }

  function loadStudents() {

    axios.get(`${BASE_URL}/api/students/all`)   // ✅ FIXED
      .then(res => {

        setStudents(res.data);

        const defaultAttendance = {};

        res.data.forEach(student => {
          defaultAttendance[student.id] = "Present";
        });

        setAttendance(defaultAttendance);

      })
      .catch(err => console.error(err));
  }

  function handleSubjectChange(e) {

    const subject = e.target.value;

    setSelectedSubject(subject);

    if (subject) {
      loadStudents();
    }

  }

  function markAttendance(studentId, status) {

    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));

  }

  function markAllPresent() {

    const updatedAttendance = {};

    students.forEach(student => {
      updatedAttendance[student.id] = "Present";
    });

    setAttendance(updatedAttendance);

  }

  function saveAttendance() {

    if (!selectedSubject || !date) {
      alert("Please select subject and date");
      return;
    }

    const attendanceList = students.map(student => ({
      studentName: student.studentName,
      subjectName: selectedSubject,
      date: date,
      status: attendance[student.id] || "Present"
    }));

    axios.post(`${BASE_URL}/api/attendance/addAll`, attendanceList)  // ✅ FIXED
      .then(() => {
        alert("Attendance Saved Successfully");
      })
      .catch(err => {
        console.error(err);
        alert("Error saving attendance");
      });

  }

  return (
    <>
      <AdminNavbar />

      <div className="subjects-page">

        <h1 className="subject-title">
          Attendance Management
        </h1>

        <div className="subject-form-row">

          <select
            value={selectedSubject}
            onChange={handleSubjectChange}
          >
            <option value="">Select Subject</option>

            {subjects.map(sub => (
              <option key={sub.id} value={sub.subjectName}>
                {sub.subjectName}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            onClick={markAllPresent}
            className="present-btn"
          >
            Mark All Present
          </button>

        </div>

        <div className="subject-table-box">

          <table className="subjects-table">

            <thead>
              <tr>
                <th>Student</th>
                <th>Present</th>
                <th>Absent</th>
              </tr>
            </thead>

            <tbody>

              {students.map(student => (

                <tr key={student.id}>

                  <td>{student.studentName}</td>

                  <td>
                    <button
                      className={
                        attendance[student.id] === "Present"
                          ? "present-btn active"
                          : "present-btn"
                      }
                      onClick={() =>
                        markAttendance(student.id, "Present")
                      }
                    >
                      P
                    </button>
                  </td>

                  <td>
                    <button
                      className={
                        attendance[student.id] === "Absent"
                          ? "absent-btn active"
                          : "absent-btn"
                      }
                      onClick={() =>
                        markAttendance(student.id, "Absent")
                      }
                    >
                      A
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <button
          className="save-btn"
          onClick={saveAttendance}
          style={{ marginTop: "20px" }}
        >
          Save Attendance
        </button>

      </div>
    </>
  );
}

export default AdminAttendance;