import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { questionsData } from './questionsData';

const RunningQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [learnLater, setLearnLater] = useState([]); // Re-introducing learnLater state
  const [showHint, setShowHint] = useState(false);

  const totalQuestions = questionsData.length;
  const currentQuestion = questionsData[currentQuestionIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: option,
    });
  };

  const handleNext = () => {
    // Next button is always enabled, so no disabled logic here.
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowHint(false); // Reset hint visibility on question change
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowHint(false); // Reset hint visibility on question change
    }
  };

  const handleMarkForReview = () => {
    if (!markedForReview.includes(currentQuestionIndex)) {
      setMarkedForReview([...markedForReview, currentQuestionIndex]);
    }
    // No automatic navigation after marking for review
  };

  const handleLearnLater = () => {
    // Add to learnLater if not already present
    if (!learnLater.some(item => item.index === currentQuestionIndex)) {
      setLearnLater([...learnLater, { question: currentQuestion.question, index: currentQuestionIndex }]);
    }
    // No automatic navigation after marking for learn later
  };

  const handleSubmit = () => {
    navigate('/results', {
      state: {
        selectedAnswers,
        learnLater, // Pass learnLater data
        markedForReview,
      },
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
      {/* Left Sidebar - Navigation and Review */}
      <div className="w-full md:w-1/3 lg:w-1/4 p-6 bg-gray-800 border-b md:border-b-0 md:border-r border-gray-700 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-blue-400 mb-4">Quiz Progress</h2>
          <div className="grid grid-cols-5 gap-2">
            {questionsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200
                  ${index === currentQuestionIndex ? 'bg-blue-600 text-white shadow-lg' : ''}
                  ${selectedAnswers[index] && index !== currentQuestionIndex ? 'bg-green-500 text-white' : ''}
                  ${markedForReview.includes(index) && index !== currentQuestionIndex ? 'bg-yellow-500 text-gray-900' : ''}
                
                  ${!(selectedAnswers[index] || markedForReview.includes(index) || index === currentQuestionIndex) ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : ''}
                `}
                title={`Question ${index + 1} ${selectedAnswers[index] ? '(Answered)' : ''} ${markedForReview.includes(index) ? '(Marked for Review)' : ''} ${learnLater.some(item => item.index === index) ? '(Learn Later)' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-400 space-y-1">
            <p><span className="inline-block w-3 h-3 rounded-full bg-blue-600 mr-2"></span> Current Question</p>
            <p><span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span> Answered</p>
            <p><span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span> Marked for Review</p>
            <p><span className="inline-block w-3 h-3 rounded-full bg-gray-700 mr-2"></span> Unanswered</p>
          </div>
        </div>

        {/* Learn Later Questions List */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-300 mb-4">Learn Later Questions</h3>
          {learnLater.length > 0 ? (
            <div className="p-3 bg-gray-700 rounded-lg shadow-inner">
              <ul className="space-y-1 text-sm">
                {learnLater.map((item) => (
                  <li
                    key={item.index}
                    className="cursor-pointer text-orange-300 hover:text-orange-200 transition-colors duration-200"
                    onClick={() => setCurrentQuestionIndex(item.index)}
                  >
                    Question {item.index + 1}: {item.question.substring(0, 45)}... {/* Displaying text */}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic">No questions marked for 'Learn Later' yet.</p>
          )}
        </div>


        <Link
        to={'/StartQuiz'}
          onClick={handleSubmit}
          className="w-full mt-6 px-6 py-3 bg-red-600 text-white text-lg font-bold rounded-lg hover:bg-red-500 transition-colors duration-200 shadow-xl flex items-center justify-center"
        >
          <span className="mr-2 text-2xl">🚀</span> Quit Quiz
        </Link>
      </div>

      {/* Right Quiz Panel - Main Content */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-6 md:p-10 flex flex-col flex-grow relative">
        <div className="bg-gray-800/60 backdrop-filter backdrop-blur-sm p-8 rounded-xl shadow-2xl mb-8 border border-gray-700 flex-grow">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
            <h2 className="text-3xl font-extrabold text-blue-300">
              Question {currentQuestionIndex + 1} <span className="text-gray-400">of {totalQuestions}</span>
            </h2>
            <div className="text-xl font-mono text-gray-300">
              <span className="text-red-400 mr-2">⏰</span> Time Left: <span className="text-red-400 font-extrabold animate-pulse">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <h3 className="text-3xl font-bold mb-8 leading-relaxed text-white">
            {currentQuestion.question}
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 border-2
                  ${selectedAnswers[currentQuestionIndex] === option
                    ? 'bg-blue-700 border-blue-500 shadow-md text-white'
                    : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-blue-500 text-gray-200'
                  } transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50`}
              >
                <span className="font-semibold text-lg">{String.fromCharCode(65 + index)}. </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-end mt-auto pt-6 border-t border-gray-700 flex-shrink-0">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center"
          >
            <span className="mr-2 text-xl">⬅</span> Previous
          </button>

          <button
            onClick={handleNext}
            // Next button is now always enabled unless it's the last question
            disabled={currentQuestionIndex === totalQuestions - 1}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center"
          >
            Next <span className="ml-2 text-xl">➡</span>
          </button>

          <button
            onClick={() => setShowHint(!showHint)}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors duration-200 shadow-md flex items-center"
          >
            <span className="mr-2 text-xl">💡</span> {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>

          <button
            onClick={handleMarkForReview}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors duration-200 shadow-md flex items-center"
          >
            <span className="mr-2 text-xl">🚩</span> Mark for Review
          </button>


          <button
            onClick={handleLearnLater}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors duration-200 shadow-md flex items-center"
          >
            <span className="mr-2 text-xl">📚</span> Learn Later
          </button>
          

          {currentQuestionIndex === totalQuestions - 1 && (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-500 transition-colors duration-200 shadow-xl flex items-center"
            >
              <span className="mr-2 text-xl">✅</span> Final Submit
            </button>
          )}
        </div>
        {showHint && (
            <div className="mt-6 p-4 bg-yellow-100 text-gray-900 rounded-lg shadow-inner text-base border border-yellow-300">
              <h4 className="font-bold text-lg mb-2">Hint:</h4>
              <p>{currentQuestion.hint || 'No hint available for this question.'}</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default RunningQuiz;