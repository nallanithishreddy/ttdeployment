import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import { useEffect } from "react";

function Dashboard() {

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.href = "/login";
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  if (user.role === "ADMIN") {
    return <AdminDashboard />;
  }

  if (user.role === "STUDENT") {
    return <StudentDashboard />;
  }

  return <h2>Unauthorized</h2>;
}

export default Dashboard;
