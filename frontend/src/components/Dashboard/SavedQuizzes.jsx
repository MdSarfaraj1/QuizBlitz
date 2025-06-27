import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { BookOpen,  Bookmark, Clock, Play, Loader2, AlertCircle, User2, Trophy, Trash } from 'lucide-react';
import { cn } from "../../Utills/cn";
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const SavedQuizzes = ({ fullPledge = false }) => {
  const [savedQuizzes, setSavedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetchSavedQuizzes();
  }, []);

  const fetchSavedQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/userSavedQuiz`, {withCredentials: true});
      console.log("Response from backend:", response);
      if (response.status == 200) {
        setSavedQuizzes(response.data.savedQuizzes);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch saved quizzes');
      console.error('Error fetching saved quizzes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/startPredefinedQuiz/${id}`, { withCredentials: true });

      if (response.status === 200) {
        const quizData = response.data
        console.log("Quiz data:", quizData);
        navigate('/runQuiz', { state: { quizData } });
      }
    } catch (error) {
      console.error("Error starting quiz:", error);
    }
  }

  const handleDeleteQuiz = async (id) => {
    try {
      let remainIds=savedQuizzes.filter((quiz) => quiz.id !== id).map((quiz) => quiz.id);
      try{
        await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/saveUnsaveQuiz`,{quizIds:remainIds} ,{ withCredentials: true });
      setSavedQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
      }
      catch(err){
        console.error("Error updating saved quizzes:", err);
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      // Optionally, setError("Failed to delete quiz");
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'medium': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'hard': return 'text-rose-700 bg-rose-50 border-rose-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-rose-600';
  };

  // Loading state
  if (loading) {
    return (
      <Card className={cn(
        "border-0 shadow-lg bg-gradient-to-br from-white to-slate-50",
        fullPledge ? "h-full w-full" : ""
      )}>
        <CardHeader className={cn(
          "pb-6 border-b  from-lime-400 to-emerald-500 rounded-t-lg bg-gradient-to-r border-slate-100",
          fullPledge ? "p-8" : "p-6"
        )}>
          <CardTitle className={cn(
            "font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent",
            fullPledge ? "text-4xl" : "text-3xl"
          )}>
                 
           <span className="bg-sky-200 rounded-full p-2 mr-2  shadow-sm">
            <Bookmark className="inline-block  w-7 h-7 text-sky-600" />
          </span>
            Saved Quizzes
          </CardTitle>
        </CardHeader>
        <CardContent className={cn(
          "pt-8 flex items-center justify-center",
          fullPledge ? "p-8 pt-8 h-96" : "h-48"
        )}>
          <div className="flex flex-col items-center space-y-4 text-slate-600">
            <div className="relative">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
              <div className="absolute inset-0 h-8 w-8 animate-ping rounded-full bg-purple-400 opacity-20"></div>
            </div>
            <span className="text-lg font-medium">Loading your saved quizzes...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className={cn(
        "border-0 shadow-lg ",
        fullPledge ? "h-full w-full" : "h-full"
      )}>
        <CardHeader className={cn(
          "pb-6 border-b  from-lime-400 to-emerald-500 rounded-t-lg bg-gradient-to-r border-red-100",
          fullPledge ? "p-8" : "p-6"
        )}>
          <CardTitle className={cn(
            "font-bold text-slate-800",
            fullPledge ? "text-4xl" : "text-3xl"
          )}>
                 
           <span className="bg-sky-200 rounded-full p-2 mr-2  shadow-sm">
            <Bookmark className="inline-block  w-7 h-7 text-sky-600" />
          </span>
            Saved Quizzes
          </CardTitle>
        </CardHeader>
        <CardContent className={cn(
          "pt-8 flex items-center justify-center",
          fullPledge ? "p-8 pt-8 h-96" : "h-72"
        )}>
          <div className="text-center max-w-md">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Something went wrong</h3>
            <p className="text-slate-600 mb-6">{error}</p>
            <button 
              onClick={fetchSavedQuizzes}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Empty state
  if (savedQuizzes.length === 0) {
    return (
      <Card className={cn(
        "border-0 shadow-lg bg-gradient-to-br from-white to-purple-50",
        fullPledge ? "h-full w-full" : ""
      )}>
        <CardHeader className={cn(
          "pb-6 border-b  from-lime-400 to-emerald-500 rounded-t-lg bg-gradient-to-r border-purple-100",
          fullPledge ? "p-8" : "p-6"
        )}>
          <CardTitle className={cn(
            "font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent",
            fullPledge ? "text-4xl" : "text-3xl"
          )}>
                 
           <span className="bg-sky-200 rounded-full p-2 mr-2  shadow-sm">
            <Bookmark className="inline-block  w-7 h-7 text-sky-600" />
          </span>
            Saved Quizzes
          </CardTitle>
        </CardHeader>
        <CardContent className={cn(
          "pt-8",
          fullPledge ? "p-8 pt-8" : "p-6 pt-8"
        )}>
          <div className="text-center py-16">
            <div className="relative mx-auto w-32 h-32 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              No Saved Quizzes Yet
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg leading-relaxed">
              Start exploring quizzes and save your favorites to build your personal collection of knowledge.
            </p>
            <button 
              onClick={() => navigate('/exploreQuizzes')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5 mr-3" />
              Explore Quizzes
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Main content with saved quizzes
  return (
    <Card className={cn(
      "border-0 shadow-lg bg-gradient-to-br from-white to-slate-50",
      fullPledge ? "h-full w-full" : ""
    )}>
      <CardHeader className={cn(
        "pb-6 border-b from-lime-400 to-emerald-500 rounded-t-lg bg-gradient-to-r border-slate-100",
        fullPledge ? "p-8" : "p-4"
      )}>
        <div className="flex items-center justify-between">
          <CardTitle className={cn(
            "font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600",
    fullPledge ? "text-4xl" : "text-3xl"
          )}>
           
           <span className="bg-sky-200 rounded-full p-2 mr-2  shadow-sm">
            <Bookmark className="inline-block  w-7 h-7 text-sky-600" />
          </span>
              Saved Quizzes
          </CardTitle>
          <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full">
            <Trophy className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700 font-semibold">{savedQuizzes.length}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className={cn(
        fullPledge ? "p-8 pt-8 h-full overflow-auto" : "p-6 pt-8  overflow-auto"
      )}>
        <div className={cn(
          "grid gap-4",
          fullPledge 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" 
            : "grid-cols-1 sm:grid-cols-2 "
        )}>
         {(fullPledge ? savedQuizzes : savedQuizzes.slice(0, 4)).map((quiz, index) => (
            <div
              key={quiz.id}
              className={cn(
                "group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 overflow-hidden",
                fullPledge ? "min-h-[320px]" : "h-76 w-64"
              )}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Quiz Header */}
              <div className="p-6 pb-2">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-bold text-slate-800 leading-tight group-hover:text-purple-700 transition-colors",
                      fullPledge ? "text-xl mb-3" : "text-lg mb-2"
                    )}>
                      {quiz.title}
                    </h3>
                    {fullPledge && (
                      <p className="text-slate-600 leading-relaxed mb-3">
                        {quiz.description}
                      </p>
                    )}
                  </div>
                  {/* Delete Icon */}
                  <button
                    onClick={() => handleDeleteQuiz(quiz.id)}
                    className="ml-2 p-1 rounded-full hover:bg-red-100 transition"
                    title="Delete Quiz"
                  >
                    <Trash className="w-5 h-5 text-red-500" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className={cn(
                    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border",
                    getDifficultyColor(quiz.difficulty)
                  )}>
                    {quiz.difficulty?.charAt(0).toUpperCase() + quiz.difficulty?.slice(1)}
                  </span>
                </div>
              </div>

              {/* Quiz Stats */}
              <div className="px-6 pb-4">
                <div className={cn(
                  "space-y-3",
                  fullPledge ? "text-base" : "text-sm"
                )}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-slate-600">
                      <BookOpen size={fullPledge ? 18 : 16} className="mr-3 text-purple-500" />
                      <span className="font-medium">{quiz.questions} questions  </span>
                    </div>
                    <div className="flex items-center text-slate-600 ml-0.5">
                      <Clock size={fullPledge ? 18 : 16} className="mr-2 text-indigo-500" />
                      <span className="font-medium">~{quiz.duration} mins</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-slate-600">
                    <User2 size={fullPledge ? 18 : 16} className="mr-3 text-emerald-500" />
                    <span className="font-medium">{quiz.participants} participants</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6">
                <button 
                  className={cn(
                    "w-full font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg group-hover:shadow-xl",
                    fullPledge ? "px-6 py-3 text-base" : "px-4 py-3 text-sm"
                  )}
                  onClick={() => handleStartQuiz(quiz.id)}
                >
                  <div className="flex items-center justify-center">
                    <Play className="w-4 h-4 mr-2" />
                    Start Quiz
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* {!fullPledge && savedQuizzes.length > 0 && (
          <div className="pt-8 text-center">
            <button 
              onClick={() => navigate('/saved')}
              className="inline-flex items-center px-6 py-3 text-purple-600 border-2 border-purple-200 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all font-medium"
            >
              View All Saved Quizzes
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )} */}
      </CardContent>
      
  
    </Card>
  );
};

export default SavedQuizzes;