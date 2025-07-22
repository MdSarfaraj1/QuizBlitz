import { useState, useEffect } from 'react';
import { ArrowLeft, X, Copy, Clock, Users, Share2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CategorySelection from './Categories'; // Assuming this path is correct
import axios from 'axios';
import { useAuth } from '../../Context/UserContextProvider';
import MultiplayerModal from '../Multiplayer/Multiplayer';

// Updated StartQuiz component with modal integration
const StartQuiz = () => {
  const { userId ,username ,profilePicture} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const alreadySelected = location.state?.alreadySelected || null;
  const [selectedCategory, setSelectedCategory] = useState(alreadySelected);
  const [categoryError, setCategoryError] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [showMultiplayerModal, setShowMultiplayerModal] = useState(false);

  const handleStartQuiz = async () => {
    // Defensive: check selectedCategory has required fields
    if (!selectedCategory || !selectedCategory._id || !selectedCategory.icon || !selectedCategory.title) {
      setCategoryError('Category data is incomplete. Please re-select a category.');
      return;
    }

    const endpoint = userId ? `/Quiz/startQuiz/${selectedCategory._id}` : `/Quiz/startQuiz/guest/${selectedCategory._id}`;

    if (!userId) {
      const hasPlayed = localStorage.getItem('guestQuizPlayed');
      if (hasPlayed) {
        alert("You've already played once as a guest. Please log in to play again.");
        navigate('/login');
        return;
      } else {
        localStorage.setItem('guestQuizPlayed', 'true');
      }
    }

    try {
      setIsLoading(true);
      setCategoryError('');
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}${endpoint}`,
        {
          difficulty: selectedDifficulty,
          numberOfQuestions,
          image: selectedCategory.icon,
          ...(userId && { userId })
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const quizData = response.data;
        console.log("playing quiz",quizData)
        navigate('/runQuiz', { state: { quizData, category: selectedCategory.title }});
      }
    } catch (error) {
      setIsLoading(false);
      localStorage.removeItem('guestQuizPlayed');
      console.error("Error starting quiz:", error);
      alert("Failed to start quiz. Please try again.");
    }
  };

  const handleStartMultiplayer = async () => {
    setShowMultiplayerModal(true);
  };

  const canStartQuiz = selectedCategory && selectedDifficulty;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="absolute top-8 left-16 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 transition duration-300 group"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700 group-hover:text-quizDashboard-accent transition" />
            <span className="font-semibold text-gray-800 text-base hidden sm:inline group-hover:text-quizDashboard-accent">
              Back
            </span>
          </button>
          <h1 className="text-3xl md:text-4xl font-extrabold text-center flex-1 text-purple-700">
            🎯 Choose Your Challenge
          </h1>
          <div className="w-24">
            <a href="#" className="text-2xl font-bold text-purple-700">
              Quiz<span className="text-pink-500">Blitz</span>
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Categories */}
          <div className="lg:col-span-2">
            <CategorySelection
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              userId={userId}
            />
          </div>

          {/* Right: Settings */}
          <div>
            <div className="bg-white rounded-2xl p-6 sticky top-8 border border-purple-200 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-purple-700">
                ⚙️ Quiz Settings
              </h2>

              {/* Selected Category */}
              {selectedCategory && (
                <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    📂 Selected Topic:
                  </h3>
                  <div className="flex items-center gap-3 text-lg font-medium text-purple-600">
                    <span className="text-3xl">{selectedCategory.icon}</span>
                    <span>{selectedCategory.title}</span>
                  </div>
                </div>
              )}

              {/* Difficulty Selection */}
              <div className="mb-5">
                <label className="block text-lg font-semibold mb-3 text-gray-700">
                  🎚️ Difficulty
                </label>
                <div className="grid gap-3">
                  {["easy", "medium", "hard"].map((level) => (
                    <label
                      key={level}
                      className="flex items-center gap-3 text-gray-600 cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={level}
                        checked={selectedDifficulty === level}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="accent-purple-500 w-5 h-5"
                      />
                      <span className="text-base">
                        {level === "easy" && "🟢 Easy - Basic"}
                        {level === "medium" && "🟡 Medium - Moderate"}
                        {level === "hard" && "🔴 Hard - Expert"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Number of Questions */}
              <div className="mb-6">
                <label className="text-lg font-semibold mb-2 block text-gray-700">
                  📋 Questions
                </label>
                <select
                  value={numberOfQuestions}
                  onChange={(e) =>
                    setNumberOfQuestions(parseInt(e.target.value))
                  }
                  className="w-full bg-gray-50 border border-purple-300 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
                >
                  <option value="5">5 Questions (Quick)</option>
                  <option value="10">10 Questions (Standard)</option>
                  <option value="15">15 Questions (Extended)</option>
                  <option value="20">20 Questions (Challenge)</option>
                </select>
              </div>

              {/* Start Button */}
              <div className="flex gap-3 w-full">
                {/* Start Quiz Button */}
                <button
                  disabled={!canStartQuiz || isLoading}
                  onClick={handleStartQuiz}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2
      ${
        canStartQuiz
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow"
          : "bg-gray-300 text-gray-600 cursor-not-allowed"
      }`}
                >
                  {isLoading ? (
                    <>
                      <div className="inline-block h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      Starting...
                    </>
                  ) : (
                    "🚀 Start"
                  )}
                </button>

                {/* Multiplayer Button */}
                <button
                  onClick={handleStartMultiplayer}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 flex  shadow items-center justify-center gap-2
      ${
        canStartQuiz
          ? "bg-gradient-to-r from-blue-500 to-sky-500 text-white hover:from-blue-600 hover:to-sky-600 hover:scale-105 shadow"
          : "bg-gray-300 text-gray-600 cursor-not-allowed"
      }`}
                >
                  🤝 Multiplayer
                </button>
              </div>

              {categoryError && (
                <div className="mt-2 text-red-600 text-sm font-semibold">
                  {categoryError}
                </div>
              )}

              {/* Quiz Info */}
              <div className="mt-4 text-sm text-gray-500 space-y-2">
                <p>⏱️ Timer: According To No. Of Questions</p>
                <p>💡 Maximum questions have hints</p>
                <p>❌ Each hint reduces 1/2 marks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multiplayer Modal */}
      {selectedCategory && (
        <MultiplayerModal
          isOpen={showMultiplayerModal}
          onClose={() => setShowMultiplayerModal(false)}
          userId={userId}
          image={selectedCategory.icon}
          categoryId={selectedCategory._id}
          numberOfQuestions={numberOfQuestions}
          difficulty={selectedDifficulty}
          username={username}
          profilePicture={profilePicture}
        />
      )}
    </div>
  );
};

export default StartQuiz