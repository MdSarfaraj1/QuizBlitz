import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { BookOpen, Clock, Star, StarOff } from 'lucide-react';
import { cn } from "../../Utills/cn";

const SavedQuizzes = ({ fullPledge = false }) => {
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
      title: "Advanced Mathematics",
      category: "Mathematics",
      questions: 30,
      timeEstimate: 25,
      favorite: false
    },
    {
      id: 4,
      title: "History: Ancient Civilizations",
      category: "History",
      questions: 25,
      timeEstimate: 20,
      favorite: true
    },
    // Add more quizzes for fullPledge view
    ...(fullPledge ? [
      {
        id: 5,
        title: "Programming Fundamentals",
        category: "Technology",
        questions: 40,
        timeEstimate: 35,
        favorite: false
      },
      {
        id: 6,
        title: "Art History Renaissance",
        category: "Arts",
        questions: 18,
        timeEstimate: 14,
        favorite: true
      },
      {
        id: 7,
        title: "Biology: Human Anatomy",
        category: "Science",
        questions: 22,
        timeEstimate: 18,
        favorite: false
      },
      {
        id: 8,
        title: "Literature Classics",
        category: "Literature",
        questions: 28,
        timeEstimate: 22,
        favorite: true
      }
    ] : [])
  ]);

  const toggleFavorite = (id) => {
    setSavedQuizzes(savedQuizzes.map(quiz =>
      quiz.id === id ? { ...quiz, favorite: !quiz.favorite } : quiz
    ));
  };

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
                fullPledge ? "p-6 h-full min-h-[220px] flex flex-col" : "p-4"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={cn(
                    "font-semibold text-gray-800",
                    fullPledge ? "text-xl mb-2" : "text-lg"
                  )}>
                    {quiz.title}
                  </h3>
                  <p className={cn(
                    "text-gray-500 mt-1",
                    fullPledge ? "text-base" : "text-sm"
                  )}>
                    {quiz.category}
                  </p>
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
                "flex items-center text-gray-500 mt-4",
                fullPledge ? "text-base flex-col items-start space-y-2" : "text-sm"
              )}>
                <div className="flex items-center">
                  <BookOpen size={fullPledge ? 18 : 16} className="mr-1" />
                  <span>{quiz.questions} questions</span>
                </div>
                <div className={cn(
                  "flex items-center",
                  fullPledge ? "" : "ml-4"
                )}>
                  <Clock size={fullPledge ? 18 : 16} className="mr-1" />
                  <span>~{quiz.timeEstimate} mins</span>
                </div>
              </div>

              <div className={cn(
                "flex justify-end",
                fullPledge ? "mt-auto pt-4" : "mt-5"
              )}>
                <button className={cn(
                  "font-medium text-white bg-gradient-to-r from-purple-500 to-purple-700 rounded-md hover:from-purple-600 hover:to-purple-800 transition-all",
                  fullPledge ? "px-4 py-2 text-base" : "px-3 py-1 text-sm"
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