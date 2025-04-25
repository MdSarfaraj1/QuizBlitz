import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // State for form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate("/login");
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send signup request to the backend
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.success) {
        localStorage.setItem("token", data.token);
        navigate("/homepage");
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={styles.page}>
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1 style={styles.title}>Signup</h1>
        <p></p>
        <label htmlFor="un" style={styles.label}>Username:</label>
        <input type="text" id="un" name="un" value={username}
          onChange={(e) => setUsername(e.target.value)} required
          style={styles.input}/>
        <p></p>
        <label htmlFor="mail" style={styles.label}>Email Id:</label>
        <input type="text" id="mail" name="mail" value={email}
          onChange={(e) => setEmail(e.target.value)} required
          style={styles.input}/>
        <p></p>
        <label htmlFor="pass" style={styles.label}>Password:</label>
        <input type="password" id="pass" name="pass" value={password}
          onChange={(e) => setPassword(e.target.value)} required
          style={styles.input}/>
        <p></p>
        <button type="submit" style={styles.button}>Submit</button>
        <p></p><u><h3 style={{color:'white', cursor:'pointer'}}
          onClick={goToLogin}>Already have an account? Login</h3></u>
      </form>
    </div>
    </div>
  );
};

// Styles as JavaScript objects
const styles = {
  page: {
      backgroundImage: `url('/hp bg.jpeg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      color: "#00b3b3",
      fontFamily: "Lucida Console",
      textAlign: "center",
      margin: 0,
      padding: 0,
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
container: {
  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Translucent effect
  padding: '50px',
  borderRadius: '12px',
  width: '90%',
  maxWidth: '400px',
  textAlign: 'center',
  margin: '0 auto',
},
title: {
  fontSize: '40px',
  textShadow: '2px 2px 5px black',
},
label: {
  color: 'white',
  fontFamily: '"Consolas"',
  fontSize: '24px',
  textShadow: '2px 2px 5px black',
  cursor: 'pointer',
  width: 'auto',
},
input: {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '8px',
  border: '1px solid #00b3b3',
},
button: {
  backgroundColor: 'white',
  color: 'black',
  fontFamily: '"Consolas"',
  fontSize: '16px',
  padding: '10px 20px',
  borderRadius: '8px',
},
};
export default Signup;//exporting the function
