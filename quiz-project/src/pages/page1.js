import React from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div style={styles.body}>
      <h1 style={styles.title}>Hello, how would you like to get started?</h1>
      <button style={styles.btn} 
      onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      onClick={goToLogin}>Login</button>
      <button style={styles.btn} 
      onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      onClick={goToSignup}>Sign Up</button>
    </div>
  );
}

// Inline styles
const styles = {
  body: {
    backgroundImage: `url('/hp bg.jpeg')`, //make sure the image is in public folder
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
  title: {
    fontSize: "40px",
    textShadow: "2px 2px 5px gray",
    marginBottom: "20px",
  },
  btn: {
    backgroundColor: "rgba(255,255,255,0.25)",
    color: "#00b3b3",
    border: "2px solid gray",
    padding: "20px 40px",
    fontFamily: "Consolas",
    fontSize: "26px",
    textShadow: "2px 2px 5px black",
    cursor: "pointer",
    borderRadius: "10px",
    margin: "10px 0",
    transition: "all 0.3s ease-in-out",
  },
};
