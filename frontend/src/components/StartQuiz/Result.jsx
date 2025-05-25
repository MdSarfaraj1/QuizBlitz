import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { questionsData } from './questionsData';

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [randomSelectedAnswers, setRandomSelectedAnswers] = useState({});
  const [randomLearnLater, setRandomLearnLater] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showExplanationFor, setShowExplanationFor] = useState(null);

  const { selectedAnswers, learnLater } = location.state || {
    selectedAnswers: randomSelectedAnswers,
    learnLater: randomLearnLater,
  };

  useEffect(() => {
    if (!location.state) {
      const generatedSelectedAnswers = {};
      const generatedLearnLater = [];

      questionsData.forEach((q, index) => {
        if (Math.random() > 0.3) {
          const rand = Math.floor(Math.random() * q.options.length);
          generatedSelectedAnswers[index] = q.options[rand];
        }
        if (Math.random() < 0.15) {
          generatedLearnLater.push({ question: q.question, index, explanation: q.explanation || "No explanation available." });
        }
      });

      setRandomSelectedAnswers(generatedSelectedAnswers);
      setRandomLearnLater(generatedLearnLater);
    }
  }, [location.state]);

  let score = 0;
  const correctAnswers = [], incorrectAnswers = [];

  questionsData.forEach((q, i) => {
    const user = selectedAnswers[i];
    const correct = q.answer;
    if (user) {
      if (user === correct) score++, correctAnswers.push({ index: i, question: q.question, userAnswer: user, correctAnswer: correct });
      else incorrectAnswers.push({ index: i, question: q.question, userAnswer: user, correctAnswer: correct, explanation: q.explanation || "No explanation available." });
    }
  });

  const total = questionsData.length;
  const unanswered = total - (correctAnswers.length + incorrectAnswers.length);

  const toggleSection = (name) => setExpandedSection(expandedSection === name ? null : name);
  const toggleExplanation = (index) => setShowExplanationFor(showExplanationFor === index ? null : index);

  const percentage = ((score / total) * 100).toFixed(0) + "%";

return (
  <div className="min-h-screen overflow-auto bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans p-6 flex items-center justify-center">
    <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-8 space-y-8 transition-all">
    <div>
      <h1 className="text-5xl text-cyan-400 font-extrabold text-center drop-shadow-md">🎉 Quiz Results</h1>
      <p className="text-center text-sm text-purple-200 mt-2">Your performance summary is here!</p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-center text-base font-medium">
      <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-5 shadow-lg">
        <p className="text-3xl font-bold">{score}</p>
        <p className="text-white/90">Correct</p>
      </div>
      <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl p-5 shadow-lg">
        <p className="text-3xl font-bold">{incorrectAnswers.length}</p>
        <p className="text-white/90">Incorrect</p>
      </div>
      <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl p-5 shadow-lg">
        <p className="text-3xl font-bold">{unanswered}</p>
        <p className="text-white/90">Unanswered</p>
      </div>
      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl p-5 shadow-lg">
        <p className="text-3xl font-bold">{total}</p>
        <p className="text-white/90">Total</p>
      </div>
    </div>

    <p className="text-center text-2xl font-bold text-white">
      Overall Score: <span className="text-cyan-300">{percentage}</span>
    </p>

    <div className="flex justify-center gap-4">
      <button
        onClick={() => navigate('/quiz')}
        className="bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-fuchsia-700 hover:to-pink-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-md transition duration-200"
      >
        🔄 Start Again
      </button>
      <button
        onClick={() => navigate('/')}
        className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-md transition duration-200"
      >
        🏠 Dashboard
      </button>
    </div>

    {incorrectAnswers.length > 0 && (
      <div>
        <button
          onClick={() => toggleSection('incorrect')}
          className="w-full text-left bg-rose-700 hover:bg-rose-600 px-4 py-3 rounded-lg font-semibold shadow transition"
        >
          ❌ Incorrect Answers ({incorrectAnswers.length}) {expandedSection === 'incorrect' ? '▲' : '▼'}
        </button>
        {expandedSection === 'incorrect' && (
          <div className="mt-2 space-y-4 max-h-60 overflow-y-auto px-1">
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

    {learnLater && learnLater.length > 0 && (
      <div>
        <button
          onClick={() => toggleSection('learnLater')}
          className="w-full text-left bg-orange-600 hover:bg-orange-500 px-4 py-3 rounded-lg font-semibold shadow transition"
        >
          📚 Learn Later ({learnLater.length}) {expandedSection === 'learnLater' ? '▲' : '▼'}
        </button>
        {expandedSection === 'learnLater' && (
          <div className="mt-2 space-y-4 max-h-60 overflow-y-auto px-1">
            {learnLater.map((item) => (
              <div key={item.index} className="bg-gray-900/70 border border-amber-500 rounded-lg p-4">
                <p className="font-semibold text-white">Q{item.index + 1}: {item.question}</p>
                <p className="text-gray-300">{item.explanation}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
</div>

);

};

export default ResultsPage;
