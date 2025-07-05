import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { Check,Calendar ,X, Clock, Timer, Play, Activity } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecentQuizzes = ({ className, fullPledge = false }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    
    const fetchRecentQuizzes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/userAttemptedQuizzes`, {
          withCredentials: true
        });

        if (response.data.success) {
          const transformedQuizzes = response.data.quizzes.map((quiz, index) => ({
            id: quiz.quizId,
            category: quiz.category || 'General',
            userScore:quiz.userScore ,
            maxQuizScore:quiz.maxQuizScore,
            totalQuestions: quiz.correctAnswers + quiz.wrongAnswers,
            correctAnswers: quiz.correctAnswers,
            date: formatDate(quiz.submissionDate),
            time: formatTime(quiz.submissionDate),
            color: getCategoryColor(quiz.category),
            difficulty: quiz.difficulty||'loading',
            timeTaken: formatTimeTaken(quiz.timeTaken),
          }));
          console.log(transformedQuizzes);
          setQuizzes(transformedQuizzes);
        }
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || 'Failed to fetch recent quizzes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentQuizzes();
  }, []);

  // Helper functions for data formatting
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata', // or your time zone
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}


function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
  });
}

  const formatTimeTaken = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

 const getCategoryColor = () => {
  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-red-100 text-red-800',
    'bg-indigo-100 text-indigo-800',
    'bg-pink-100 text-pink-800',
    'bg-teal-100 text-teal-800'
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};


  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };


  // Check if we should show the empty state
  const shouldShowEmptyState = quizzes.length <= 2;

  if (loading) {
    return (
      <Card className={`${className || 'shadow-md'} ${fullPledge ? 'h-full w-full' : ''}`}>
        <CardHeader className={`pb-2 border-b ${fullPledge ? 'p-6' : ''}  bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl flex items-center`}>
          <CardTitle className={`font-bold text-gray-800 ${fullPledge ? 'text-3xl' : 'text-xl'} flex items-start gap-3`}>
            <span className="bg-blue-100 rounded-full p-2 flex items-start justify-center shadow-sm">
              <Calendar className="w-5 h-5 text-blue-500" />
            </span>
            <span className="tracking-wide">Recent Quizzes</span>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${fullPledge ? 'p-6' : ''} flex items-center justify-center`}>
          <div className="text-center py-8">
            <Activity className="w-8 h-8 animate-spin mx-auto text-blue-500 mb-4" />
            <p className="text-gray-600">Loading your recent quizzes...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`${className || 'shadow-md'} ${fullPledge ? 'h-full w-full' : ''}`}>
        <CardHeader className={`pb-2 border-b ${fullPledge ? 'p-6' : ''}  bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl flex `}>
          <CardTitle className={`font-bold text-white ${fullPledge ? 'text-3xl' : 'text-2xl'} flex items-center gap-3`}>
            <span className="bg-blue-100 rounded-full p-2 flex items-start justify-center shadow-sm">
              <Calendar className="w-6 h-6 text-blue-500" />
            </span>
            <span className="tracking-wide">Recent Quizzes</span>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${fullPledge ? 'p-6' : ''} flex items-center justify-center`}>
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-blue-500 hover:text-blue-600 underline"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (shouldShowEmptyState) {
    return (
      <Card
        className={`${className || "shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform "} ${
          fullPledge ? "h-full w-full" : ""
        }`}
      >
        <CardHeader className={`pb-2 border-b ${fullPledge ? "p-6" : ""}  bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl flex `}>
          <CardTitle
            className={`font-bold text-white ${
              fullPledge ? "text-3xl" : "text-2xl"
            } flex items-center gap-3`}
          >
            <span className="bg-blue-100 rounded-full p-2 flex items-start justify-center shadow-sm">
              <Calendar className="w-6 h-6 text-blue-500" />
            </span>
            <span className="tracking-wide">Recent Quizzes</span>
          </CardTitle>
        </CardHeader>
        <CardContent className={fullPledge ? "p-6" : ""}>
          {/* Show existing quizzes if any */}
           <div
    className={`grid gap-4 grid-cols-1 mt-4 sm:grid-cols-2`}
  >
    {quizzes.map((quiz) => (
      <div
        key={quiz.id}
        className={`bg-white border rounded-xl shadow-sm hover:shadow-md transition duration-300 p-6 flex flex-col justify-between`}
      >
        {/* Category + difficulty */}
        <div>
          <div className="flex  gap-2 mb-4">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xl font-semibold ${quiz.color}`}
            >
              {quiz.category}
            </span>
            <span
              className={`rounded-full border py-1 px-2 inline-flex font-medium ${getDifficultyColor(
                quiz.difficulty
              )}`}
            >
              {quiz.difficulty}
            </span>
          </div>
        </div>

        {/* Score */}
        <div className="text-quizDashboard-primary font-bold text-xl mb-2">
          Score: {quiz.userScore} / {quiz.maxQuizScore}
        </div>

        {/* Correct vs Wrong + Time */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
          <div className="flex items-center">
            <Check size={16} className="mr-1 text-green-600" />
            {quiz.correctAnswers}
            <span className="mx-1">/</span>
            <X size={16} className="mr-1 text-red-500" />
            {quiz.totalQuestions - quiz.correctAnswers}
          </div>
          <div className="flex items-center">
            <Timer size={14} className="mr-1" />
            {quiz.timeTaken}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Clock size={12} className="mr-1" />
            {quiz.date}
          </div>
          <div className="flex items-center">
            <Play size={12} className="mr-1" />
            {quiz.time}
          </div>
        </div>
      </div>
    ))}
  </div>

          {/* Empty State Message */}
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {quizzes.length === 0
                ? "No Recent Activity"
                : "Start Your Quiz Journey"}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {quizzes.length === 0
                ? "Take your first quiz to see your recent activity and track your progress here."
                : "You've taken a few quizzes recently. Keep the momentum going and challenge yourself with more!"}
            </p>
            <button onClick={()=>navigate('/startQuiz')} className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all">
              <Play className="w-5 h-5 mr-2" />
              Start New Quiz
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }//is loading, error, or empty state

