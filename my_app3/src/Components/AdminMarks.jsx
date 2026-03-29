import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "../App.css";

// ✅ ADD THIS
const BASE_URL = "https://ttdeployment-l4ag.onrender.com";

function AdminMarks(){

const [subjects,setSubjects] = useState([]);
const [students,setStudents] = useState([]);
const [selectedSubject,setSelectedSubject] = useState("");
const [examType,setExamType] = useState("Mid");
const [marks,setMarks] = useState({});

useEffect(()=>{
loadSubjects();
loadStudents();
},[]);


// LOAD SUBJECTS
function loadSubjects(){

axios.get(`${BASE_URL}/api/subjects/all`)   // ✅ FIXED
.then(res=>setSubjects(res.data))
.catch(err=>console.log(err));

}


// LOAD ALL STUDENTS
function loadStudents(){

axios.get(`${BASE_URL}/api/students/all`)   // ✅ FIXED
.then(res=>{

setStudents(res.data);

const marksData={};

res.data.forEach(student=>{
marksData[student.id]="";
});

setMarks(marksData);

})
.catch(err=>console.log(err));

}


// SUBJECT CHANGE
function handleSubjectChange(e){
setSelectedSubject(e.target.value);
}


// MARKS CHANGE
function handleMarksChange(studentId,value){

setMarks({
...marks,
[studentId]:value
});

}


// SAVE MARKS
function saveMarks(){

if(!selectedSubject){
alert("Please select subject");
return;
}

const marksList = students.map(student=>({

studentId:student.id,
subjectId:selectedSubject,
marks:Number(marks[student.id] || 0),
examType:examType

}));

axios.post(
`${BASE_URL}/api/marks/addAll`,   // ✅ FIXED
marksList
)

.then(()=>{
alert("Marks Saved Successfully");
})

.catch(err=>{
console.log(err);
alert("Error saving marks");
});

}


return(

<>

<AdminNavbar/>

<div className="subjects-page">

<h1 className="subject-title">
Marks Management
</h1>

<div className="subject-form-row">

<select
value={selectedSubject}
onChange={handleSubjectChange}
>

<option value="">Select Subject</option>

{subjects.map(sub=>(

<option key={sub.id} value={sub.id}>
{sub.subjectName}
</option>

))}

</select>

<select
value={examType}
onChange={(e)=>setExamType(e.target.value)}
>

<option value="Mid">Mid Exam</option>
<option value="Internal">Internal</option>
<option value="Final">Final Exam</option>

</select>

</div>

<div className="subject-table-box">

<table className="subjects-table">

<thead>
<tr>
<th>Student</th>
<th>Marks</th>
</tr>
</thead>

<tbody>

{students.map(student=>(

<tr key={student.id}>

<td>{student.studentName}</td>

<td>
<input
type="number"
placeholder="Enter Marks"
value={marks[student.id] || ""}
onChange={(e)=>handleMarksChange(student.id,e.target.value)}
/>
</td>

</tr>

))}

</tbody>

</table>

</div>

<button
className="save-btn"
onClick={saveMarks}
style={{marginTop:"20px"}}
>
Save Marks
</button>

</div>

</>

);

}

export default AdminMarks;