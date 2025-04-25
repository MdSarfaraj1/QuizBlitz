import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const topic = new URLSearchParams(location.search).get("topic");
  const difficulty=new URLSearchParams(location.search).get("difficulty");

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`http://localhost:5000/quiz?topic=${topic}`);
        const data = await res.json();
        setQuestions(data.questions);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      }
    };
    fetchQuestions();
  }, [topic], [difficulty]);

  // Handle option click
  const handleAnswer = async (selected) => {
    const correct = questions[current].answer;
    if (selected === correct) {
      setScore((prev) => prev + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      // Send score to backend
      try {
        const token = localStorage.getItem("token");
        await fetch('http://localhost:5000/submit-score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ topic, score: selected === correct ? score + 1 : score }),
        });
      } catch (err) {
        console.error("Failed to submit score:", err);
      }

      alert(`Quiz complete! Your score is ${selected === correct ? score + 1 : score}`);
      navigate('/homepage');
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading questions...</p>;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{questions[current].question}</h2>
      {questions[current].options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => handleAnswer(option)}
          style={{
            display: 'block',
            margin: '10px auto',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '8px',
            backgroundColor: '#00b3b3',
            color: 'white',
            border: 'none',
            transition: '0.3s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#008080'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#00b3b3'}
        >
          {option}
        </button>
      ))}
      <p>Question {current + 1} of {questions.length}</p>
      <p>Current Score: {score}</p>
    </div>
  );
};

export default Quiz;
