import { useState } from "react";
import axios from "axios";
import "../Auth.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ BASE URL (UPDATED)
const BASE_URL = "https://ttdeployment-l4ag.onrender.com";

function AuthPage() {

  const [toggle, setToggle] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    role: "STUDENT"
  });

  // LOGIN INPUT
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // REGISTER INPUT
  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  // ================= LOGIN =================

  const handleLogin = async (e) => {

    if (e) e.preventDefault(); // ✅ FIX ADDED

    try {

      const response = await axios.post(
        `${BASE_URL}/api/login`,
        loginData
      );

      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      toast.success("Login successful");

      setTimeout(() => {
        if (user.role === "ADMIN") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/student/dashboard";
        }
      }, 1500);

    } catch (error) {

      console.log(error);
      toast.error("Invalid email or password");

    }

  };

  // ================= REGISTER =================

  const handleRegister = async (e) => {

    if (e) e.preventDefault(); // ✅ FIX ADDED

    try {

      const response = await axios.post(
        `${BASE_URL}/api/register`,
        registerData
      );

      console.log("Register success:", response.data);

      toast.success("Registration successful. Please login.");

      setRegisterData({
        username: "",
        email: "",
        password: "",
        role: "STUDENT"
      });

      setLoginData({
        email: "",
        password: ""
      });

      setToggle(false);

    } catch (error) {

      console.log("Register error:", error.response || error);

      if (error.response?.status === 409) {
        toast.warning("Email already exists");
      } else {
        toast.error("Registration failed");
      }

    }

  };

  return (

    <div className="auth-wrapper">

      <div className={toggle ? "container active" : "container"}>

        <div className="form-box login">

          <h1>Login</h1>

          <div className="input-box">
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
            <label>Email</label>
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <label>Password</label>
          </div>

          <button className="btn" onClick={handleLogin}>
            Login
          </button>

          <p className="switch-text">
            Don't have an account?
            <span onClick={() => {
              setLoginData({ email: "", password: "" });
              setToggle(true);
            }}>
              {" "}Sign Up
            </span>
          </p>

        </div>

        <div className="form-box register">

          <h1>Register</h1>

          <div className="input-box">
            <input
              type="text"
              name="username"
              value={registerData.username}
              onChange={handleRegisterChange}
              required
            />
            <label>Username</label>
          </div>

          <div className="input-box">
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />
            <label>Email</label>
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />
            <label>Password</label>
          </div>

          <div className="input-box">

            <select
              name="role"
              value={registerData.role}
              onChange={handleRegisterChange}
            >
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin</option>
            </select>

          </div>

          <button className="btn" onClick={handleRegister}>
            Register
          </button>

          <p className="switch-text">
            Already have an account?
            <span onClick={() => {
              setRegisterData({
                username: "",
                email: "",
                password: "",
                role: "STUDENT"
              });
              setToggle(false);
            }}>
              {" "}Sign In
            </span>
          </p>

        </div>

        <div className="slider">

          <div className="slider-content">

            {!toggle && (
              <>
                <h1>WELCOME BACK!</h1>
                <p>Login to continue</p>
              </>
            )}

            {toggle && (
              <>
                <h1>WELCOME!</h1>
                <p>Create your account</p>
              </>
            )}

          </div>

        </div>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />

    </div>

  );

}

export default AuthPage;