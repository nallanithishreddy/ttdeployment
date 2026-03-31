import { useState } from "react";
import axios from "axios";
import "../App.css";

// ✅ BASE URL
const BASE_URL = "http://localhost:8080";

function SubjectPage() {

  const [subject, setSubject] = useState({
    subjectName: "",
    subjectCode: ""
  });

  const [subjects, setSubjects] = useState([]);
  const [searchName, setSearchName] = useState("");

  function addSubject() {
    axios.post(`${BASE_URL}/api/subjects/add`, subject)   // ✅ FIXED
      .then(() => {
        alert("Subject Added");
        setSubject({ subjectName: "", subjectCode: "" });
        getAllSubjects();
      });
  }

  function getAllSubjects() {
    axios.get(`${BASE_URL}/api/subjects/all`)   // ✅ FIXED
      .then(res => setSubjects(res.data));
  }

  function searchSubject() {
    axios.get(`${BASE_URL}/api/subjects/search/${searchName}`)   // ✅ FIXED
      .then(res => setSubjects(res.data));
  }

  function deleteSubject(id) {
    axios.delete(`${BASE_URL}/api/subjects/delete/${id}`)   // ✅ FIXED
      .then(() => {
        alert("Deleted");
        getAllSubjects();
      });
  }

  return (
    <div className="dashboard-container">

      <h2>Subject Management</h2>

      <input
        type="text"
        placeholder="Subject Name"
        value={subject.subjectName}
        onChange={(e) =>
          setSubject({ ...subject, subjectName: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Subject Code"
        value={subject.subjectCode}
        onChange={(e) =>
          setSubject({ ...subject, subjectCode: e.target.value })
        }
      />

      <button onClick={addSubject}>Add Subject</button>
      <button onClick={getAllSubjects}>All Subjects</button>

      <hr />

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Subject Name"
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={searchSubject}>Search</button>
      </div>

      <table className="users-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Subject Name</th>
            <th>Subject Code</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {subjects.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.subjectName}</td>
              <td>{s.subjectCode}</td>
              <td>
                <button onClick={() => deleteSubject(s.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default SubjectPage;