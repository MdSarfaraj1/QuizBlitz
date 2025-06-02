import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {useAuth} from '../../Context/UserContextProvider'
import axios from 'axios';

const ResultsPage = () => {
  const {userId}=useAuth()
const navigate = useNavigate();
const location = useLocation();
const [correctCount, setCorrectCount] = useState(0);
const [wrongCount, setWrongCount] = useState(0);
const [unanswered, setUnanswered] = useState(0);
const [userScore, setScoreObtained] = useState(0);
const [totalScore, setTotalScore] = useState(0);

   const { selectedAnswers, learnLater, quizData,hintsUsed,timeTaken,category} = location.state 
  const [expandedSection, setExpandedSection] = useState(null);
  const [incorrectAnswers,setIncorrectAnswer]=useState([])
  const totalQuestions = quizData.questions.length;
 
 useEffect(() => {
  const calculateScore = async () => {
    let correct = 0;
    let wrong = 0;
    let unansweredCount = 0;
    let total = 0;
    const incorrect = [];

    for (let i = 0; i < totalQuestions; i++) {
      const userAnswer = selectedAnswers[i];
      if (userAnswer === undefined) {
        unansweredCount++;
      } else if (userAnswer === quizData.questions[i].correctAnswer) {
        correct++;
      } else {
        wrong++;
        incorrect.push({
          index: i,
          question: quizData.questions[i].questionText,
          userAnswer: userAnswer,
          correctAnswer: quizData.questions[i].correctAnswer,
        });
      }
    }

    let score = 0;
    const hints = hintsUsed || 0;

    if (quizData.difficulty === 'easy') {
      score = correct * 1 - hints * 0.5;
      total = totalQuestions * 1;
    } else if (quizData.difficulty === 'medium') {
      score = correct * 2 - hints * 1;
      total = totalQuestions * 2;
    } else {
      score = correct * 3 - hints * 1.5;
      total = totalQuestions * 3;
    }

    const finalScore = Math.max(0, score);

    // Update state for display (optional)
    setIncorrectAnswer(incorrect);
    setCorrectCount(correct);
    setWrongCount(wrong);
    setUnanswered(unansweredCount);
    setScoreObtained(finalScore);
    setTotalScore(total);

    if (userId) {
      try {
        const result = {
          userId,
          quizId: quizData.quizId,
          userScore: finalScore,
          totalScore:total,
          correctAnswers: correct,
          wrongAnswers: wrong,
          learnLaterQuestions: learnLater.map((q) => q.id||q.question),
          timeTaken: timeTaken,
          submissionDate: new Date(),
          category:category,
          difficulty: quizData.difficulty,
        };

        console.log("result is:", result);

        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/submitQuizResult`,
          { quizResult: result },
          { withCredentials: true }
        );

        console.log("Quiz result saved successfully:", response.data);
      } catch (error) {
        console.error("Error saving quiz result:", error);
      }
    } else {
      console.log("User not logged in. Quiz result not saved to database.");
    }
  };

  calculateScore();
}, [location.state]);



  const toggleSection = (name) => setExpandedSection(expandedSection === name ? null : name);



return (
  <div className="min-h-screen overflow-auto bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans p-6 flex items-center justify-center">
    <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-8 space-y-8 transition-all">
    <div>
      <h1 className="text-5xl text-cyan-400 font-extrabold text-center drop-shadow-md">🎉 Quiz Results</h1>
      <p className="text-center text-sm text-purple-200 mt-2">Your performance summary is here!</p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-center text-base font-medium">
      <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-5 shadow-lg">
        <p className="text-3xl font-bold">{correctCount}</p>
        <p className="text-white/90">Correct</p>
      </div>
      <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl p-5 shadow-lg">
        <p className="text-3xl font-bold">{wrongCount}</p>
        <p className="text-white/90">Incorrect</p>
      </div>
      <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl p-5 shadow-lg">
        <p className="text-3xl font-bold">{unanswered}</p>
        <p className="text-white/90">Unanswered</p>
      </div>
      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl p-5 shadow-lg">
        <p className="text-3xl font-bold">{totalQuestions}</p>
        <p className="text-white/90">Total</p>
      </div>
    </div>

    <p className="text-center text-2xl font-bold text-white">
      Total Score: <span className="text-cyan-300">{userScore}</span><span className="text-cyan-300">/{totalScore}</span>
       {hintsUsed>0 && userScore>0 && (
  <p className="text-center text-sm text-red-400 mt-2">
    ⚠️ Some points were deducted due to hints used.
  </p>
)}
    </p>
   
    {incorrectAnswers.length > 0 && (
      <div>
       <button
        onClick={() => toggleSection('incorrect')}
        className="w-full flex items-center justify-between text-left bg-rose-700 hover:bg-rose-600 px-4 py-3 rounded-lg font-semibold shadow transition">
        <span>❌ Incorrect Answers ({incorrectAnswers.length})</span>
        <span>{expandedSection === 'incorrect' ? '▲' : '▼'}</span>
      </button>

        {expandedSection === 'incorrect' && (
          <div className="mt-2 space-y-4 max-h-80 overflow-y-auto px-1">
            {incorrectAnswers.map((item) => (
              <div key={item.index} className="bg-gray-900/70 border border-rose-600 rounded-lg p-4">
                <p className="font-semibold text-white">Q{item.index + 1}: {item.question}</p>
                <p className="text-red-400">Your Answer: {item.userAnswer}</p>
                <p className="text-green-400">Correct: {item.correctAnswer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
     {userId ?(
       <div className="flex justify-center gap-4">
      <button
        onClick={() => navigate('/startQuiz')}
        className="bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-fuchsia-700 hover:to-pink-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-md transition duration-200"
      >
        🔄 Start Again
      </button>
     
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-md transition duration-200"
      >
        🏠 Dashboard
      </button>
    </div>
     ):(
       <div className="flex justify-center gap-4">
      <button
        onClick={() => navigate('/login')}
        className="bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-fuchsia-700 hover:to-pink-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-md transition duration-200"
      >
        🔄 Login For More
      </button>
    </div>
     )
      
     }
   
    
  <p class="text-sm sm:text-base font-medium text-[#c2fb3c]">
    📌 Questions you marked to learn later are saved in your dashboard.
  </p>


  </div>
</div>

);

};

export default ResultsPage;
