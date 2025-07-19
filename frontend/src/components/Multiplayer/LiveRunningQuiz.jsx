import React, { useState, useEffect, useRef } from 'react';
import { X, Users, Crown, Zap, Trophy, Target, Flag, BookOpen } from "lucide-react";
import { Toast } from '../UI/toast';
const LiveQuiz = () => {
  // Mock data - replace with real data from props/context
  const mockQuizData = {
    questions: [
      {
        _id: "1",
        questionText: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: "O(log n)",
        hint: "Think about how the search space is divided in each iteration"
      },
      {
        _id: "2", 
        questionText: "Which data structure uses LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctAnswer: "Stack",
        hint: "Last In, First Out - like a stack of plates"
      }
    ],
    duration: 10,
    category: "Computer Science"
  };

  const mockPlayers = [
    { id: 1, name: "You", score: 85, isHost: true, avatar: "🧑‍💻", answered: true, isCurrentUser: true },
    { id: 2, name: "Alice", score: 92, isHost: false, avatar: "👩‍🎓", answered: true, isCurrentUser: false },
    { id: 3, name: "Bob", score: 78, avatar: "👨‍🔬", answered: false, isCurrentUser: false },
    { id: 4, name: "Charlie", score: 88, avatar: "👨‍💼", answered: true, isCurrentUser: false }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30); // Per question timer
  const [markedForRevisit, setMarkedForRevisit] = useState([]);
  const [learnLater, setLearnLater] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState({});
  const [players, setPlayers] = useState(mockPlayers);
  const [gamePhase, setGamePhase] = useState('playing'); // 'waiting', 'playing', 'results'
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [toast, setToast] = useState(null);
  const [powerUpsUsed, setPowerUpsUsed] = useState({
    fiftyFifty: 0,
    timeFreeze: 0,
    doublePoints: 0
  });

  const usedHintQuestions = useRef(new Set());
  const totalQuestions = mockQuizData.questions.length;
  const currentQuestion = mockQuizData.questions[currentQuestionIndex];

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && gamePhase === 'playing') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, gamePhase]);

  const handleTimeUp = () => {
    // Auto-submit current answer or move to next question
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(30);
      setShowHint(false);
    } else {
      handleGameEnd();
    }
  };

  const handleAnswerSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: option,
    });
    
    // Simulate real-time answer update
    setPlayers(prev => prev.map(player => 
      player.isCurrentUser ? {...player, answered: true} : player
    ));
  };

  const handleHintUsage = () => {
    if (!usedHintQuestions.current.has(currentQuestionIndex)) {
      usedHintQuestions.current.add(currentQuestionIndex);
    }
    setShowHint(prev => !prev);
  };

  const handleFiftyFifty = () => {
    if (fiftyFiftyUsed) return;

    const correctAnswer = currentQuestion.correctAnswer;
    const incorrectOptions = currentQuestion.options.filter(
      (opt) => opt !== correctAnswer
    );

    const shuffled = incorrectOptions.sort(() => 0.5 - Math.random());
    const optionsToHide = shuffled.slice(0, 2);

    setHiddenOptions((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionsToHide,
    }));

    setPowerUpsUsed(prev => ({...prev, fiftyFifty: prev.fiftyFifty + 1}));
    setFiftyFiftyUsed(true);
    showToast("50:50 Power-up used!", "success");
  };

  // const handleMarkForRevisit = () => {
  //   setMarkedForRevisit((prev) => {
  //     if (!prev.includes(currentQuestionIndex)) {
  //       showToast("Marked for review!", "success");
  //       return [...prev, currentQuestionIndex];
  //     } else {
  //       showToast("Unmarked!", "info");
  //       return prev.filter(index => index !== currentQuestionIndex);
  //     }
  //   });
  // };

  const handleLearnLater = () => {
    setLearnLater((prev) => {
      const exists = prev.some(item => item.index === currentQuestionIndex);
      if (!exists) {
        showToast("Added to Learn Later!", "success");
        return [...prev, { 
          question: currentQuestion.questionText, 
          index: currentQuestionIndex,
          id: currentQuestion._id
        }];
      } else {
        showToast("Removed from Learn Later!", "info");
        return prev.filter(item => item.index !== currentQuestionIndex);
      }
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(30);
      setShowHint(false);
    }
  };

  const handleGameEnd = () => {
    setGamePhase('results');
    showToast("Quiz completed! Check results.", "success");
  };

  const formatTime = (seconds) => {
    return `${seconds.toString().padStart(2, '0')}s`;
  };


  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 text-white font-sans">
      {/* Left Sidebar - Players and Navigation */}
      <div className="w-full lg:w-1/3 xl:w-1/4 p-4 lg:p-6 bg-gray-800/80 backdrop-blur-sm border-b lg:border-b-0 lg:border-r border-gray-700">
        
        {/* Players Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-indigo-300 flex items-center">
              <Users className="mr-2" size={20} />
              Players ({players.length})
            </h2>
            <button
              onClick={() => setShowPlayerList(!showPlayerList)}
              className="lg:hidden text-indigo-300 hover:text-indigo-200"
            >
              {showPlayerList ? <X size={20} /> : <Users size={20} />}
            </button>
          </div>
          
          <div className={`space-y-2 ${showPlayerList ? 'block' : 'hidden lg:block'}`}>
            {players
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  player.isCurrentUser 
                    ? 'bg-indigo-700/50 border border-indigo-500' 
                    : 'bg-gray-700/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <span className="text-2xl">{player.avatar}</span>
                    {index === 0 && <Crown className="absolute -top-1 -right-1 text-yellow-400" size={12} />}
                    {player.isHost && <Zap className="absolute -bottom-1 -right-1 text-blue-400" size={10} />}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">
                      {player.name}
                      {player.isCurrentUser && <span className="text-indigo-300 ml-1">(You)</span>}
                    </div>
                    <div className="text-xs text-gray-400">
                      Score: {player.score}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {player.answered && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
                  {!player.answered && gamePhase === 'playing' && (
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-blue-300 mb-3">Question Progress</h3>
          <div className="grid grid-cols-5 gap-2">
            {mockQuizData.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200
                  ${index === currentQuestionIndex
                    ? "bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400"
                    : ""
                  }
                  ${selectedAnswers[index] && index !== currentQuestionIndex
                    ? "bg-green-500 text-white"
                    : ""
                  }
                  ${markedForRevisit.includes(index) && index !== currentQuestionIndex
                    ? "bg-yellow-500 text-black"
                    : ""
                  }
                  ${!(selectedAnswers[index] || markedForRevisit.includes(index) || index === currentQuestionIndex)
                    ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                    : ""
                  }
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Learn Later Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-orange-300 mb-3 flex items-center">
            <BookOpen className="mr-2" size={18} />
            Learn Later
          </h3>
          {learnLater.length > 0 ? (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {learnLater.map((item) => (
                <div
                  key={item.index}
                  className="flex items-center justify-between p-2 bg-gray-700/50 rounded text-sm"
                >
                  <span
                    onClick={() => setCurrentQuestionIndex(item.index)}
                    className="cursor-pointer hover:text-orange-200 flex-1 truncate"
                  >
                    Q{item.index + 1}: {item.question.substring(0, 30)}...
                  </span>
                  <X
                    size={16}
                    className="ml-2 text-red-400 hover:text-red-200 cursor-pointer flex-shrink-0"
                    onClick={() => handleLearnLater()}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic">No questions marked yet.</p>
          )}
        </div>

      </div>

      {/* Right Panel - Quiz Content */}
      <div className="flex-1 p-4 lg:p-8 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-2xl mb-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-indigo-300">
              Question {currentQuestionIndex + 1} <span className="text-gray-400">of {totalQuestions}</span>
            </h1>
            <div className="flex items-center space-x-4">
              <div className="text-lg font-mono">
                <span className="text-red-400">⏰</span>
                <span className={`ml-2 font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="text-sm bg-indigo-700/50 px-3 py-1 rounded-full">
                Round 1/3
              </div>
            </div>
          </div>
          
          {/* Live Status Bar */}
          <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-700 pt-3">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Live Quiz
              </span>
              <span>{players.filter(p => p.answered).length}/{players.length} answered</span>
            </div>
            <div className="hidden sm:block">
              Waiting for all players...
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-gray-800/60 backdrop-blur-sm p-6 lg:p-8 rounded-xl shadow-2xl flex-1 border border-gray-700">
          <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-6 lg:mb-8 leading-relaxed">
            {currentQuestion.questionText}
          </h2>

          {/* Options */}
          <div className="grid gap-3 lg:gap-4 sm:grid-cols-2 mb-6">
            {currentQuestion.options.map((option, index) => {
              const shouldHide = hiddenOptions[currentQuestionIndex]?.includes(option);
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={shouldHide}
                  className={`text-left px-4 lg:px-6 py-3 lg:py-4 rounded-lg transition-all duration-300 border-2
                    ${shouldHide ? "opacity-30 cursor-not-allowed line-through border-red-500" : ""}
                    ${selectedAnswers[currentQuestionIndex] === option
                      ? "bg-indigo-700 border-indigo-500 shadow-md text-white transform scale-[1.02]"
                      : "bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-indigo-500 text-gray-200"
                    } hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50`}
                >
                  <span className="font-semibold text-base lg:text-lg">
                    {String.fromCharCode(65 + index)}.{" "}
                  </span>
                  <span className="text-sm lg:text-base">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Hint Display */}
          {showHint && (
            <div className="mb-6 p-4 bg-yellow-100 text-gray-900 rounded-lg border border-yellow-300">
              <h4 className="font-bold text-lg flex items-center mb-2">
                💡 Hint:
              </h4>
              <p>{currentQuestion.hint || "No hint available for this question."}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 lg:gap-3 justify-center lg:justify-end mt-6 p-4 bg-gray-800/50 rounded-lg backdrop-blur-md">
          <button
            onClick={handleHintUsage}
            className="px-3 lg:px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-semibold transition-colors duration-200 text-sm lg:text-base"
          >
            💡 {showHint ? "Hide Hint" : "Hint"}
          </button>
          
          <button
            onClick={handleFiftyFifty}
            disabled={fiftyFiftyUsed || powerUpsUsed.fiftyFifty >= 3}
            className={`px-3 lg:px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg font-semibold transition-colors duration-200 text-sm lg:text-base
              ${(fiftyFiftyUsed || powerUpsUsed.fiftyFifty >= 3) ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            🎯 50:50
          </button>
          
          {/* <button
            onClick={handleMarkForRevisit}
            className="px-3 lg:px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors duration-200 text-sm lg:text-base"
          >
            <Flag className="inline mr-1" size={16} />
            Mark
          </button> */}
          
          <button
            onClick={handleLearnLater}
            className="px-3 lg:px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-semibold transition-colors duration-200 text-sm lg:text-base"
          >
            📚 Learn Later
          </button>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 lg:px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors duration-200 text-sm lg:text-base"
            >
              Next ➡
            </button>
          ) : (
            <button
              onClick={handleGameEnd}
              className="px-4 lg:px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-colors duration-200 text-sm lg:text-base"
            >
              ✅ Finish
            </button>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
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

export default LiveQuiz;