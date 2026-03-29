import { useEffect, useState } from "react";
import axios from "axios";

function Course() {
  const [course, setCourse] = useState({ courseName: "", courseCode: "" });
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  function handleChange(e) {
    setCourse({ ...course, [e.target.name]: e.target.value });
  }

  async function addCourse() {
    await axios.post("http://localhost:8080/course", course);
    loadCourses();
  }

  async function loadCourses() {
    const res = await axios.get("http://localhost:8080/courses");
    setCourses(res.data);
  }

  async function searchCourse() {
    if (search === "") {
      loadCourses();
    } else {
      const res = await axios.get(
        `http://localhost:8080/course/search/${search}`
      );
      setCourses(res.data);
    }
  }

  async function deleteCourse(id) {
    await axios.delete(`http://localhost:8080/course/${id}`);
    loadCourses();
  }

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div>
      <h2>Add Course</h2>
      <input name="courseName" placeholder="Course Name" onChange={handleChange} />
      <input name="courseCode" placeholder="Course Code" onChange={handleChange} />
      <button onClick={addCourse}>Add</button>

      <h2>Search Course</h2>
      <input placeholder="Search by name" onChange={(e) => setSearch(e.target.value)} />
      <button onClick={searchCourse}>Search</button>

      <h2>Course List</h2>
      {courses.map((c) => (
        <div key={c.id}>
          {c.courseName} ({c.courseCode})
          <button onClick={() => deleteCourse(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Course;
