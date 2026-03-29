import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "../App.css";

function AdminAttendance() {

  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    getSubjects();
  }, []);

  // GET SUBJECTS
  function getSubjects() {
    axios.get("http://localhost:8085/api/subjects/all")
      .then(res => setSubjects(res.data))
      .catch(err => console.error(err));
  }

  // LOAD ALL STUDENTS
  function loadStudents() {

    axios.get("http://localhost:8085/api/students/all")
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

  // SUBJECT CHANGE
  function handleSubjectChange(e) {

    const subject = e.target.value;

    setSelectedSubject(subject);

    if (subject) {
      loadStudents();
    }

  }

  // MARK SINGLE STUDENT
  function markAttendance(studentId, status) {

    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));

  }

  // ⭐ MARK ALL PRESENT
  function markAllPresent() {

    const updatedAttendance = {};

    students.forEach(student => {
      updatedAttendance[student.id] = "Present";
    });

    setAttendance(updatedAttendance);

  }

  // SAVE ATTENDANCE
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

    axios.post("http://localhost:8085/api/attendance/addAll", attendanceList)
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

        {/* SUBJECT + DATE */}

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

          {/* MARK ALL PRESENT BUTTON */}

          <button
            onClick={markAllPresent}
            className="present-btn"
          >
            Mark All Present
          </button>

        </div>

        {/* STUDENT TABLE */}

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

        {/* SAVE BUTTON */}

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