// If we reach here, it means we have quizzes to display
  return (
    <Card className={`${className || 'shadow-md'} ${fullPledge ? 'h-full w-full' : ''}`}>
      <CardHeader className={`pb-1 border-b ${fullPledge ? 'p-6' : ''}  bg-gradient-to-r from-blue-600 to-indigo-700
rounded-t-lg flex`}>
        <CardTitle className={`font-bold text-white ${fullPledge ? 'text-3xl' : 'text-2xl'} flex items-center gap-3`}>
          <span className="bg-blue-100 rounded-full p-2 flex items-start justify-center shadow-sm">
            <Calendar className="w-6 h-6 text-blue-500" />
          </span>
          <span className="tracking-wide text-white">Recent Quizzes</span>
        </CardTitle>
      </CardHeader>
   <CardContent className={fullPledge ? "p-6" : "p-4"}>
  <div
    className={`grid gap-4 ${
      fullPledge
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2"
    }`}
  >
    {quizzes.map((quiz) => (
      <div
        key={quiz.id}
        className={`bg-white border rounded-xl shadow-sm hover:shadow-md transition duration-300 p-4 flex flex-col justify-between`}
      >
        {/*  Category */}
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${quiz.color}`}
            >
              {quiz.category}
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getDifficultyColor(
                quiz.difficulty
              )}`}
            >
              {quiz.difficulty}
            </span>
          </div>
        </div>

        {/* Score */}
        <div className="text-quizDashboard-primary font-bold text-xl mb-2">
          Score: {quiz.userScore} / {quiz.maxQuizScore}
        </div>

        {/* Correct vs Wrong + Time */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
          <div className="flex items-center">
            <Check size={16} className="mr-1 text-green-600" />
            {quiz.correctAnswers}
            <span className="mx-1">/</span>
            <X size={16} className="mr-1 text-red-500" />
            {quiz.totalQuestions - quiz.correctAnswers}
          </div>
          <div className="flex items-center">
            <Timer size={14} className="mr-1" />
            {quiz.timeTaken}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar size={12} className="mr-1" />
            {quiz.date}
          </div>
          <div className="flex items-center">
            <Play size={12} className="mr-1" />
            {quiz.time}
          </div>
        </div>
      </div>
    ))}
  </div>
</CardContent>

    </Card>
  );
};

export default RecentQuizzes;