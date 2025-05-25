import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { BookOpen, Clock, Star, StarOff } from 'lucide-react';

const SavedQuizzes = () => {
  const [savedQuizzes, setSavedQuizzes] = useState([
    {
      id: 1,
      title: "World Geography",
      category: "Geography",
      questions: 20,
      timeEstimate: 15,
      favorite: true
    },
    {
      id: 2,
      title: "Science: Chemistry Basics",
      category: "Science",
      questions: 15,
      timeEstimate: 12,
      favorite: false
    },
    {
      id: 3,
      title: "Science: Chemistry Basics",
      category: "Science",
      questions: 15,
      timeEstimate: 12,
      favorite: false
    },
    {
      id: 4,
      title: "History: Ancient Civiliza",
      category: "History",
      questions: 25,
      timeEstimate: 20,
      favorite: true
    }
  ]);

  const toggleFavorite = (id) => {
    setSavedQuizzes(savedQuizzes.map(quiz =>
      quiz.id === id ? { ...quiz, favorite: !quiz.favorite } : quiz
    ));
  };

  return (
    <Card className={"shadow-md rounded-xl"}>
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-2xl font-bold text-gray-800">Saved Quizzes</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedQuizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300 ease-in-out"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{quiz.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{quiz.category}</p>
                </div>
                <button
                  className="h-8 w-8 p-1 rounded-full hover:bg-gray-100"
                  onClick={() => toggleFavorite(quiz.id)}
                >
                  {quiz.favorite ? (
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ) : (
                    <StarOff className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="flex items-center mt-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <BookOpen size={16} className="mr-1" />
                  <span>{quiz.questions} questions</span>
                </div>
                <div className="flex items-center ml-4">
                  <Clock size={16} className="mr-1" />
                  <span>~{quiz.timeEstimate} mins</span>
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                 <button className="px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-purple-700 rounded-md hover:from-purple-600 hover:to-purple-800 transition-all">
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 text-center">
          <a href="/saved" className="text-sm text-quizDashboard-primary hover:underline">
            View All Saved Quizzes
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedQuizzes;
