import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { Award, Star, TrendingUp, Zap, Target } from 'lucide-react';
import { cn } from "../../Utills/cn";

const Achievements = ({ className, fullPledge = false }) => {
  const achievements = [
    {
      id: 1,
      title: "Quick Thinker",
      description: "Complete 5 quizzes in under 3 minutes each",
      icon: Zap,
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
    <Card className={cn(
      className,
      fullPledge ? "h-full w-full" : ""
    )}>
      <CardHeader className={cn(
        "pb-3 border-b",
        fullPledge ? "p-6" : ""
      )}>
        <CardTitle className={cn(
          "font-bold text-gray-800",
          fullPledge ? "text-3xl" : "text-xl"
        )}>
          Achievements & Badges
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(
        "pt-4",
        fullPledge ? "p-6 pt-6 h-full overflow-auto" : ""
      )}>
        <div className={cn(
          "space-y-4",
          fullPledge ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-0" : ""
        )}>
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                "flex items-center rounded-lg bg-quizDashboard-soft-bg animate-entry",
                fullPledge 
                  ? "flex-col text-center p-6 h-full min-h-[200px] shadow-md hover:shadow-lg transition-shadow" 
                  : "p-3"
              )}
            >
              <div
                className={cn(
                  "achievement-badge",
                  achievement.unlocked ? "bg-quizDashboard-primary text-white" : "bg-gray-100 text-gray-400",
                  fullPledge ? "mb-4 p-4" : ""
                )}
              >
                <achievement.icon size={fullPledge ? 32 : 20} />
              </div>
              <div className={cn(
                "flex-1",
                fullPledge ? "text-center" : "ml-4"
              )}>
                <div className="flex items-center justify-center">
                  <h3 className={cn(
                    "font-semibold opacity-85",
                    fullPledge ? "text-xl mb-2" : ""
                  )}>
                    {achievement.title}
                  </h3>
                </div>
                <p className={cn(
                  "text-muted-foreground mt-0.5",
                  fullPledge ? "text-sm" : "text-xs"
                )}>
                  {achievement.description}
                </p>
                {!achievement.unlocked && (
                  <div className={cn(
                    "w-full bg-gray-200 rounded-full h-1.5 mt-2",
                    fullPledge ? "mt-4 h-2" : ""
                  )}>
                    <div
                      className={cn(
                        "bg-quizDashboard-primary rounded-full",
                        fullPledge ? "h-2" : "h-1.5"
                      )}
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