import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./Records.css"; 

const Records = () => {
  const [employees, setEmployees] = useState([]);
  const [userCount, setUserCount] = useState(null); 
  const [showUsers, setShowUsers] = useState(false); // Controls user display
  const navigate = useNavigate(); // Hook for navigation

  const fetchEmployees = () => {
    axios
      .get("http://localhost:3000/api/employees")
      .then((response) => {
        setEmployees(response.data);
        setUserCount(response.data.length); // Set user count
        setShowUsers(true); // Show users
      })
      .catch((error) => console.error("Error fetching employees:", error));
  };

  const fetchUserCount = () => {
    axios
      .get("http://localhost:3000/api/employees/count")
      .then((response) => {
        setUserCount(response.data.count);
        setShowUsers(false); 
      })
      .catch((error) => console.error("Error fetching user count:", error));
  };

  const handleLogout = () => {
    navigate("/login"); // Redirect to login page
  };

  const goToRecentMusic = () => {
    navigate("/music"); // Redirect to music page
  };

  return (
    <div className="records-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <button onClick={fetchEmployees}>Show Users</button>
        <button onClick={fetchUserCount}>User Count</button>
        <button onClick={goToRecentMusic}>Recent Music</button>
        <button onClick={handleLogout} className="logout-btn">Log Out</button>
      </nav>

      {/* Display user count if available */}
      {userCount !== null && <h3>Total Users: {userCount}</h3>}

      {/* Display employees only when "Show Users" is clicked */}
      {showUsers && employees.length > 0 && (
        <>
          <h2>Employee Records</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Records;
