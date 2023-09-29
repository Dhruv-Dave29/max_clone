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

function Signup() {
  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  
  // Event handler for form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Send a signup request to the server
      await axios.post("http://localhost:5001/api/signup",{username : username, password : password});
  
      if (username) {
        // Save the username in local storage
        localStorage.setItem("loggedInUsername", username);
        // Display a success message and reset input fields
        alert("sign up  successful.");
        setUsername("");
        setPassword("");
        window.location.reload();
        window.location.href="http://localhost:3000/movies/popular";
      } else {
        // Handle server response with login failure
        alert("sign up failed. Please check your credentials.");
      }
    } catch (error) {
      console.log(error.response.data);
      console.error("Error signing up:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div style={containerStyle}>
      <form className="signup" style={formStyle} onSubmit={handleSignup} method="post">
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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
