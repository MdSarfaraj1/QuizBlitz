import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { BookOpen, Clock, Star, StarOff, Play, Trophy, Calendar } from 'lucide-react';
import { cn } from "../../Utills/cn";

const SavedQuizzes = ({ fullPledge = false }) => {
  const [savedQuizzes, setSavedQuizzes] = useState([
    {
      id: 1,
      title: "World Geography",
      category: "Geography",
      questions: 20,
      timeEstimate: 15,
      favorite: true,
      difficulty: "Medium",
      lastPlayed: "2 days ago",
      bestScore: 85
    },
    {
      id: 2,
      title: "Science: Chemistry Basics",
      category: "Science",
      questions: 15,
      timeEstimate: 12,
      favorite: false,
      difficulty: "Easy",
      lastPlayed: "1 week ago",
      bestScore: 92
    },
    {
      id: 3,
      title: "Advanced Mathematics",
      category: "Mathematics",
      questions: 30,
      timeEstimate: 25,
      favorite: false,
      difficulty: "Hard",
      lastPlayed: "3 days ago",
      bestScore: 78
    },
    {
      id: 4,
      title: "History: Ancient Civilizations",
      category: "History",
      questions: 25,
      timeEstimate: 20,
      favorite: true,
      difficulty: "Medium",
      lastPlayed: "5 days ago",
      bestScore: 88
    },
    // Add more quizzes for fullPledge view
    ...(fullPledge ? [
      {
        id: 5,
        title: "Programming Fundamentals",
        category: "Technology",
        questions: 40,
        timeEstimate: 35,
        favorite: false,
        difficulty: "Medium",
        lastPlayed: "1 day ago",
        bestScore: 95
      },
      {
        id: 6,
        title: "Art History Renaissance",
        category: "Arts",
        questions: 18,
        timeEstimate: 14,
        favorite: true,
        difficulty: "Easy",
        lastPlayed: "4 days ago",
        bestScore: 82
      },
      {
        id: 7,
        title: "Biology: Human Anatomy",
        category: "Science",
        questions: 22,
        timeEstimate: 18,
        favorite: false,
        difficulty: "Hard",
        lastPlayed: "6 days ago",
        bestScore: 76
      },
      {
        id: 8,
        title: "Literature Classics",
        category: "Literature",
        questions: 28,
        timeEstimate: 22,
        favorite: true,
        difficulty: "Medium",
        lastPlayed: "2 days ago",
        bestScore: 90
      },
      {
        id: 9,
        title: "Physics: Quantum Mechanics",
        category: "Science",
        questions: 35,
        timeEstimate: 30,
        favorite: false,
        difficulty: "Hard",
        lastPlayed: "1 week ago",
        bestScore: 72
      },
      {
        id: 10,
        title: "World Languages Basics",
        category: "Languages",
        questions: 24,
        timeEstimate: 18,
        favorite: true,
        difficulty: "Easy",
        lastPlayed: "3 days ago",
        bestScore: 87
      }
    ] : [])
  ]);

  const toggleFavorite = (id) => {
    setSavedQuizzes(savedQuizzes.map(quiz =>
      quiz.id === id ? { ...quiz, favorite: !quiz.favorite } : quiz
    ));
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Check if we should show the empty state
  const shouldShowEmptyState = savedQuizzes.length <= 2;

  if (shouldShowEmptyState) {
    return (
      <Card className={cn(
        "shadow-md rounded-xl",
        fullPledge ? "h-full w-full" : ""
      )}>
        <CardHeader className={cn(
          "pb-3 border-b",
          fullPledge ? "p-6" : ""
        )}>
          <CardTitle className={cn(
            "font-bold text-gray-800",
            fullPledge ? "text-3xl" : "text-2xl"
          )}>
            Saved Quizzes
          </CardTitle>
        </CardHeader>
        <CardContent className={cn(
          "pt-4",
          fullPledge ? "p-6 pt-6" : ""
        )}>
          {/* Show existing quizzes if any */}
          {savedQuizzes.length > 0 && (
            <div className={cn(
              "grid gap-4 mb-8",
              fullPledge 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1 sm:grid-cols-2"
            )}>
              {savedQuizzes.map((quiz, index) => (
                <div
                  key={quiz.id}
                  className={cn(
                    "bg-white border rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out",
                    fullPledge ? "p-6 h-full min-h-[280px] flex flex-col" : "p-4 min-h-[240px] flex flex-col"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className={cn(
                        "font-semibold text-gray-800",
                        fullPledge ? "text-xl mb-2" : "text-lg mb-1"
                      )}>
                        {quiz.title}
                      </h3>
                      <p className={cn(
                        "text-gray-500",
                        fullPledge ? "text-base" : "text-sm"
                      )}>
                        {quiz.category}
                      </p>
                      <span className={cn(
                        "inline-block px-2 py-1 rounded-full text-xs font-medium mt-2",
                        getDifficultyColor(quiz.difficulty)
                      )}>
                        {quiz.difficulty}
                      </span>
                    </div>
                    <button
                      className={cn(
                        "p-1 rounded-full hover:bg-gray-100",
                        fullPledge ? "h-10 w-10" : "h-8 w-8"
                      )}
                      onClick={() => toggleFavorite(quiz.id)}
                    >
                      {quiz.favorite ? (
                        <Star className={cn(
                          "text-yellow-500 fill-yellow-500",
                          fullPledge ? "h-6 w-6" : "h-5 w-5"
                        )} />
                      ) : (
                        <StarOff className={cn(
                          "text-gray-400",
                          fullPledge ? "h-6 w-6" : "h-5 w-5"
                        )} />
                      )}
                    </button>
                  </div>

                  <div className={cn(
                    "flex-1 space-y-2",
                    fullPledge ? "text-base" : "text-sm"
                  )}>
                    <div className="flex items-center text-gray-500">
                      <BookOpen size={fullPledge ? 18 : 16} className="mr-2" />
                      <span>{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock size={fullPledge ? 18 : 16} className="mr-2" />
                      <span>~{quiz.timeEstimate} mins</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Calendar size={fullPledge ? 18 : 16} className="mr-2" />
                      <span>Last played: {quiz.lastPlayed}</span>
                    </div>
                    <div className="flex items-center">
                      <Trophy size={fullPledge ? 18 : 16} className="mr-2 text-yellow-500" />
                      <span className={cn("font-medium", getScoreColor(quiz.bestScore))}>
                        Best: {quiz.bestScore}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button className={cn(
                      "font-medium text-white bg-gradient-to-r from-purple-500 to-purple-700 rounded-md hover:from-purple-600 hover:to-purple-800 transition-all",
                      fullPledge ? "px-4 py-2 text-base" : "px-3 py-2 text-sm"
                    )}>
                      Start Quiz
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State Message */}
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {savedQuizzes.length === 0 ? "No Saved Quizzes Yet" : "Build Your Quiz Collection"}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {savedQuizzes.length === 0 
                ? "Start exploring quizzes and save your favorites to build your personal collection."
                : "You have a few quizzes saved. Discover more interesting quizzes to expand your collection."
              }
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all">
              <Play className="w-5 h-5 mr-2" />
              Play More Quizzes
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "shadow-md rounded-xl",
      fullPledge ? "h-full w-full" : ""
    )}>
      <CardHeader className={cn(
        "pb-3 border-b",
        fullPledge ? "p-6" : ""
      )}>
        <CardTitle className={cn(
          "font-bold text-gray-800",
          fullPledge ? "text-3xl" : "text-2xl"
        )}>
          Saved Quizzes
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(
        "pt-4",
        fullPledge ? "p-6 pt-6 h-full overflow-auto" : ""
      )}>
        <div className={cn(
          "grid gap-4",
          fullPledge 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1 sm:grid-cols-2"
        )}>
          {savedQuizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className={cn(
                "bg-white border rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out",
                fullPledge ? "p-6 h-full min-h-[280px] flex flex-col" : "p-4 min-h-[240px] flex flex-col"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className={cn(
                    "font-semibold text-gray-800",
                    fullPledge ? "text-xl mb-2" : "text-lg mb-1"
                  )}>
                    {quiz.title}
                  </h3>
                  <span className={`${!fullPledge?"flex justify-between":""}`}>
                      <p className={cn(
                    "text-gray-500",
                    fullPledge ? "text-base" : "text-sm"
                  )}>
                    {quiz.category}
                  </p>
                  <span className={cn(
                    "inline-block px-2 py-1 rounded-full text-xs font-medium mt-2",
                    getDifficultyColor(quiz.difficulty)
                  )}>
                    {quiz.difficulty}
                  </span>
                  </span>
                
                </div>
                <button
                  className={cn(
                    "p-1 rounded-full hover:bg-gray-100",
                    fullPledge ? "h-10 w-10" : "h-8 w-8"
                  )}
                  onClick={() => toggleFavorite(quiz.id)}
                >
                  {quiz.favorite ? (
                    <Star className={cn(
                      "text-yellow-500 fill-yellow-500",
                      fullPledge ? "h-6 w-6" : "h-5 w-5"
                    )} />
                  ) : (
                    <StarOff className={cn(
                      "text-gray-400",
                      fullPledge ? "h-6 w-6" : "h-5 w-5"
                    )} />
                  )}
                </button>
              </div>

              <div className={cn(
                "flex-1 space-y-2",
                fullPledge ? "text-base" : "text-sm"
              )}>
            <span className={`${!fullPledge?"flex justify-between":""}`}>
                  <div className="flex items-center text-gray-500">
                  <BookOpen size={fullPledge ? 18 : 16} className="mr-2" />
                  <span>{quiz.questions} questions</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock size={fullPledge ? 18 : 16} className="mr-2" />
                  <span>~{quiz.timeEstimate} mins</span>
                </div>
                </span>
                
                
                <div className="flex items-center text-gray-500">
                  <Calendar size={fullPledge ? 18 : 16} className="mr-2" />
                  <span>Last played: {quiz.lastPlayed}</span>
                </div>
                <div className="flex items-center">
                  <Trophy size={fullPledge ? 18 : 16} className="mr-2 text-yellow-500" />
                  <span className={cn("font-medium", getScoreColor(quiz.bestScore))}>
                    Best: {quiz.bestScore}%
                  </span>
                </div>
              </div>

              <div className="flex justify-end ">
                <button className={cn(
                  "font-medium text-white bg-gradient-to-r from-purple-500 to-purple-700 rounded-md hover:from-purple-600 hover:to-purple-800 transition-all",
                  fullPledge ? "px-4 py-2 text-base" : "px-3 py-2 text-sm"
                )}>
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>

        {!fullPledge && (
          <div className="pt-4 text-center">
            <a href="/saved" className="text-sm text-quizDashboard-primary hover:underline">
              View All Saved Quizzes
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedQuizzes;