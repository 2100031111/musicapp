import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); 
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  
    try {
      const result = await axios.post("http://localhost:3000/login", { email, password });
  
      console.log("Login Response:", result.data);
  
      if (result.data.message === "Admin login successful") {
        console.log("Admin login successful! Redirecting...");
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
  
        showPopupMessage("Admin Login Successful!", "success");
        setTimeout(() => {
          navigate(result.data.redirect);
        }, 1000);
      } else if (result.data.message === "Login successful") {
        console.log("User login successful! Redirecting...");
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
  
        showPopupMessage("Login Successful!", "success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        handleLoginError(result.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      showPopupMessage("Something went wrong! Try again.", "error");
    }
  };

  const handleLoginError = (message) => {
    if (message === "The password is incorrect") {
      showPopupMessage("Incorrect password. Try again!", "error");
    } else if (message === "No record exists") {
      showPopupMessage("User not found. Please check your email!", "error");
    } else {
      showPopupMessage("Login failed. Try again!", "error");
    }
  };

  const showPopupMessage = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000); 
  };

  return (
    <div className="d-flex flex-column align-items-center bg-secondary vh-100" 
      style={{
        backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20221224/pngtree-blue-musical-notes-background-image_1530362.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}>
      
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark w-100">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold text-light" to="/">
            PodStream
          </Link>
          {/* Buttons aligned side by side */}
          <div className="d-flex gap-2">
            <Link className="btn btn-outline-light" to="/register">
              Register
            </Link>
            <Link className="btn btn-outline-light" to="/music">
              Music
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="bg-white p-4 rounded shadow mt-5" style={{ width: "400px" }}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
        <p className="text-center mt-2">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div
          className={`position-fixed top-50 start-50 translate-middle p-3 rounded shadow text-white ${
            popupType === "success" ? "bg-success" : "bg-danger"
          }`}
          style={{ zIndex: 1050, minWidth: "250px", textAlign: "center" }}
        >
          <strong>{popupMessage}</strong>
        </div>
      )}

       {/* Trending Music Section */}
<div className="container" style={{ marginTop: "250px" }}>
  <h3 className="text-center text-white">🎵 Trending Music</h3>
  <div className="row d-flex justify-content-center">
    {[
      { title: "Blinding Lights", artist: "The Weeknd", img: "https://c.saavncdn.com/297/Short-n-Sweet-Deluxe-English-2025-20250214063507-500x500.jpg" },
      { title: "Shape of You", artist: "Ed Sheeran", img: "https://c.saavncdn.com/630/Slow-Motion-English-2025-20250117063420-500x500.jpg" },
      { title: "Levitating", artist: "Dua Lipa", img: "https://c.saavncdn.com/237/Mufasa-The-Lion-King-Original-Motion-Picture-Soundtrack-Deluxe-Edition-English-2024-20241212055934-500x500.jpg" },
      { title: "Shape of You", artist: "Ed Sheeran", img: "https://c.saavncdn.com/483/Malwa-Flow-Punjabi-2025-20250216053534-500x500.jpg" },
      { title: "Shape of You", artist: "Ed Sheeran", img: "https://c.saavncdn.com/696/Hasda-Rahanga-From-Badnaam-Punjabi-2025-20250213101648-500x500.jpg" },
      { title: "Shape of You", artist: "Ed Sheeran", img: "https://c.saavncdn.com/925/Water-Punjabi-2025-20250214212740-500x500.jpg" },



    ].map((music, index) => (
      <div key={index} className="col-md-3 m-2">
        <div className="card shadow-lg">
          <img src={music.img} alt={music.title} className="card-img-top" />
          <div className="card-body text-center">
            <h5 className="card-title">{music.title}</h5>
            <p className="card-text text-muted">{music.artist}</p>
           
            <button className="btn btn-primary btn-sm">🎧 Listen</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  

    </div>
    
  );
}

export default Login;
