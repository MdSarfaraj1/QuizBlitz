import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CategorySelection from './Categories'; // Assuming this path is correct
import axios from 'axios';
import { useAuth } from '../../Context/UserContextProvider';

const StartQuiz = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuiz = async () => {
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
        navigate('/runQuiz', { state: { quizData, category: selectedCategory.title } });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error starting quiz:", error);
      alert("Failed to start quiz. Please try again.");
    }
  };

  const canStartQuiz = selectedCategory && selectedDifficulty;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Link to={userId ? "/dashboard" : "/"} className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-300">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-center flex-1 text-purple-700">🎯 Choose Your Challenge</h1>
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
              <h2 className="text-2xl font-bold mb-4 text-purple-700">⚙️ Quiz Settings</h2>

              {/* Selected Category */}
              {selectedCategory && (
                <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-gray-700 mb-2">📂 Selected Topic:</h3>
                  <div className="flex items-center gap-3 text-lg font-medium text-purple-600">
                    <span className="text-3xl">{selectedCategory.icon}</span>
                    <span>{selectedCategory.title}</span>
                  </div>
                </div>
              )}

              {/* Difficulty Selection */}
              <div className="mb-5">
                <label className="block text-lg font-semibold mb-3 text-gray-700">🎚️ Difficulty</label>
                <div className="grid gap-3">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <label key={level} className="flex items-center gap-3 text-gray-600 cursor-pointer">
                      <input
                        type="radio"
                        value={level}
                        checked={selectedDifficulty === level}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="accent-purple-500 w-5 h-5"
                      />
                      <span className="text-base">
                        {level === 'easy' && '🟢 Easy - Basic'}
                        {level === 'medium' && '🟡 Medium - Moderate'}
                        {level === 'hard' && '🔴 Hard - Expert'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Number of Questions */}
              <div className="mb-6">
                <label className="text-lg font-semibold mb-2 block text-gray-700">📋 Questions</label>
                <select
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
                  className="w-full bg-gray-50 border border-purple-300 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
                >
                  <option value="5">5 Questions (Quick)</option>
                  <option value="10">10 Questions (Standard)</option>
                  <option value="15">15 Questions (Extended)</option>
                  <option value="20">20 Questions (Challenge)</option>
                </select>
              </div>

              {/* Start Button */}
              <button
                disabled={!canStartQuiz || isLoading}
                onClick={handleStartQuiz}
                className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  canStartQuiz
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-[1.02] shadow-lg'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="inline-block h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    Starting Quiz...
                  </>
                ) : (
                  canStartQuiz ? '🚀 Start Quiz!' : '⚠️ Select Category & Difficulty'
                )}
              </button>

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
    </div>
  );
};

export default StartQuiz;