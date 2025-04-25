import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SelectDifficulty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const topic = urlParams.get('topic'); // Get the topic from query params

  const levels = ['Easy','Medium','Hard'];
  const levelselected = (difficulty) => {
    navigate(`/quiz?topic=${topic}&difficulty=${difficulty}`);
  };

  return (
    <div style={styles.container}>
      <h1>Select Difficulty for {topic}</h1>
      <div style={styles.gridContainer}>
      {levels.map((difficulty) => (
          <button key={difficulty} style={styles.button}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              onClick={() => levelselected(`${difficulty}`)}
            >{difficulty}</button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: "url('hp bg.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '100vh',
    //padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Consolas',
    color: '#00b3b3',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
    marginTop: '20px',
    width: '80%',
  },
  button: {
    padding: '15px',
    backgroundColor: 'rgb(0, 179, 179, 0.4)',
    border: 'none',
    color: 'white',
    borderRadius: '10px',
    fontFamily: 'Consolas',
    fontSize: '22px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default SelectDifficulty;
