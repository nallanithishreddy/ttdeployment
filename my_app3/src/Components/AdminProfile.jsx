import { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import "../App.css";

function AdminProfile(){

const [image,setImage] = useState("");

useEffect(()=>{

const savedImage = localStorage.getItem("adminImage");

if(savedImage){
setImage(savedImage);
}

},[]);


function handleImageChange(e){

const file = e.target.files[0];

if(file){

const reader = new FileReader();

reader.onload = function(event){

setImage(event.target.result);
localStorage.setItem("adminImage",event.target.result);

};

reader.readAsDataURL(file);

}

}

return(

<>
<AdminNavbar/>

<div className="profile-page">

<h1 className="profile-title">Admin Profile</h1>

<div className="profile-card">

<img
src={image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
alt="profile"
className="profile-img"
/>

<label className="upload-btn">
Add Profile Pic
<input
type="file"
accept="image/*"
onChange={handleImageChange}
/>
</label>

<p><strong>Name:</strong> Admin</p>
<p><strong>Email:</strong> admin@gmail.com</p>
<p><strong>Role:</strong> Administrator</p>

</div>

</div>

</>

);

}

export default AdminProfile;