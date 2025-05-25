import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";

import { Check, X, Clock } from 'lucide-react';

const RecentQuizzes = ({ className }) => {
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
      title: "Movie Trivia",
      category: "Entertainment",
      score: 60,
      totalQuestions: 20,
      correctAnswers: 12,
      date: "3 days ago",
      time: "09:15",
      color: "bg-purple-100 text-purple-800"
    }
  ];

  return (
    <Card className={` ${className || 'shadow-md'}`}>
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-2xl font-bold text-gray-800">Recent Quizzes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 flex flex-wrap justify-between p-4">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="quiz-card  "
              style={{ animationDelay: `${quiz.id * 100}ms` }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold opacity-80">{quiz.title}</h3>
                  <div
                    variant="outline"
                    className={`mt-1 text-xs  inline-flex rounded-full border px-2.5 py-0.5 font-semibold ] ${quiz.color}`}
                  >
                    {quiz.category}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-quizDashboard-primary">
                    {quiz.score}%
                  </div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
              </div>

              <div className="flex items-center mt-4 text-sm">
                <div className="flex items-center text-green-600">
                  <Check size={16} className="mr-1" />
                  <span>{quiz.correctAnswers}</span>
                </div>
                <span className="mx-2 text-muted-foreground">/</span>
                <div className="flex items-center text-red-500">
                  <X size={16} className="mr-1" />
                  <span>{quiz.totalQuestions - quiz.correctAnswers}</span>
                </div>
                <div className="ml-4 flex items-center text-muted-foreground">
                  <Clock size={14} className="mr-1 " />
                  <span>{quiz.date}, {quiz.time}</span>
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
