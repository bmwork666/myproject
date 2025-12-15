import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/login", {
        username,
        password,
      });

      // Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", username);

      navigate("/upload"); // redirect on success
    } catch (err) {
      alert(err.response?.data?.message || "Invalid login");
    }
  };

  return (
    <div>
      {/* Current user display */}
      <nav className="nav  p-1 d-flex align-items-center justify-content-between">
        {/* Logo Left */}
        <img
          src="/logo.png"
          alt="logo"
          style={{
            width: "160px",
            height: "40px",
          }}
        />

        {/* Username Right
        <div className="fw-bold me-3 bg-text-blue">
          Current User: {localStorage.getItem("currentUser") || "None"}
        </div> */}
      </nav>

      <div
        className=" d-flex justify-content-center align-items-center vh-100 "
        style={{
          //backgroundImage: `url(${bg})`,
          backgroundImage: "url('/bg_color2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="card p-4 shadow" style={{ width: "350px" }}>
          <h3 className="text-center mb-4">Login</h3>

          <form onSubmit={handleLogin}>
            {/* Username */}
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
      <footer className="footer p-1 text-center bg-light text-dark">
        © 2025 alf — All rights reserved
      </footer>
    </div>
  );
}

export default Login;
