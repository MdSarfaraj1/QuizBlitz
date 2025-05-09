import React from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() 
{
  const navigate = useNavigate();

  const startquiz = () => {
    navigate("/topicselect");
  };

  const viewprofile = () => {
    navigate("/profile");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Welcome!</h1>
        <p style={styles.description}>A Computer Science Quiz</p>
        <button style={styles.button}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          onClick={startquiz}
        >Start Quiz</button>
        <button style={styles.button}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          onClick={viewprofile}
        >View Profile</button>
      </div>
    </div>
  );
};
const styles = {
    page: {
      backgroundImage: `url('/hp bg.jpeg')`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      margin: 0,
      padding: 0,
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Consolas",
      color: "#00b3b3",
      textAlign: "center"
    },
    container: {
      transform: "translate(-50%, -50%)",
      position: "absolute",
      top: "50%",
      left: "50%",
    },
    title: {
      fontSize: "60px",
    },
    description: {
      fontSize: "30px",
    },
    button: {
      color: "#ffffff",
      fontFamily: "Consolas",
      backgroundColor: "rgba(255,255,255,0.25)",
      padding: "10px 10px",
      fontSize: "20px",
      margin: "16px",
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out",
    },
  };
