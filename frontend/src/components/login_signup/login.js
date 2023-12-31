import React, { useState } from "react";
import axios from "axios";
// CSS styles
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
};

const formStyle = {
  overflow: "hidden",
  backgroundColor: "white",
  padding: "40px 30px 30px 30px",
  borderRadius: "10px",
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "400px",
  transform: "translate(-50%, -50%)",
  transition: "transform 300ms, box-shadow 300ms",
  boxShadow: "5px 10px 10px rgba(2, 128, 144, 0.2)",
};

const inputStyle = {
  fontFamily: "Asap, sans-serif",
  display: "block",
  borderRadius: "5px",
  fontSize: "16px",
  background: "white",
  width: "100%",
  border: "0",
  padding: "10px 10px",
  margin: "15px -10px",
};

const buttonStyle = {
  fontFamily: "Asap, sans-serif",
  cursor: "pointer",
  color: "#fff",
  fontSize: "16px",
  textTransform: "uppercase",
  width: "80px",
  border: "0",
  padding: "10px 0",
  marginTop: "10px",
  marginLeft: "-5px",
  borderRadius: "5px",
  backgroundColor: "blue",
  transition: "background-color 300ms",
};

function Login() {
  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Event handler for form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send a login request to the server
      await axios.post("https://strm-vdo-be.onrender.com/api/login", {
        username:username,
        password:password,
      });
      if (username) {
        // Save the username in local storage
        localStorage.setItem("loggedInUsername", username);
        // Display a success message and reset input fields
        setUsername("");
        setPassword("");
        window.location.href="https://strm-vdo.vercel.app/movies/popular";
      } else {
        // Handle server response with login failure
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Handle login error and display an error message
      console.error("Error logging in:", error);
      alert("Login failed.");
    }
  };

  return (
    <div style={containerStyle}>
      <form className="login" style={formStyle} onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
