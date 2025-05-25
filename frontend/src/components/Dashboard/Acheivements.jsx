import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { Award, Star, TrendingUp, Zap, Target } from 'lucide-react';
import { cn } from "../../Utills/cn";


const Achievements = ({ className }) => {
  const achievements = [
    {
      id: 1,
      title: "Quick Thinker",
      description: "Complete 5 quizzes in under 3 minutes each",
      icon: Zap, // Using the imported Lucide icon component directly
      unlocked: true,
      progress: 100
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Get 100% on any quiz",
      icon: Star,
      unlocked: true,
      progress: 100
    },
    {
      id: 3,
      title: "Quiz Streak",
      description: "Complete a quiz every day for 7 days",
      icon: TrendingUp,
      unlocked: true,
      progress: 100
    },
    {
      id: 4,
      title: "Master of All",
      description: "Complete a quiz in each category",
      icon: Award,
      unlocked: false,
      progress: 66
    },
 
  ];

  return (
    <Card className={className}>
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-xl font-bold text-gray-800">Achievements & Badges</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center p-3 rounded-lg bg-quizDashboard-soft-bg animate-entry"
             
            >
              <div
                className={cn(
                "achievement-badge",
                achievement.unlocked ? "bg-quizDashboard-primary text-white" : "bg-gray-100 text-gray-400"
              )} >
                <achievement.icon size={20} />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center">
                  <h3 className="font-semibold opacity-85">{achievement.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{achievement.description}</p>
                {!achievement.unlocked && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div
                      className="bg-quizDashboard-primary h-1.5 rounded-full"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Achievements;