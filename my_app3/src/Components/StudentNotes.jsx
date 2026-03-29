import { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";
import "../App.css";

function StudentNotes() {

  const [materials, setMaterials] = useState([]);

  useEffect(() => {

    const user = localStorage.getItem("user");

    if (!user) {
      window.location.href = "/login";
      return;
    }

    loadMaterials();

  }, []);

  // ================= LOAD =================

  const loadMaterials = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8085/api/materials/all"
      );
      setMaterials(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= VIEW =================

  const viewMaterial = (fileName) => {

    const encodedFileName = encodeURIComponent(fileName);

    window.open(
      `http://localhost:8085/api/materials/view/${encodedFileName}`,
      "_blank"
    );
  };

  return (
    <>
      <StudentNavbar />

      <div className="notes-page">

        <h1 className="notes-title">
          Study Materials
        </h1>

        {/* ===== TABLE ===== */}

        <div className="notes-table-box">

          <table className="notes-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>File</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>

              {materials.length > 0 ? (
                materials.map(m => (
                  <tr key={m.id}>

                    <td>{m.id}</td>
                    <td>{m.title}</td>
                    <td>{m.fileName}</td>

                    <td>
                      <button
                        onClick={() => viewMaterial(m.fileName)}
                      >
                        View
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No Study Materials Available
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default StudentNotes;