import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
Cell,
ResponsiveContainer,
PieChart,
Pie,
Legend
} from "recharts";

import "../App.css";

function AdminDashboard(){

const [subjects,setSubjects]=useState(0);
const [students,setStudents]=useState([]);
const [totalStudents,setTotalStudents]=useState(0);

const [avgAttendance,setAvgAttendance]=useState(0);
const [avgMarks,setAvgMarks]=useState(0);

const [marksGraph,setMarksGraph]=useState([]);
const [attendanceGraph,setAttendanceGraph]=useState([]);

const [title,setTitle]=useState("");
const [message,setMessage]=useState("");
const [announcements,setAnnouncements]=useState([]);

const [lowAttendance,setLowAttendance]=useState({});
const [lowMarks,setLowMarks]=useState({});

const colors=[
"#6366f1",
"#22c55e",
"#3b82f6",
"#f59e0b",
"#ef4444",
"#8b5cf6",
"#10b981"
];

useEffect(()=>{
loadSubjects();
loadStudents();
calculateAttendance();
calculateMarks();
getSubjectAttendanceGraph();
loadAnnouncements();
loadLowAttendance();
loadLowMarks();
},[]);

useEffect(()=>{
if(students.length>0){
getMarksGraph();
}
},[students]);

/* SUBJECT COUNT */

function loadSubjects(){

axios.get("http://localhost:8085/api/subjects/all")

.then(res=>{
setSubjects(res.data.length);
})

.catch(err=>console.log(err));

}

/* STUDENTS */

function loadStudents(){

axios.get("http://localhost:8085/api/students/all")

.then(res=>{
setStudents(res.data);
setTotalStudents(res.data.length);
})

.catch(err=>console.log(err));

}

/* AVERAGE ATTENDANCE */

function calculateAttendance(){

axios.get("http://localhost:8085/api/attendance/all")

.then(res=>{

const records=res.data;

const present=records.filter(a=>a.status==="Present").length;

const total=records.length;

const percent=total===0 ? 0 : ((present/total)*100).toFixed(2);

setAvgAttendance(percent);

})

.catch(err=>console.log(err));

}

/* AVERAGE MARKS */

function calculateMarks(){

axios.get("http://localhost:8085/api/marks/all")

.then(res=>{

const marks=res.data;

const total=marks.reduce((sum,m)=>sum+m.marks,0);

const avg=marks.length===0 ? 0 : (total/marks.length).toFixed(2);

setAvgMarks(avg);

})

.catch(err=>console.log(err));

}

/* STUDENT MARKS GRAPH */

function getMarksGraph(){

axios.get("http://localhost:8085/api/marks/all")

.then(res=>{

const records=res.data;

const map={};

records.forEach(m=>{

if(!map[m.studentId]){
map[m.studentId]={total:0,count:0};
}

map[m.studentId].total+=m.marks;
map[m.studentId].count++;

});

const graphData=Object.keys(map).map(id=>{

const student=students.find(s=>s.id===Number(id));

const avg=(map[id].total/map[id].count).toFixed(2);

return{
student:student ? student.studentName : "Student "+id,
marks:Number(avg)
};

});

setMarksGraph(graphData);

})

.catch(err=>console.log(err));

}

/* SUBJECT ATTENDANCE PIE GRAPH */

function getSubjectAttendanceGraph(){

axios.get("http://localhost:8085/api/attendance/all")

.then(res=>{

const records=res.data;

const subjectMap={};

records.forEach(r=>{

if(!subjectMap[r.subjectName]){
subjectMap[r.subjectName]={total:0,present:0};
}

subjectMap[r.subjectName].total++;

if(r.status==="Present"){
subjectMap[r.subjectName].present++;
}

});

const graphData=Object.keys(subjectMap).map(sub=>{

const data=subjectMap[sub];

const percent=data.total===0 ? 0 : ((data.present/data.total)*100).toFixed(2);

return{
name:sub,
value:Number(percent)
};

});

setAttendanceGraph(graphData);

})

.catch(err=>console.log(err));

}

/* ANNOUNCEMENTS */

function loadAnnouncements(){

axios.get("http://localhost:8085/api/notes/all")

.then(res=>setAnnouncements(res.data))

.catch(err=>console.log(err));

}

function addAnnouncement(){

if(!title || !message){
alert("Please fill all fields");
return;
}

axios.post("http://localhost:8085/api/notes/add",{
title,
message
})

.then(()=>{

alert("Announcement Posted");

setTitle("");
setMessage("");

loadAnnouncements();

})

.catch(err=>console.log(err));

}

/* ALERTS */

function loadLowAttendance(){

axios.get("http://localhost:8085/api/attendance/low-attendance")

.then(res=>setLowAttendance(res.data))

.catch(err=>console.log(err));

}

function loadLowMarks(){

axios.get("http://localhost:8085/api/marks/low-marks")

.then(res=>setLowMarks(res.data))

.catch(err=>console.log(err));

}

return(

<>

<AdminNavbar/>

<div className="dashboard-container">

{/* HEADER */}

<div className="dashboard-header">
<h1>Admin Dashboard</h1>
</div>

{/* STATS */}

<div className="stats-row">

<div className="stat-box">
<h3>Total Students</h3>
<p>{totalStudents}</p>
</div>

<div className="stat-box">
<h3>Total Subjects</h3>
<p>{subjects}</p>
</div>

<div className="stat-box">
<h3>Average Attendance %</h3>
<p>{avgAttendance}%</p>
</div>

<div className="stat-box">
<h3>Average Marks %</h3>
<p>{avgMarks}%</p>
</div>

</div>

{/* ANNOUNCEMENTS */}

<div className="announcement-alert-row">

<div className="announcement-container">

<h2 className="section-title">📢 Announcements</h2>

<div className="announcement-row">

<div className="announcement-form">

<h3>Post Announcement</h3>

<input
type="text"
placeholder="Announcement Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<textarea
placeholder="Write announcement..."
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>

<button onClick={addAnnouncement}>
Post Announcement
</button>

</div>

<div className="announcement-list">

<h3>Recent Announcements</h3>

<div className="announcement-box">

{announcements.slice(-3).reverse().map(a=>(

<div key={a.id} className="announcement-item">

<h4>{a.title}</h4>
<p>{a.message}</p>

</div>

))}

</div>

</div>

</div>

</div>

{/* ALERTS */}

<div className="alerts-container">

<div className="alert-box">

<h3>⚠ Low Attendance</h3>

{Object.entries(lowAttendance).map(([name,percent])=>(

<p key={name}>
{name} - {Number(percent).toFixed(2)}%
</p>

))}

</div>

<div className="alert-box">

<h3>⚠ Low Marks</h3>

{Object.entries(lowMarks).map(([id,marks])=>(

<p key={id}>
Student {id} - {Number(marks).toFixed(2)}
</p>

))}

</div>

</div>

</div>

{/* GRAPHS */}

<div className="graphs-row">

<div className="graph-box">

<h3>Student Marks Performance</h3>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={marksGraph}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="student"/>

<YAxis domain={[0,100]}/>

<Tooltip/>

<Bar dataKey="marks">

{marksGraph.map((entry,index)=>(

<Cell key={index} fill={colors[index%colors.length]}/>

))}

</Bar>

</BarChart>

</ResponsiveContainer>

</div>

<div className="graph-box">

<h3>Subject Wise Attendance</h3>

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie
data={attendanceGraph}
dataKey="value"
nameKey="name"
outerRadius={100}
label
>

{attendanceGraph.map((entry,index)=>(

<Cell key={index} fill={colors[index%colors.length]}/>

))}

</Pie>

<Tooltip/>
<Legend/>

</PieChart>

</ResponsiveContainer>

</div>

</div>

</div>

</>

);

}

export default AdminDashboard;