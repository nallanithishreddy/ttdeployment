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
ResponsiveContainer,
Cell
} from "recharts";

import "../App.css";

// ✅ ADD THIS
const BASE_URL = "http://localhost:8080";

function AdminStudents(){

const [students,setStudents]=useState([]);
const [subjects,setSubjects]=useState([]);
const [search,setSearch]=useState("");

const [studentData,setStudentData]=useState(null);

const [marksGraph,setMarksGraph]=useState([]);
const [attendanceGraph,setAttendanceGraph]=useState([]);

const [cgpa,setCgpa]=useState("-");
const [avgAttendance,setAvgAttendance]=useState("-");

const [selectedId,setSelectedId]=useState(null);

const colors=[
"#6366f1",
"#22c55e",
"#f59e0b",
"#ef4444",
"#06b6d4",
"#8b5cf6",
"#10b981"
];

useEffect(()=>{
loadStudents();
loadSubjects();
},[]);

/* LOAD STUDENTS */
function loadStudents(){
axios.get(`${BASE_URL}/api/students/all`)   // ✅ FIXED
.then(res=>setStudents(res.data))
.catch(err=>console.log(err));
}

/* LOAD SUBJECTS */
function loadSubjects(){
axios.get(`${BASE_URL}/api/subjects/all`)   // ✅ FIXED
.then(res=>setSubjects(res.data))
.catch(err=>console.log(err));
}

/* SEARCH STUDENT */
function searchStudent(){
axios.get(`${BASE_URL}/api/students/search?name=${search}`)   // ✅ FIXED
.then(res=>{
if(res.data.length===0){
alert("Student not found");
return;
}
selectStudent(res.data[0]);
})
.catch(err=>console.log(err));
}

/* SELECT STUDENT */
function selectStudent(student){
setSelectedId(student.id);
setStudentData(student);
loadStudentMarks(student.id);
loadStudentAttendance(student.studentName);
}

/* LOAD MARKS */
function loadStudentMarks(id){
axios.get(`${BASE_URL}/api/marks/student/${id}`)   // ✅ FIXED
.then(res=>{

const records=res.data;

if(records.length===0){
setMarksGraph([]);
setCgpa("-");
return;
}

const subjectMap={};
subjects.forEach(s=>{
subjectMap[s.id]=s.subjectName;
});

const subjectMarks={};

records.forEach(m=>{
const subject=subjectMap[m.subjectId] || ("Subject "+m.subjectId);

if(!subjectMarks[subject]){
subjectMarks[subject]={total:0,count:0};
}

subjectMarks[subject].total+=m.marks;
subjectMarks[subject].count++;
});

const graphData=Object.keys(subjectMarks).map(sub=>{
const data=subjectMarks[sub];
const avg=(data.total/data.count).toFixed(2);

return{
subject:sub,
marks:Number(avg)
};
});

setMarksGraph(graphData);

/* CGPA */
let total=0;
records.forEach(m=>{
total+=m.marks;
});

const avg=total/records.length;
const cgpaValue=(avg/10).toFixed(2);

setCgpa(cgpaValue);

})
.catch(err=>console.log(err));
}

/* LOAD ATTENDANCE */
function loadStudentAttendance(studentName){
axios.get(`${BASE_URL}/api/attendance/student/${studentName}`)   // ✅ FIXED
.then(res=>{

const records=res.data;

if(records.length===0){
setAttendanceGraph([]);
setAvgAttendance("-");
return;
}

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
const percent=((data.present/data.total)*100).toFixed(2);

return{
subject:sub,
attendance:Number(percent)
};
});

setAttendanceGraph(graphData);

/* AVG ATTENDANCE */
let totalPercent=0;
graphData.forEach(g=>{
totalPercent+=g.attendance;
});

const avg=(totalPercent/graphData.length).toFixed(2);
setAvgAttendance(avg);

})
.catch(err=>console.log(err));
}

return(

<>
<AdminNavbar/>

<div className="students-page">

{/* LEFT LIST */}
<div className="students-list-box">

<h3>All Students</h3>

<div className="student-scroll">

{students.map(s=>(

<div
key={s.id}
className={`student-item ${selectedId===s.id ? "active-student" : ""}`}
onClick={()=>selectStudent(s)}
>
{s.studentName}
</div>

))}

</div>

</div>

{/* RIGHT SIDE */}
<div className="student-details">

{/* SEARCH */}
<div className="search-box">

<input
type="text"
placeholder="Enter student name"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<button onClick={searchStudent}>
Search
</button>

</div>

{/* INFO */}
<div className="student-info-cards">

<div className="info-card">
<h4>Roll Number</h4>
<p>{studentData ? studentData.id : "-"}</p>
</div>

<div className="info-card">
<h4>Email</h4>
<p>{studentData ? studentData.email : "-"}</p>
</div>

<div className="info-card">
<h4>CGPA</h4>
<p>{cgpa}</p>
</div>

<div className="info-card">
<h4>Avg Attendance</h4>
<p>{avgAttendance==="-" ? "-" : avgAttendance+"%"}</p>
</div>

</div>

{/* GRAPHS */}
<div className="student-graphs">

<div className="graph-box">

<h3>Subject Wise Marks</h3>

<ResponsiveContainer width="100%" height={250}>
<BarChart data={marksGraph}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="subject"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="marks">
{marksGraph.map((entry,index)=>(
<Cell key={index} fill={colors[index % colors.length]}/>
))}
</Bar>
</BarChart>
</ResponsiveContainer>

</div>

<div className="graph-box">

<h3>Subject Wise Attendance</h3>

<ResponsiveContainer width="100%" height={250}>
<BarChart data={attendanceGraph}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="subject"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="attendance">
{attendanceGraph.map((entry,index)=>(
<Cell key={index} fill={colors[index % colors.length]}/>
))}
</Bar>
</BarChart>
</ResponsiveContainer>

</div>

</div>

</div>

</div>

</>

);

}

export default AdminStudents;