import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "../App.css";

// ✅ ADD THIS
const BASE_URL = "http://localhost:8080";

function AdminNotes(){

const [title,setTitle] = useState("");
const [file,setFile] = useState(null);
const [materials,setMaterials] = useState([]);

useEffect(()=>{
loadMaterials();
},[]);


// LOAD MATERIALS
function loadMaterials(){

axios.get(`${BASE_URL}/api/materials/all`)   // ✅ FIXED
.then(res=>{
setMaterials(res.data);
})
.catch(err=>console.log(err));

}


// UPLOAD MATERIAL
function uploadMaterial(){

if(!title || !file){
alert("Enter title and choose file");
return;
}

const formData = new FormData();
formData.append("title",title);
formData.append("file",file);

axios.post(
`${BASE_URL}/api/materials/upload`,   // ✅ FIXED
formData,
{
headers:{
"Content-Type":"multipart/form-data"
}
}
)
.then(()=>{

alert("Material Uploaded");

setTitle("");
setFile(null);

document.getElementById("fileInput").value = "";

loadMaterials();

})
.catch(err=>{
console.log(err);
alert("Upload failed");
});

}


// DELETE MATERIAL
function deleteMaterial(id){

if(!window.confirm("Are you sure you want to delete this material?")){
return;
}

axios.delete(`${BASE_URL}/api/materials/delete/${id}`)   // ✅ FIXED
.then(()=>{
alert("Material Deleted");
loadMaterials();
})
.catch(err=>{
console.log(err);
alert("Delete failed");
});

}


// VIEW MATERIAL
function viewMaterial(fileName){

const encodedFileName = encodeURIComponent(fileName);

window.open(
`${BASE_URL}/api/materials/view/${encodedFileName}`,   // ✅ FIXED
"_blank"
);

}


return(

<>
<AdminNavbar/>

<div className="notes-page">

<h1 className="notes-title">
Upload Study Materials
</h1>

<div className="notes-input-box">

<input
type="text"
placeholder="Study Material Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
id="fileInput"
type="file"
accept=".pdf,.png,.jpg,.jpeg"
onChange={(e)=>setFile(e.target.files[0])}
/>

<button onClick={uploadMaterial}>
Upload Notes
</button>

</div>

<div className="notes-table-box">

<table className="notes-table">

<thead>
<tr>
<th>ID</th>
<th>Title</th>
<th>File</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{materials.map(m=>(

<tr key={m.id}>

<td>{m.id}</td>
<td>{m.title}</td>
<td>{m.fileName}</td>

<td>

<button
onClick={()=>viewMaterial(m.fileName)}
style={{marginRight:"10px"}}
>
View
</button>

<button
onClick={()=>deleteMaterial(m.id)}
style={{background:"red",color:"white"}}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</>

);

}

export default AdminNotes;