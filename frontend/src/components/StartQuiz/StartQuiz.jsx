import { useState} from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
 // Assuming this path is correct
import CategorySelection from './Categories'; // Import the new component
import axios from 'axios';

const StartQuiz = () => {
  const navigate=useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

const handleStartQuiz = async () => {
  try{
    const response=await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/startQuiz/${selectedCategory._id}`, {
      difficulty: selectedDifficulty,
      numberOfQuestions: numberOfQuestions
    }, { withCredentials: true });
  
    if(response.status===200){
      const quizData = response.data
     
      navigate('/runQuiz', {state:{ quizData,category:selectedCategory.title }} );
  }
}catch(error){
    console.error("Error starting quiz:", error);
  }
}
  const canStartQuiz = selectedCategory && selectedDifficulty;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#1f1f38] to-[#16213e] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Link to="/dashboard" className="flex items-center space-x-2 hover:text-purple-400 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-center flex-1">🎯 Choose Your Challenge</h1>
          <div className="w-24" >
            <a href="#" className="text-2xl font-bold text-primary">
              <h1 className="text-2xl font-bold text-quizDashboard-primary">
                Quiz<span className="text-quizDashboard-accent">Blitz</span>
              </h1>
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Categories (now using the new component) */}
          <div className="lg:col-span-2">
            <CategorySelection
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          {/* Right: Settings (remains the same) */}
          <div>
            <div className="bg-[#2b2b44] rounded-2xl p-6 sticky top-8 border border-purple-800 shadow-lg">
              <h2 className="text-2xl font-bold mb-3">⚙️ Quiz Settings</h2>

              {/* Selected Category */}
              {selectedCategory && (
                <div className="mb-2 p-2 bg-purple-950/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold mb-2">📂 Selected Topic:</h3>
                    <span >
                    <span className="text-2xl">{selectedCategory.icon}</span>
                    <span>{selectedCategory.title}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Difficulty Selection */}
              <div className="mb-5">
                <label className="block text-lg font-semibold mb-3">🎚️ Difficulty</label>
                <div className="grid gap-3">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <label key={level} className="flex items-center gap-3">
                      <input
                        type="radio"
                        value={level}
                        checked={selectedDifficulty === level}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="accent-purple-500 w-5 h-5"
                      />
                      <span className="text-sm">
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
                <label className="text-lg font-semibold mb-2 block">📋 Questions</label>
                <select
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
                  className="w-full bg-[#1f1f38] border border-purple-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="5">5 Questions (Quick)</option>
                  <option value="10">10 Questions (Standard)</option>
                  <option value="15">15 Questions (Extended)</option>
                  <option value="20">20 Questions (Challenge)</option>
                </select>
              </div>

              {/* Start Button */}
              <button
                disabled={!canStartQuiz}
                onClick={ handleStartQuiz}
                className={`w-full py-3 rounded-xl font-semibold transition-all text-lg ${
                  canStartQuiz
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 hover:scale-105'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                {canStartQuiz ? '🚀 Start Quiz!' : '⚠️ Select Category & Difficulty'}
              </button>

              {/* Quiz Info */}
              <div className="mt-3 text-sm text-purple-300 space-y-1">
                <p>⏱️ Timer: 10 minutes</p>
                <p>💡 Maximum questions have hints</p>
                <p>❌ Each hints reduces 1/2 marks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartQuiz;