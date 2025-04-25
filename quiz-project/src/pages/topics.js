import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopicSelection = () => {
  const navigate = useNavigate();

  const topics = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'Go'];

  const containerStyle = {
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
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '30px',
    width: '100%',
    maxWidth: '800px',
    marginTop: '30px',
  };

  const buttonStyle = {
    backgroundColor: 'rgba(0, 179, 179, 0.8)',
    color: 'black',
    border: '2px solid #00b3b3',
    padding: '15px 20px',
    fontSize: '18px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: 'Lucida Console',
    transition: 'all 0.3s ease-in-out',
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = '#008080';
    e.target.style.transform = 'scale(1.1)';
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = 'rgba(0, 179, 179, 0.8)';
    e.target.style.transform = 'scale(1)';
  };

  const handleClick = (topic) => {
    navigate(`/quiz/${topic.toLowerCase()}`);
  };

  return (
    <div style={containerStyle}>
      <h1>Select a Programming Topic</h1>
      <div style={gridStyle}>
        {topics.map((topic) => (
          <button
            key={topic}
            style={buttonStyle}
            onClick={() => handleClick(topic)}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelection;
