import { useState } from "react";
import axios from "axios";

function SubjectPage() {

  const [subject, setSubject] = useState({
    subjectName: "",
    subjectCode: ""
  });

  const [subjects, setSubjects] = useState([]);
  const [searchName, setSearchName] = useState("");

  // ADD SUBJECT
  function addSubject() {
    axios.post("http://localhost:2011/api/subjects/add", subject)
      .then(() => {
        alert("Subject Added");
        setSubject({ subjectName: "", subjectCode: "" });
        getAllSubjects();
      });
  }

  // GET ALL SUBJECTS
  function getAllSubjects() {
    axios.get("http://localhost:2011/api/subjects/all")
      .then(res => setSubjects(res.data));
  }

  // SEARCH SUBJECT
  function searchSubject() {
    axios.get(`http://localhost:2011/api/subjects/search/${searchName}`)
      .then(res => setSubjects(res.data));
  }

  // DELETE SUBJECT
  function deleteSubject(id) {
    axios.delete(`http://localhost:2011/api/subjects/delete/${id}`)
      .then(() => {
        alert("Deleted");
        getAllSubjects();
      });
  }

  return (
    <div className="dashboard-container">

      <h2>Subject Management</h2>

      {/* ADD SUBJECT */}
      <input
        type="text"
        placeholder="Subject Name"
        value={subject.subjectName}
        onChange={(e) => setSubject({ ...subject, subjectName: e.target.value })}
      />

      <input
        type="text"
        placeholder="Subject Code"
        value={subject.subjectCode}
        onChange={(e) => setSubject({ ...subject, subjectCode: e.target.value })}
      />

      <button onClick={addSubject}>Add Subject</button>
      <button onClick={getAllSubjects}>All Subjects</button>

      <hr />

      {/* SEARCH SUBJECT */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Subject Name"
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={searchSubject}>Search</button>
      </div>

      {/* SUBJECT TABLE */}
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
                <button onClick={() => deleteSubject(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default SubjectPage;