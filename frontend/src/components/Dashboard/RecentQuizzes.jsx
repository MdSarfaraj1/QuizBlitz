import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { Check, X, Clock } from 'lucide-react';

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
      color: "bg-green-100 text-green-800"
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
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 3,
      title: "Mathematics Test",
      category: "Mathematics",
      score: 92,
      totalQuestions: 12,
      correctAnswers: 11,
      date: "2 days ago",
      time: "11:20",
      color: "bg-orange-100 text-orange-800"
    },
    {
      id: 4,
      title: "Movie Trivia",
      category: "Entertainment",
      score: 60,
      totalQuestions: 20,
      correctAnswers: 12,
      date: "3 days ago",
      time: "09:15",
      color: "bg-purple-100 text-purple-800"
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
        color: "bg-red-100 text-red-800"
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
        color: "bg-indigo-100 text-indigo-800"
      }
    ] : [])
  ];

  return (
    <Card className={`${className || 'shadow-md'} ${fullPledge ? 'h-full w-full' : ''}`}>
      <CardHeader className={`pb-2 border-b ${fullPledge ? 'p-6' : ''}`}>
        <CardTitle className={`font-bold text-gray-800 ${fullPledge ? 'text-3xl' : 'text-2xl'}`}>
          Recent Quizzes
        </CardTitle>
      </CardHeader>
      <CardContent className={fullPledge ? 'p-6 h-full overflow-auto' : ''}>
        {/* Fixed: Use proper grid instead of flex with justify-between */}
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
                ${fullPledge ? 'p-6 min-h-[180px]' : 'p-4'}
              `}
              style={{ animationDelay: `${quiz.id * 100}ms` }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className={`font-semibold opacity-80 ${fullPledge ? 'text-lg mb-2' : ''}`}>
                    {quiz.title}
                  </h3>
                  <div className={`
                    mt-1 inline-flex rounded-full border px-2.5 py-0.5 font-semibold
                    ${fullPledge ? 'text-sm' : 'text-xs'} ${quiz.color}
                  `}>
                    {quiz.category}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className={`font-bold text-quizDashboard-primary ${fullPledge ? 'text-3xl' : 'text-2xl'}`}>
                    {quiz.score}%
                  </div>
                  <div className={`text-muted-foreground ${fullPledge ? 'text-sm' : 'text-xs'}`}>
                    Score
                  </div>
                </div>
              </div>

              <div className={`flex items-center mt-4 ${fullPledge ? 'text-base' : 'text-sm'}`}>
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
                  <Clock size={fullPledge ? 16 : 14} className="mr-1" />
                  <span className={fullPledge ? 'text-sm' : 'text-xs'}>
                    {quiz.date}, {quiz.time}
                  </span>
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