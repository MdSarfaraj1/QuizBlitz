import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";

const QuizCategories = ({ className }) => {
  const categories = [
    {
      id: 1,
      name: "Science",
      icon: "🔬",
      quizCount: 15,
      background: "bg-blue-100"
    },
    {
      id: 2,
      name: "History",
      icon: "🏛️",
      quizCount: 12,
      background: "bg-amber-100"
    },
    {
      id: 3,
      name: "Geography",
      icon: "🌍",
      quizCount: 8,
      background: "bg-green-100"
    },
    {
      id: 4,
      name: "Literature",
      icon: "📚",
      quizCount: 10,
      background: "bg-purple-100"
    },
    {
      id: 5,
      name: "Mathematics",
      icon: "➗",
      quizCount: 14,
      background: "bg-red-100"
    },
    {
      id: 6,
      name: "Entertainment",
      icon: "🎬",
      quizCount: 18,
      background: "bg-pink-100"
    },
  ];

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Quiz Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="flex flex-col items-center justify-center rounded-lg p-4 cursor-pointer transition-transform hover:scale-105 animate-entry"
              style={{ animationDelay: `${category.id * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${category.background}`}>
                <span>{category.icon}</span>
              </div>
              <h3 className="mt-2 font-medium text-center">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.quizCount} Quizzes</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCategories;
