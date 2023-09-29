import React from 'react';
import { Link } from 'react-router-dom';

const Option = () => {
  // Define CSS styles using a JavaScript object
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    marginTop:'-50px'
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    margin: '10px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1>Choose an Option</h1>
      <div>
        <Link to="/login" style={buttonStyle}>Login</Link>
      </div>
      <div>
        <Link to="/signup" style={buttonStyle}>Signup</Link>
      </div>
    </div>
  );
};

export default Option;
