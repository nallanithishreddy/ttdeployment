import { useState, useEffect } from "react";
import StudentNavbar from "./StudentNavbar";
import "../App.css";

function StudentProfile() {

  const [image, setImage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      window.location.href = "/login";
      return;
    }

    setUser(storedUser);

    // ✅ USER-SPECIFIC IMAGE KEY
    const key = `studentImage_${storedUser.username}`;

    const savedImage = localStorage.getItem(key);

    if (savedImage) {
      setImage(savedImage);
    }

  }, []);

  // ================= IMAGE CHANGE =================

  function handleImageChange(e) {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onload = function (event) {

        setImage(event.target.result);

        // ✅ SAVE USER-SPECIFIC IMAGE
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const key = `studentImage_${storedUser.username}`;

        localStorage.setItem(key, event.target.result);
      };

      reader.readAsDataURL(file);
    }
  }

  if (!user) return <h2>Loading...</h2>;

  return (
    <>
      <StudentNavbar />

      <div className="profile-page">

        <h1 className="profile-title">Student Profile</h1>

        <div className="profile-card">

          <img
            src={
              image ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
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

          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>

        </div>

      </div>
    </>
  );
}

export default StudentProfile;