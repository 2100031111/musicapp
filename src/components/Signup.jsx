import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", { name, email, password })
      .then((result) => {
        console.log("Registration Response:", result);
        navigate("/login");
      })
      .catch((err) => console.log("Registration Error:", err));
  };

  return (
    <div
      className="d-flex flex-column align-items-center bg-secondary vh-100"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20221224/pngtree-blue-musical-notes-background-image_1530362.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark w-100">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold text-light" to="/">
            PodStream
          </Link>
          <div className="d-flex gap-2">
          <Link className="btn btn-outline-light" to="/login">
            Login
          </Link>
           <Link className="btn btn-outline-light" to="/music">
           Music
          </Link>
        </div>
        </div>
      </nav>

      {/* Signup Form */}
      <div className="bg-white p-4 rounded shadow mt-5" style={{ width: "400px" }}>
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
        </form>
        <p className="text-center mt-2">
          Already Have an Account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
