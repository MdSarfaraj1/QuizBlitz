import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { Check, X, Clock, Trophy, Timer, Target, Play, Activity } from 'lucide-react';

const RecentQuizzes = ({ className, fullPledge = false }) => {
  const quizzes = [
    {
      id: 1,
      title: "World Geography",
      category: "Geography",
      score: 85,
      totalQuestions: 10,
      correctAnswers: 9,
      date: "Today",
      time: "14:30",
      color: "bg-green-100 text-green-800",
      difficulty: "Medium",
      timeTaken: "8m 30s",
      streak: 3,
      rank: "A"
    },
    {
      id: 2,
      title: "Science Quiz",
      category: "Science",
      score: 70,
      totalQuestions: 15,
      correctAnswers: 11,
      date: "Yesterday",
      time: "16:45",
      color: "bg-blue-100 text-blue-800",
      difficulty: "Hard",
      timeTaken: "12m 45s",
      streak: 1,
      rank: "B"
    },
   
    // Add more for fullPledge mode
    ...(fullPledge ? [
      {
        id: 5,
        title: "History: Ancient Rome",
        category: "History",
        score: 88,
        totalQuestions: 16,
        correctAnswers: 14,
        date: "4 days ago",
        time: "15:30",
        color: "bg-red-100 text-red-800",
        difficulty: "Hard",
        timeTaken: "11m 50s",
        streak: 2,
        rank: "A"
      },
      {
        id: 6,
        title: "Programming Basics",
        category: "Technology",
        score: 95,
        totalQuestions: 18,
        correctAnswers: 17,
        date: "5 days ago",
        time: "13:45",
        color: "bg-indigo-100 text-indigo-800",
        difficulty: "Medium",
        timeTaken: "9m 30s",
        streak: 4,
        rank: "A+"
      },
      {
        id: 7,
        title: "Literature Classics",
        category: "Literature",
        score: 78,
        totalQuestions: 14,
        correctAnswers: 11,
        date: "6 days ago",
        time: "10:15",
        color: "bg-pink-100 text-pink-800",
        difficulty: "Medium",
        timeTaken: "10m 45s",
        streak: 1,
        rank: "B+"
      },
      {
        id: 8,
        title: "Art & Culture",
        category: "Arts",
        score: 83,
        totalQuestions: 13,
        correctAnswers: 11,
        date: "1 week ago",
        time: "14:20",
        color: "bg-teal-100 text-teal-800",
        difficulty: "Easy",
        timeTaken: "7m 15s",
        streak: 2,
        rank: "A-"
      }
    ] : [])
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRankColor = (rank) => {
    if (rank.includes('A')) return 'text-green-600 bg-green-50';
    if (rank.includes('B')) return 'text-blue-600 bg-blue-50';
    if (rank.includes('C')) return 'text-orange-600 bg-orange-50';
    return 'text-gray-600 bg-gray-50';
  };

  // Check if we should show the empty state
  const shouldShowEmptyState = quizzes.length <= 2;

  if (shouldShowEmptyState) {
    return (
      <Card className={`${className || 'shadow-md'} ${fullPledge ? 'h-full w-full' : ''}`}>
        <CardHeader className={`pb-2 border-b ${fullPledge ? 'p-6' : ''}`}>
          <CardTitle className={`font-bold text-gray-800 ${fullPledge ? 'text-3xl' : 'text-2xl'}`}>
            Recent Quizzes
          </CardTitle>
        </CardHeader>
        <CardContent className={fullPledge ? 'p-6' : ''}>
          {/* Show existing quizzes if any */}
          {quizzes.length > 0 && (
            <div className={`
              ${fullPledge 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 mb-8' 
                : 'grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 mb-8'
              }
            `}>
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className={`
                    bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out
                    ${fullPledge ? 'p-6 min-h-[240px] flex flex-col' : 'p-4 min-h-[220px] flex flex-col'}
                  `}
                  style={{ animationDelay: `${quiz.id * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className={`font-semibold text-gray-800 ${fullPledge ? 'text-lg mb-2' : 'mb-1'}`}>
                        {quiz.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className={`
                          inline-flex rounded-full border px-2.5 py-0.5 font-semibold
                          ${fullPledge ? 'text-sm' : 'text-xs'} ${quiz.color}
                        `}>
                          {quiz.category}
                        </div>
                        <div className={`
                          inline-flex rounded-full border px-2 py-0.5 font-medium text-xs
                          ${getDifficultyColor(quiz.difficulty)}
                        `}>
                          {quiz.difficulty}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className={`font-bold text-quizDashboard-primary ${fullPledge ? 'text-3xl' : 'text-2xl'}`}>
                        {quiz.score}%
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getRankColor(quiz.rank)}`}>
                        {quiz.rank}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className={`flex items-center ${fullPledge ? 'text-base' : 'text-sm'}`}>
                      <div className="flex items-center text-green-600">
                        <Check size={fullPledge ? 18 : 16} className="mr-1" />
                        <span>{quiz.correctAnswers}</span>
                      </div>
                      <span className="mx-2 text-muted-foreground">/</span>
                      <div className="flex items-center text-red-500">
                        <X size={fullPledge ? 18 : 16} className="mr-1" />
                        <span>{quiz.totalQuestions - quiz.correctAnswers}</span>
                      </div>
                      <div className="ml-4 flex items-center text-muted-foreground">
                        <Timer size={fullPledge ? 16 : 14} className="mr-1" />
                        <span className={fullPledge ? 'text-sm' : 'text-xs'}>
                          {quiz.timeTaken}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span className="text-xs">
                          {quiz.date}, {quiz.time}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Target size={14} className="mr-1 text-purple-500" />
                        <span className="text-xs">
                          Streak: {quiz.streak}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State Message */}
          <div className="text-center py-12">
          
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {quizzes.length === 0 ? "No Recent Activity" : "Start Your Quiz Journey"}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {quizzes.length === 0 
                ? "Take your first quiz to see your recent activity and track your progress here."
                : "You've taken a few quizzes recently. Keep the momentum going and challenge yourself with more!"
              }
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all">
              <Play className="w-5 h-5 mr-2" />
              Start New Quiz
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className || 'shadow-md'} ${fullPledge ? 'h-full w-full' : ''}`}>
      <CardHeader className={`pb-2 border-b ${fullPledge ? 'p-6' : ''}`}>
        <CardTitle className={`font-bold text-gray-800 ${fullPledge ? 'text-3xl' : 'text-2xl'}`}>
          Recent Quizzes
        </CardTitle>
      </CardHeader>
      <CardContent className={fullPledge ? 'p-6 h-full overflow-auto' : ''}>
        <div className={`
          ${fullPledge 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4' 
            : 'grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4'
          }
        `}>
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className={`
                bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out
                ${fullPledge ? 'p-6 min-h-[240px] flex flex-col' : 'p-4 min-h-[220px] flex flex-col'}
              `}
              style={{ animationDelay: `${quiz.id * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className={`font-semibold text-gray-800 ${fullPledge ? 'text-lg mb-2' : 'mb-1'}`}>
                    {quiz.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className={`
                      inline-flex rounded-full border px-2.5 py-0.5 font-semibold
                      ${fullPledge ? 'text-sm' : 'text-xs'} ${quiz.color}
                    `}>
                      {quiz.category}
                    </div>
                    <div className={`
                      inline-flex rounded-full border px-2 py-0.5 font-medium text-xs
                      ${getDifficultyColor(quiz.difficulty)}
                    `}>
                      {quiz.difficulty}
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className={`font-bold text-quizDashboard-primary ${fullPledge ? 'text-3xl' : 'text-2xl'}`}>
                    {quiz.score}%
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getRankColor(quiz.rank)}`}>
                    {quiz.rank}
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className={`flex items-center ${fullPledge ? 'text-base' : 'text-sm'}`}>
                  <div className="flex items-center text-green-600">
                    <Check size={fullPledge ? 18 : 16} className="mr-1" />
                    <span>{quiz.correctAnswers}</span>
                  </div>
                  <span className="mx-2 text-muted-foreground">/</span>
                  <div className="flex items-center text-red-500">
                    <X size={fullPledge ? 18 : 16} className="mr-1" />
                    <span>{quiz.totalQuestions - quiz.correctAnswers}</span>
                  </div>
                  <div className="ml-4 flex items-center text-muted-foreground">
                    <Timer size={fullPledge ? 16 : 14} className="mr-1" />
                    <span className={fullPledge ? 'text-sm' : 'text-xs'}>
                      {quiz.timeTaken}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span className="text-xs">
                      {quiz.date}, {quiz.time}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Target size={14} className="mr-1 text-purple-500" />
                    <span className="text-xs">
                      Streak: {quiz.streak}
                    </span>
                  </div>
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