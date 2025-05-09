import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() 
{
  const [un, setUn] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", 
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ un, pass }),
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
          <h1 style={styles.title}>Login</h1>
          <label htmlFor="un" style={styles.label}>Username:</label>
          <input type="text" id="un" value={un}
            onChange={(e) => setUn(e.target.value)} required
            style={styles.input}
          />
          <label htmlFor="pass" style={styles.label}>Password:</label>
          <input type="password" id="pass" value={pass}
            onChange={(e) => setPass(e.target.value)} required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Submit</button>
          <p></p><u><h3 style={{color:'white', cursor:'pointer'}}
          onClick={goToSignup}>New member? Sign up here</h3></u>
        </form>
      </div>
    </div>
  );
}
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: "50px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "40px",
    textShadow: "2px 2px 5px black",
  },
  label: {
    color: "white",
    fontFamily: "Consolas",
    fontSize: "24px",
    textShadow: "2px 2px 5px black",
    display: "block",
    margin: "10px 0 5px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "white",
    color: "black",
    fontFamily: "Consolas",
    fontSize: "16px",
    padding: "10px 20px",
    borderRadius: '8px',
  },
};
