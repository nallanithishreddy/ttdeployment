import { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ResponsiveContainer
} from "recharts";

import "../App.css";

function StudentDashboard() {

  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [cgpa, setCgpa] = useState(0);
  const [overallAttendance, setOverallAttendance] = useState(0);

  const [marksGraph, setMarksGraph] = useState([]);
  const [attendanceGraph, setAttendanceGraph] = useState([]);
  const [lowAttendanceSubjects, setLowAttendanceSubjects] = useState([]);

  const colors = ["#6366f1","#22c55e","#3b82f6","#f59e0b","#ef4444"];

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      window.location.href = "/login";
      return;
    }

    setUser(storedUser);

    loadSubjects();
    fetchMarks(storedUser.username);
    fetchAttendance(storedUser.username);
    loadAnnouncements();

  }, []);

  useEffect(() => {
    if (subjects.length > 0) {
      calculateMarks();
      calculateAttendance();
    }
  }, [subjects, marks, attendance]);

  // ================= FETCH =================

  const loadSubjects = async () => {
    try {
      const res = await axios.get("https://ttdeployment-l4ag.onrender.com/api/subjects/all");
      setSubjects(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMarks = async (username) => {
    try {
      const res = await axios.get(
        `https://ttdeployment-l4ag.onrender.com/api/marks/student/username/${username}`
      );
      setMarks(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAttendance = async (username) => {
    try {
      const res = await axios.get(
        `https://ttdeployment-l4ag.onrender.com/api/attendance/student/${username}`
      );
      setAttendance(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const loadAnnouncements = async () => {
    try {
      const res = await axios.get("https://ttdeployment-l4ag.onrender.com/api/notes/all");
      setAnnouncements(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= MARKS =================

  const calculateMarks = () => {

    let sum = 0;
    marks.forEach(m => {
      sum += (m.marks || 0);
    });

    const avg = marks.length === 0 ? 0 : (sum / marks.length);

    const cgpaValue = (avg / 10).toFixed(2);
    setCgpa(cgpaValue);

    const graph = subjects.map(sub => {

      const records = marks.filter(m => m.subjectId === sub.id);

      let total = 0;
      records.forEach(r => {
        total += (r.marks || 0);
      });

      const avgMarks =
        records.length === 0 ? 0 : (total / records.length).toFixed(2);

      return {
        subject: sub.subjectName,
        marks: Number(avgMarks)
      };
    });

    setMarksGraph(graph);
  };

  // ================= ATTENDANCE =================

  const calculateAttendance = () => {

    const total = attendance.length;

    const present = attendance.filter(
      a => a.status && a.status.toLowerCase().trim() === "present"
    ).length;

    const overall =
      total === 0 ? 0 : ((present / total) * 100).toFixed(2);

    setOverallAttendance(overall);

    const graph = subjects.map(sub => {

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
        totalSub === 0
          ? 0
          : ((presentSub / totalSub) * 100).toFixed(2);

      return {
        subject: sub.subjectName,
        percent: Number(percent)
      };
    });

    setAttendanceGraph(graph);

    const low = graph.filter(g => g.percent < 75);
    setLowAttendanceSubjects(low);
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <>
      <StudentNavbar />

      <div className="dashboard-container">

        <div className="dashboard-header">
          <h1>Student Dashboard</h1>
        </div>

        {/* STATS */}
        <div className="stats-row">

          <div className="stat-box">
            <h3>Attendance %</h3>
            <p>{overallAttendance}%</p>
          </div>

          <div className="stat-box">
            <h3>CGPA</h3>
            <p>{cgpa}</p>
          </div>

          <div className="stat-box">
            <h3>Total Subjects</h3>
            <p>{subjects.length}</p>
          </div>

        </div>

        {/* ANNOUNCEMENTS + LOW ATTENDANCE */}
        <div className="graphs-row">

          <div className="graph-box">
            <h3>📢 Announcements</h3>

            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              {announcements.length === 0 ? (
                <p>No announcements</p>
              ) : (
                announcements.slice(-5).reverse().map(a => (
                  <div key={a.id} className="announcement-item">
                    <h4>{a.title}</h4>
                    <p>{a.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="graph-box">
            <h3 style={{ color: "red" }}>⚠ Low Attendance</h3>

            {lowAttendanceSubjects.length === 0 ? (
              <p>All Good ✅</p>
            ) : (
              lowAttendanceSubjects.map((l, i) => (
                <p key={i} style={{ color: "red" }}>
                  {l.subject} - {l.percent}%
                </p>
              ))
            )}

          </div>

        </div>

        {/* GRAPHS */}
        <div className="graphs-row">

          <div className="graph-box">
            <h3>Subject-wise Marks</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marksGraph}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="marks">
                  {marksGraph.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

          </div>

          <div className="graph-box">
            <h3>Subject-wise Attendance</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceGraph}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percent">
                  {attendanceGraph.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>
    </>
  );
}

export default StudentDashboard;