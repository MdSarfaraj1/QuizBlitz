import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChooseTopic = () => {
  const navigate = useNavigate();

  const topicselected = (topic) => {
    // Redirect to difficulty selection page
    navigate(`/level?topic=${topic}`);
  };

  const topics = ['PYTHON','JAVA','C','C++','JAVASCRIPT','R'];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Select a Quiz Topic</h1>
      <div style={styles.gridContainer}>
        {topics.map((topic) => (
          <button key={topic} style={styles.topicBtn}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              onClick={() => topicselected(`${topic}`)}
            >{topic}</button>
        ))}
      </div>
    </div>
  );
};

// Styles as JavaScript objects
const styles = {
  title: {
    fontSize: '40px',
    textShadow: '2px 2px 5px black',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '40px',
    width: '100%',
    maxWidth: '800px',
    marginTop: '20px',
  },
  topicBtn: {
    backgroundColor: 'rgba(0,179,179,0.8)',
    color: 'black',
    border: '2px solid #00b3b3',
    padding: '15px 20px',
    fontSize: '20px',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.3s ease-in-out',
    fontFamily: '"Lucida Console"',
  },
  container: {
    backgroundImage: "url('hp bg.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Consolas',
    color: '#00b3b3',
  },
};

export default ChooseTopic;
