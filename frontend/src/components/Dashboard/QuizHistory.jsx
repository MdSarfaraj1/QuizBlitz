import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";

import { cn } from "../../Utills/cn";

const QuizHistory = ({ className }) => {
  const quizHistory = [
    {
      id: 1,
      date: "May 8, 2025",
      totalQuizzes: 3,
      avgScore: 82,
      categories: ["Science", "History"]
    },
    {
      id: 2,
      date: "May 7, 2025",
      totalQuizzes: 5,
      avgScore: 75,
      categories: ["Geography", "Entertainment", "Mathematics"]
    },
    {
      id: 3,
      date: "May 5, 2025",
      totalQuizzes: 2,
      avgScore: 90,
      categories: ["Literature"]
    },
    {
      id: 4,
      date: "May 3, 2025",
      totalQuizzes: 4,
      avgScore: 68,
      categories: ["Science", "History", "Geography"]
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Quiz History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {quizHistory.map((day, index) => (
            <div key={day.id} className="p-4 animate-entry" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{day.date}</p>
                  <p className="text-sm text-muted-foreground">
                    {day.totalQuizzes} {day.totalQuizzes === 1 ? 'quiz' : 'quizzes'}
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn("text-xl font-bold", getScoreColor(day.avgScore))}>
                    {day.avgScore}%
                  </p>
                  <p className="text-xs text-muted-foreground">Avg Score</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {day.categories.map((category, i) => (
                  <div key={i} variant="outline" className="text-xs font-normal">
                    {category}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 text-center border-t">
          <a href="/history" className="text-sm text-quiz-primary hover:underline">
            View Complete History
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizHistory;
