import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { Toast } from "../UI/toast";
import { X} from "lucide-react";
import { useRef } from 'react';
import { useAuth } from '../../Context/UserContextProvider'; 

const RunningQuiz = () => {
  const navigate = useNavigate();
    const location = useLocation();
    const {userId}=useAuth()
  const quizData = location.state?.quizData;
  const category =location.state?.category||""
 const usedHintQuestions = useRef(new Set());
console.log("running Quiz data",quizData)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quizData?.duration*60 || 600); 
  const [markedForRevisit, setMarkedForRevisit] = useState([]);
  const [learnLater, setLearnLater] = useState([]); // Re-introducing learnLater state
  const [showHint, setShowHint] = useState(false);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
const [hiddenOptions, setHiddenOptions] = useState([]);


const [toast, setToast] = useState(null); 
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const totalQuestions = quizData.questions.length;
  const currentQuestion = quizData.questions[currentQuestionIndex];

  //for timer
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


const handleHintUsage = (currentQuestionIndex) => {
  if (!usedHintQuestions.current.has(currentQuestionIndex)) {
    usedHintQuestions.current.add(currentQuestionIndex);
  }

  setShowHint((prev) => !prev);
};
const handleFiftyFifty = () => {
  if (fiftyFiftyUsed) return;

  const correctAnswer = currentQuestion.correctAnswer; 
  const incorrectOptions = currentQuestion.options.filter(
    (opt) => opt !== correctAnswer
  );

  // Pick two incorrect options to hide
  const shuffled = incorrectOptions.sort(() => 0.5 - Math.random());
  const optionsToHide = shuffled.slice(0, 2);

  setHiddenOptions(optionsToHide);
  setFiftyFiftyUsed(true);
};

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
const handleMarkForRevisit = () => {
  setMarkedForRevisit((prev) => {
    if (!prev.includes(currentQuestionIndex)) {
      showToast("Marked!", "success");
      return [...prev, currentQuestionIndex];
    } else {
      showToast("Unmarked!", "failure");
      return prev.filter(index => index !== currentQuestionIndex);
    }
  });
};


