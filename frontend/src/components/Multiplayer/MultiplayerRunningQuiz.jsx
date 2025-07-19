import React, { useState, useEffect, useRef } from 'react';
import { X, Users, Crown, Clock, CheckCircle, Play, Trophy, Target, Flag, BookOpen, User, Share2, Copy } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';

const MultiplayerQuiz = () => {

  // Mock data - replace with real data from props/context
  const mockQuizData= {
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
      },
      {
        _id: "3",
        questionText: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        correctAnswer: "Hyper Text Markup Language",
        hint: "It's about marking up text for web pages"
      }
    ],
    duration: 30,
    category: "Computer Science",
    roomCode: "QUIZ123"
  };
  const navigate=useNavigate()
  const location = useLocation();
  const quizData = location.state?.quizData;
  const mockRoomPlayers = [
    { id: 1, name: "You", isHost: true, avatar: "🧑‍💻", isCurrentUser: true, completed: false, score: 0, answers: {}, timeSpent: 0 },
    { id: 2, name: "Alice", isHost: false, avatar: "👩‍🎓", isCurrentUser: false, completed: false, score: 0, answers: {}, timeSpent: 0 },
    { id: 3, name: "Bob", avatar: "👨‍🔬", isCurrentUser: false, completed: true, score: 85, answers: {0: "O(log n)", 1: "Stack"}, timeSpent: 245 },
    { id: 4, name: "Charlie", avatar: "👨‍💼", isCurrentUser: false, completed: false, score: 0, answers: {0: "O(n)"}, timeSpent: 0 }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quizData?.duration * 60 || 1800); // Total quiz time
  const [markedForRevisit, setMarkedForRevisit] = useState([]);
  const [learnLater, setLearnLater] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState({});
  const [hiddenOptions, setHiddenOptions] = useState({});
  const [roomPlayers, setRoomPlayers] = useState(mockRoomPlayers);
  const [gamePhase, setGamePhase] = useState('playing'); // 'waiting', 'playing', 'submitted', 'results'
  const [showRoomInfo, setShowRoomInfo] = useState(false);
  const [toast, setToast] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());

  const usedHintQuestions = useRef(new Set());
  const totalQuestions = quizData.questions.length;
  const currentQuestion = quizData.questions[currentQuestionIndex];

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Timer effect - counts down total quiz time
  useEffect(() => {
    if (timeLeft > 0 && gamePhase === 'playing' && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleAutoSubmit();
    }
  }, [timeLeft, gamePhase, isSubmitted]);

  const handleAutoSubmit = () => {
    handleSubmitQuiz();
    showToast("Time's up! Quiz auto-submitted.", "warning");
  };

  const handleAnswerSelect = (option) => {
    if (isSubmitted) return;
    
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: option,
    });
    showToast("Answer saved!", "success");
  };

  const handleHintUsage = () => {
    if (!usedHintQuestions.current.has(currentQuestionIndex)) {
      usedHintQuestions.current.add(currentQuestionIndex);
    }
    setShowHint(prev => !prev);
  };

  const handleFiftyFifty = () => {
    if (fiftyFiftyUsed[currentQuestionIndex]) return;

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

    setFiftyFiftyUsed(prev => ({...prev, [currentQuestionIndex]: true}));
    showToast("50:50 used for this question!", "success");
  };

  const handleMarkForRevisit = () => {
    setMarkedForRevisit((prev) => {
      if (!prev.includes(currentQuestionIndex)) {
        showToast("Marked for review!", "success");
        return [...prev, currentQuestionIndex];
      } else {
        showToast("Unmarked!", "info");
        return prev.filter(index => index !== currentQuestionIndex);
      }
    });
  };

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
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowHint(false);
    }
  };

  const handleSubmitQuiz = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    setIsSubmitted(true);
    setGamePhase('submitted');
    
    // Calculate score
    let score = 0;
    Object.entries(selectedAnswers).forEach(([index, answer]) => {
      if (answer === quizData.questions[parseInt(index)].correctAnswer) {
        score += 10; // 10 points per correct answer
      }
    });

    // Update current user's data
    setRoomPlayers(prev => prev.map(player => 
      player.isCurrentUser 
        ? {...player, completed: true, score, answers: selectedAnswers, timeSpent}
        : player
    ));

    showToast("Quiz submitted successfully! Waiting for others...", "success");
  };

  const handleViewResults = () => {
    setShowResults(true);
    setGamePhase('results');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const formatTimeSpent = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getAnsweredCount = () => {
    return Object.keys(selectedAnswers).length;
  };

  const getCompletionPercentage = () => {
    return Math.round((getAnsweredCount() / totalQuestions) * 100);
  };

  const Toast = ({ message, type, onClose }) => (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
      type === 'success' ? 'bg-green-600' : 
      type === 'error' ? 'bg-red-600' : 
      type === 'info' ? 'bg-blue-600' : 
      type === 'warning' ? 'bg-orange-600' : 'bg-yellow-600'
    } text-white max-w-sm`}>
      <div className="flex items-start justify-between">
        <span className="flex-1 text-sm">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-70 flex-shrink-0">
          <X size={16} />
        </button>
      </div>
    </div>
  );

  // Results Modal Component
  const ResultsModal = () => {
    const sortedPlayers = [...roomPlayers].sort((a, b) => b.score - a.score);
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-yellow-400 flex items-center">
              <Trophy className="mr-2" />
              Quiz Results
            </h2>
            <button
              onClick={() => setShowResults(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  index === 0 
                    ? 'bg-yellow-900/30 border-yellow-500' 
                    : player.isCurrentUser
                    ? 'bg-purple-900/30 border-purple-500'
                    : 'bg-gray-700/50 border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <span className="text-2xl">{player.avatar}</span>
                      {index === 0 && <Crown className="absolute -top-1 -right-1 text-yellow-400" size={16} />}
                      {index === 1 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 rounded-full" />}
                      {index === 2 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-600 rounded-full" />}
                    </div>
                    <div>
                      <div className="font-bold text-lg">
                        #{index + 1} {player.name}
                        {player.isCurrentUser && <span className="text-purple-300 ml-2">(You)</span>}
                        {player.isHost && <span className="text-blue-300 ml-2">(Host)</span>}
                      </div>
                      <div className="text-sm text-gray-400">
                        {player.completed ? (
                          <>
                            Score: {player.score} | 
                            Answered: {Object.keys(player.answers).length}/{totalQuestions} | 
                            Time: {formatTimeSpent(player.timeSpent)}
                          </>
                        ) : (
                          <span className="text-orange-400">Still playing...</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-400">{player.score}</div>
                    {player.completed && (
                      <CheckCircle className="text-green-400 ml-auto" size={20} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-700/50 p-3 rounded">
                <div className="text-gray-400">Players Completed</div>
                <div className="text-xl font-bold text-green-400">
                  {roomPlayers.filter(p => p.completed).length}/{roomPlayers.length}
                </div>
              </div>
              <div className="bg-gray-700/50 p-3 rounded">
                <div className="text-gray-400">Average Score</div>
                <div className="text-xl font-bold text-blue-400">
                  {Math.round(roomPlayers.filter(p => p.completed).reduce((sum, p) => sum + p.score, 0) / roomPlayers.filter(p => p.completed).length) || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (gamePhase === 'submitted' && !showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-4">
        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl text-center max-w-md w-full border border-gray-700">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">Quiz Submitted!</h2>
          <p className="text-gray-300 mb-6">
            Your answers have been saved. Waiting for other players to complete their quiz...
          </p>
          
          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">Your Performance</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 p-3 rounded">
                <div className="text-xl font-bold text-green-400">{getAnsweredCount()}/{totalQuestions}</div>
                <div className="text-xs text-gray-400">Answered</div>
              </div>
              <div className="bg-gray-700/50 p-3 rounded">
                <div className="text-xl font-bold text-blue-400">{formatTimeSpent(Math.floor((Date.now() - startTime) / 1000))}</div>
                <div className="text-xs text-gray-400">Time Spent</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">Room Status</div>
            <div className="space-y-2">
              {roomPlayers.map(player => (
                <div key={player.id} className="flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <span className="mr-2">{player.avatar}</span>
                    {player.name}
                  </span>
                  {player.completed ? (
                    <CheckCircle className="text-green-400" size={16} />
                  ) : (
                    <Clock className="text-orange-400" size={16} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleViewResults}
            className="w-full px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-lg transition-colors duration-200"
          >
            View Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white font-sans">
      {/* Left Sidebar */}
      <div className="w-full lg:w-1/3 xl:w-1/4 p-4 lg:p-6 bg-gray-800/80 backdrop-blur-sm border-b lg:border-b-0 lg:border-r border-gray-700">
        
        {/* Room Info */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-300 flex items-center">
              <Users className="mr-2" size={20} />
              Room: {quizData.roomCode}
            </h2>
            <button
              onClick={() => setShowRoomInfo(!showRoomInfo)}
              className="lg:hidden text-blue-300 hover:text-blue-200"
            >
              {showRoomInfo ? <X size={20} /> : <Share2 size={20} />}
            </button>
          </div>
          
          {/* Players in Room */}
          <div className={`space-y-2 ${showRoomInfo ? 'block' : 'hidden lg:block'}`}>
            {roomPlayers.map((player) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  player.isCurrentUser 
                    ? 'bg-blue-700/50 border border-blue-500' 
                    : 'bg-gray-700/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <span className="text-xl">{player.avatar}</span>
                    {player.isHost && <Crown className="absolute -top-1 -right-1 text-yellow-400" size={12} />}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">
                      {player.name}
                      {player.isCurrentUser && <span className="text-blue-300 ml-1">(You)</span>}
                    </div>
                    <div className="text-xs text-gray-400">
                      {player.completed ? (
                        <span className="text-green-400">Completed</span>
                      ) : (
                        <span className="text-orange-400">Playing...</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {player.completed ? (
                    <CheckCircle className="text-green-400" size={16} />
                  ) : (
                    <Clock className="text-orange-400" size={16} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

       

        {/* Question Navigation */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-blue-300 mb-3">Questions</h3>
          <div className="grid grid-cols-5 gap-2">
            {quizData.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                disabled={isSubmitted}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200
                  ${index === currentQuestionIndex
                    ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-400"
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
                  ${isSubmitted ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Learn Later Section */}
        {learnLater.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-orange-300 mb-3 flex items-center">
              <BookOpen className="mr-2" size={18} />
              Learn Later ({learnLater.length})
            </h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {learnLater.map((item) => (
                <div
                  key={item.index}
                  className="flex items-center justify-between p-2 bg-gray-700/50 rounded text-sm"
                >
                  <span
                    onClick={() => !isSubmitted && setCurrentQuestionIndex(item.index)}
                    className={`cursor-pointer hover:text-orange-200 flex-1 truncate ${
                      isSubmitted ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    Q{item.index + 1}: {item.question.substring(0, 30)}...
                  </span>
                  {!isSubmitted && (
                    <X
                      size={16}
                      className="ml-2 text-red-400 hover:text-red-200 cursor-pointer flex-shrink-0"
                      onClick={() => handleLearnLater()}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {/*quit quiz  */}
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-6 px-6 py-3 bg-red-600 text-white text-lg font-bold rounded-lg hover:bg-red-500 transition-colors duration-200 shadow-xl flex items-center justify-center"
        >
          <span className="mr-2 text-2xl">🚀</span> Quit Quiz
        </button>
      </div>

      {/* Right Panel - Quiz Content */}
      <div className="flex-1 p-4 lg:p-8 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-2xl mb-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-blue-300">
              Question {currentQuestionIndex + 1} <span className="text-gray-400">of {totalQuestions}</span>
            </h1>
            <div className="flex items-center space-x-4">
              <div className="text-lg font-mono">
                <span className="text-orange-400">⏰</span>
                <span className={`ml-2 font-bold ${timeLeft <= 300 ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              {isSubmitted && (
                <div className="text-sm bg-green-700/50 px-3 py-1 rounded-full flex items-center">
                  <CheckCircle size={16} className="mr-1" />
                  Submitted
                </div>
              )}
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-700 pt-3">
            <div className="flex items-center space-x-4">
              <span>Room Quiz Mode</span>
              <span>{roomPlayers.filter(p => p.completed).length}/{roomPlayers.length} completed</span>
            </div>
            <div className="hidden sm:block">
              Progress: {getCompletionPercentage()}%
            </div>
          </div>
        </div>

        {/* Question Content */}
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
                  disabled={shouldHide || isSubmitted}
                  className={`text-left px-4 lg:px-6 py-3 lg:py-4 rounded-lg transition-all duration-300 border-2
                    ${shouldHide ? "opacity-30 cursor-not-allowed line-through border-red-500" : ""}
                    ${selectedAnswers[currentQuestionIndex] === option
                      ? "bg-blue-700 border-blue-500 shadow-md text-white transform scale-[1.02]"
                      : "bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-blue-500 text-gray-200"
                    } ${isSubmitted ? "opacity-70 cursor-not-allowed" : "hover:scale-105 active:scale-95"} 
                    focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50`}
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
        <div className="flex flex-wrap gap-2 lg:gap-3 justify-between items-center mt-6 p-4 bg-gray-800/50 rounded-lg backdrop-blur-md">
          <div className="flex flex-wrap gap-2 lg:gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0 || isSubmitted}
              className={`px-3 lg:px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors duration-200 text-sm lg:text-base
                ${(currentQuestionIndex === 0 || isSubmitted) ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === totalQuestions - 1 || isSubmitted}
                className={`px-3 lg:px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors duration-200 text-sm lg:text-base
                  ${(currentQuestionIndex === totalQuestions - 1 || isSubmitted) ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Next
              </button>
              <button
                onClick={handleHintUsage}
                disabled={isSubmitted}
                className="px-3 lg:px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-semibold text-sm lg:text-base transition-colors duration-200"
              >
                {showHint ? "Hide Hint" : "Use Hint"}
              </button>
              <button
                onClick={handleFiftyFifty}
                disabled={fiftyFiftyUsed[currentQuestionIndex] || isSubmitted}
                className={`px-3 lg:px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg font-semibold text-sm lg:text-base transition-colors duration-200
                  ${fiftyFiftyUsed[currentQuestionIndex] ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                50:50
              </button>
              <button
                onClick={handleMarkForRevisit}
                disabled={isSubmitted}
                className="px-3 lg:px-4 py-2 bg-purple-800 hover:bg-purple-700 text-white rounded-lg font-semibold text-sm lg:text-base transition-colors duration-200"
              >
                {markedForRevisit.includes(currentQuestionIndex) ? "Unmark" : "Mark for Revisit"}
              </button>
              <button
                onClick={handleLearnLater}
                disabled={isSubmitted}
                className="px-3 lg:px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-semibold text-sm lg:text-base transition-colors duration-200"
              >
                Learn Later
              </button>
            </div>
  
            <div>
              {!isSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold text-sm lg:text-base transition-colors duration-200"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={handleViewResults}
                  className="px-5 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-bold text-sm lg:text-base transition-colors duration-200"
                >
                  View Results
                </button>
              )}
            </div>
          </div>
        </div>
  
        {/* Toast Notification */}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
  
        {/* Results Modal */}
        {showResults && <ResultsModal />}
      </div>
    );
  };
  
  export default MultiplayerQuiz;
  