const handleLearnLater = (itemIndex) => {
  setLearnLater((prev) => {
    const exists = prev.some(item => item.index === currentQuestionIndex);

    if (!exists) {
      showToast("Added to Learn Later!", "success");
      return [...prev, { question: currentQuestion.questionText, index: currentQuestionIndex ,id: currentQuestion._id}];
    } else {
      showToast("Removed from Learn Later!", "failure");
      return prev.filter(item => item.index !== itemIndex);
    }
  });
};

  const handleSubmit = () => {
   
    navigate('/quizResult', {
      state: {
        selectedAnswers,
        learnLater, 
        quizData,
        hintsUsed:usedHintQuestions.current.size,
        timeTaken: (quizData?.duration * 60 || 600) - timeLeft, 
        category:quizData.category||category

       
      }, replace: true,
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
          <h2 className="text-2xl font-extrabold text-blue-400 mb-4">
            Quiz Progress
          </h2>
          <div className="grid grid-cols-5 gap-2">
            {quizData.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200
                  ${
                    index === currentQuestionIndex
                      ? "bg-blue-600 text-white shadow-lg"
                      : ""
                  }
                  ${
                    selectedAnswers[index] && index !== currentQuestionIndex
                      ? "bg-green-500 text-white"
                      : ""
                  }
                  ${
                    markedForRevisit.includes(index) &&
                    index !== currentQuestionIndex
                      ? "bg-yellow-400 text-black border border-red-600 rounded-full shadow-sm hover:scale-105 transition-transform duration-150"
                      : ""
                  }
                
                  ${
                    !(
                      selectedAnswers[index] ||
                      markedForRevisit.includes(index) ||
                      index === currentQuestionIndex
                    )
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : ""
                  }
                `}
                title={`Question ${index + 1} ${
                  selectedAnswers[index] ? "(Answered)" : ""
                } ${
                  markedForRevisit.includes(index) ? "(Marked for Review)" : ""
                } ${
                  learnLater.some((item) => item.index === index)
                    ? "(Learn Later)"
                    : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-400 space-y-1">
            <p>
              <span className="inline-block w-3 h-3 rounded-full bg-blue-600 mr-2"></span>{" "}
              Current Question
            </p>
            <p>
              <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>{" "}
              Answered
            </p>
            <p>
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>{" "}
              Marked for Revisit
            </p>
            <p>
              <span className="inline-block w-3 h-3 rounded-full bg-gray-700 mr-2"></span>{" "}
              Unanswered
            </p>
          </div>
        </div>

        {/* Learn Later Questions List */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-300 mb-4">
            Learn Later Questions
          </h3>
          {learnLater.length > 0 ? (
            <div className="p-3 bg-gray-700 rounded-lg shadow-inner">
              <ul className="space-y-1 text-sm">
                {learnLater.map((item) => (
                  <li
                    key={item.index}
                    className="flex justify-between items-center text-orange-300 hover:text-orange-200"
                  >
                    <span
                      onClick={() => setCurrentQuestionIndex(item.index)}
                      className="cursor-pointer"
                    >
                      Question {item.index + 1}:{" "}
                      {item.question.substring(0, 45)}...
                    </span>
                    <X
                      size={20}
                      className="ml-2 text-red-400 hover:text-red-200 cursor-pointer"
                      onClick={() => handleLearnLater(item.index)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic">
              No questions marked for 'Learn Later' yet.
            </p>
          )}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="w-full mt-6 px-6 py-3 bg-red-600 text-white text-lg font-bold rounded-lg hover:bg-red-500 transition-colors duration-200 shadow-xl flex items-center justify-center"
        >
          <span className="mr-2 text-2xl">🚀</span> Quit Quiz
        </button>
      </div>

      {/* Right Quiz Panel - Main Content */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-6 md:p-10 flex flex-col flex-grow relative">
        <div className="bg-gray-800/60 backdrop-filter backdrop-blur-sm p-8 rounded-xl shadow-2xl mb-8 border border-gray-700 flex-grow">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
            <h2 className="text-3xl font-extrabold text-blue-300">
              Question {currentQuestionIndex + 1}{" "}
              <span className="text-gray-400">of {totalQuestions}</span>
            </h2>
            <div className="text-xl font-mono text-gray-300">
              <span className="text-red-400 mr-2">⏰</span> Time Left:{" "}
              <span className="text-red-400 font-extrabold animate-pulse">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <h3 className="text-3xl font-bold mb-8 leading-relaxed text-white">
            {currentQuestion.questionText}
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {currentQuestion.options.map((option, index) => {  //understand later
              const shouldHide = hiddenOptions.includes(option);
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={shouldHide}
                  className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 border-2
        ${shouldHide ? "opacity-30 cursor-not-allowed line-through border-red-500" : ""}
        ${selectedAnswers[currentQuestionIndex] === option
            ? "bg-blue-700 border-blue-500 shadow-md text-white"
            : "bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-blue-500 text-gray-200"
        } transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50`}
                >
                  <span className="font-semibold text-lg">
                    {String.fromCharCode(65 + index)}.{" "}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-end mt-auto pt-6 border-t        border-gray-700 flex-shrink-0">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`runningQuiz-button bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <span className="mr-2 text-xl">⬅</span> Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === totalQuestions - 1}
            className={`runningQuiz-button bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            Next <span className="ml-2 text-xl">➡</span>
          </button>
          <button
            onClick={handleHintUsage}
            className={`runningQuiz-button bg-yellow-600 hover:bg-yellow-500`}
          >
            <span className="mr-2 text-xl">💡</span>{" "}
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
           <button
            onClick={handleFiftyFifty}
            disabled={fiftyFiftyUsed}
            className={`runningQuiz-button bg-pink-600 hover:bg-pink-500 ${
              fiftyFiftyUsed ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="mr-2 text-xl">🎯</span> 50:50
          </button>
          <button
            onClick={handleMarkForRevisit}
            className={`runningQuiz-button bg-purple-600 hover:bg-purple-500`}
          >
            <span className="mr-2 text-xl">🚩</span> Mark for Revisit
          </button>
          <button
            disabled={!userId}
            onClick={handleLearnLater}
            className={`runningQuiz-button bg-orange-600 hover:bg-orange-500 
      ${!userId ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span className="mr-2 text-xl">📚</span> Learn Later
          </button>

          {/* show hint */}
          {showHint && (
            <div className="p-2 w-auto flex align-baseline bg-yellow-100 text-gray-900 rounded-lg shadow-inner text-base border border-yellow-300">
              <h4 className="font-bold text-lg  mr-2">Hint:</h4>
              <p className="mt-1">
                {currentQuestion.hint || "No hint available for this question."}
              </p>
            </div>
          )}
          {currentQuestionIndex === totalQuestions - 1 && (
            <button
              onClick={handleSubmit}
              className={`runningQuiz-button bg-green-600 hover:bg-green-500 font-bold shadow-lg`}
            >
              <span className="mr-2 text-xl">✅</span> Final Submit
            </button>
          )}
         
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default RunningQuiz;