import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import {
  Award, Star, TrendingUp, Zap, Target, Trophy, Clock,
  Flame, Shield, Brain, BookOpen, Users, Crown,
  Calendar, CheckCircle, Lightbulb, Timer, Medal,
  Heart, Coffee, Moon, Sun, Rocket, Diamond
} from 'lucide-react';
import { cn } from "../../Utills/cn";

const Achievements = ({ className, fullPledge = false }) => {
  const achievements = [
    // Speed-based Achievements
    {
      id: 1,
      title: "Lightning Fast",
      description: "Complete a quiz in under 30 seconds",
      icon: Zap,
      category: "Speed",
      unlocked: false,
      progress: 0,
      rarity: "common"
    },
    {
      id: 2,
      title: "Quick Thinker",
      description: "Complete 5 quizzes in under 3 minutes each",
      icon: Timer,
      category: "Speed",
      unlocked: true,
      progress: 100,
      rarity: "common"
    },
    {
      id: 3,
      title: "Speed Demon",
      description: "Complete 10 quizzes in under 1 minute each",
      icon: Rocket,
      category: "Speed",
      unlocked: false,
      progress: 30,
      rarity: "rare"
    },

    // Accuracy Achievements
    {
      id: 4,
      title: "Perfect Score",
      description: "Get 100% on any quiz",
      icon: Star,
      category: "Accuracy",
      unlocked: true,
      progress: 100,
      rarity: "common"
    },
    {
      id: 5,
      title: "Perfectionist",
      description: "Get 100% on 5 different quizzes",
      icon: Diamond,
      category: "Accuracy",
      unlocked: false,
      progress: 60,
      rarity: "uncommon"
    },
    {
      id: 6,
      title: "Flawless Victory",
      description: "Get 100% on 10 consecutive quizzes",
      icon: Crown,
      category: "Accuracy",
      unlocked: false,
      progress: 20,
      rarity: "legendary"
    },

    // Streak Achievements
    {
      id: 7,
      title: "Daily Dedication",
      description: "Complete a quiz every day for 7 days",
      icon: Calendar,
      category: "Consistency",
      unlocked: true,
      progress: 100,
      rarity: "common"
    },
    {
      id: 8,
      title: "Quiz Streak",
      description: "Complete a quiz every day for 30 days",
      icon: Flame,
      category: "Consistency",
      unlocked: false,
      progress: 40,
      rarity: "rare"
    },
    {
      id: 9,
      title: "Unstoppable",
      description: "Complete a quiz every day for 100 days",
      icon: Trophy,
      category: "Consistency",
      unlocked: false,
      progress: 12,
      rarity: "legendary"
    },

    // Volume Achievements
    {
      id: 10,
      title: "Getting Started",
      description: "Complete your first quiz",
      icon: CheckCircle,
      category: "Progress",
      unlocked: true,
      progress: 100,
      rarity: "common"
    },
    {
      id: 11,
      title: "Quiz Explorer",
      description: "Complete 25 quizzes",
      icon: BookOpen,
      category: "Progress",
      unlocked: false,
      progress: 68,
      rarity: "common"
    },
    {
      id: 12,
      title: "Quiz Enthusiast",
      description: "Complete 100 quizzes",
      icon: Heart,
      category: "Progress",
      unlocked: false,
      progress: 17,
      rarity: "uncommon"
    },
    {
      id: 13,
      title: "Quiz Master",
      description: "Complete 500 quizzes",
      icon: Award,
      category: "Progress",
      unlocked: false,
      progress: 3,
      rarity: "epic"
    },
    {
      id: 14,
      title: "Quiz Legend",
      description: "Complete 1000 quizzes",
      icon: Medal,
      category: "Progress",
      unlocked: false,
      progress: 1,
      rarity: "legendary"
    },

    // Category Achievements
    {
      id: 15,
      title: "Well Rounded",
      description: "Complete a quiz in each category",
      icon: Target,
      category: "Exploration",
      unlocked: false,
      progress: 66,
      rarity: "common"
    },
    {
      id: 16,
      title: "Category Expert",
      description: "Complete 10 quizzes in a single category",
      icon: Brain,
      category: "Specialization",
      unlocked: false,
      progress: 80,
      rarity: "uncommon"
    },
    {
      id: 17,
      title: "Renaissance Mind",
      description: "Complete 5+ quizzes in 5+ different categories",
      icon: Lightbulb,
      category: "Exploration",
      unlocked: false,
      progress: 40,
      rarity: "rare"
    },

    // Special Achievements
    {
      id: 18,
      title: "Night Owl",
      description: "Complete 10 quizzes between 10 PM and 2 AM",
      icon: Moon,
      category: "Special",
      unlocked: false,
      progress: 30,
      rarity: "uncommon"
    },
    {
      id: 19,
      title: "Early Bird",
      description: "Complete 10 quizzes between 5 AM and 8 AM",
      icon: Sun,
      category: "Special",
      unlocked: false,
      progress: 10,
      rarity: "uncommon"
    },
    {
      id: 20,
      title: "Coffee Break Champion",
      description: "Complete 5 quizzes in a single hour",
      icon: Coffee,
      category: "Special",
      unlocked: false,
      progress: 0,
      rarity: "rare"
    },

    // Improvement Achievements
    {
      id: 21,
      title: "Rising Star",
      description: "Improve your score by 50% on a retaken quiz",
      icon: TrendingUp,
      category: "Improvement",
      unlocked: false,
      progress: 0,
      rarity: "common"
    },
    {
      id: 22,
      title: "Comeback Kid",
      description: "Score 90%+ after scoring below 50% on same quiz",
      icon: Shield,
      category: "Improvement",
      unlocked: false,
      progress: 0,
      rarity: "rare"
    },

    // Social Achievements (if applicable)
    {
      id: 23,
      title: "Team Player",
      description: "Complete 5 multiplayer quizzes",
      icon: Users,
      category: "Social",
      unlocked: false,
      progress: 0,
      rarity: "common"
    },

    // Time-based Special Events
    {
      id: 24,
      title: "Weekend Warrior",
      description: "Complete 20 quizzes on weekends",
      icon: Trophy,
      category: "Special",
      unlocked: false,
      progress: 25,
      rarity: "uncommon"
    }
  ];

  // Sort achievements: unlocked ones first, then by progress (descending) for locked ones
  let sortedAchievements = [...achievements].sort((a, b) => {
    if (a.unlocked && !b.unlocked) {
      return -1; // a (unlocked) comes before b (locked)
    }
    if (!a.unlocked && b.unlocked) {
      return 1; // b (unlocked) comes before a (locked)
    }
    // If both are locked, sort by progress in descending order
    if (!a.unlocked && !b.unlocked) {
      return b.progress - a.progress;
    }
    return 0; // Maintain original order if both are unlocked
  });
  if(!fullPledge)
    sortedAchievements=sortedAchievements.slice(0,4)

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'uncommon': return 'border-green-300 bg-green-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityBadgeColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'uncommon': return 'bg-green-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const categories = [...new Set(achievements.map(a => a.category))];

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
        {fullPledge && (
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(category => (
              <span
                key={category}
                className="px-3 py-1 bg-quizDashboard-primary/10 text-quizDashboard-primary rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className={cn(
        "pt-4",
        fullPledge ? "p-6 pt-6 h-full overflow-auto" : ""
      )}>
        <div className={cn(
          "space-y-4",
          fullPledge ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 space-y-0" : ""
        )}>
          {sortedAchievements.map((achievement) => ( 
            <div
              key={achievement.id}
              className={cn(
                "relative flex items-center rounded-lg border-2 transition-all duration-300 hover:scale-105",
                getRarityColor(achievement.rarity),
                achievement.unlocked ? "opacity-100" : "opacity-75",
                fullPledge
                  ? "flex-col text-center p-6 h-full min-h-[220px] shadow-md hover:shadow-xl"
                  : "p-3"
              )}
            >
              {/* Rarity Badge */}
              {fullPledge && 
              <div className={cn(
                "absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold text-white uppercase",
                getRarityBadgeColor(achievement.rarity)
              )}>
                {achievement.rarity}
              </div>
              }
              

              <div
                className={cn(
                  "achievement-badge transition-colors duration-300",
                  achievement.unlocked
                    ? "bg-quizDashboard-primary text-white shadow-lg"
                    : "bg-gray-200 text-gray-400",
                  fullPledge ? "mb-4 p-4 rounded-full" : "rounded-lg p-2"
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
                    fullPledge ? "text-lg mb-2" : "text-sm"
                  )}>
                    {achievement.title}
                  </h3>
                </div>

                <p className={cn(
                  "text-muted-foreground mt-1",
                  fullPledge ? "text-sm mb-3" : "text-xs"
                )}>
                  {achievement.description}
                </p>

                {fullPledge && (
                  <div className="text-xs text-gray-500 mb-3 font-medium">
                    Category: {achievement.category}
                  </div>
                )}

                {!achievement.unlocked && (
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs font-medium text-gray-700">
                        {achievement.progress}%
                      </span>
                    </div>
                    <div className={cn(
                      "w-full bg-gray-200 rounded-full overflow-hidden",
                      fullPledge ? "h-2" : "h-1.5"
                    )}>
                      <div
                        className={cn(
                          "bg-gradient-to-r from-quizDashboard-primary to-blue-500 rounded-full transition-all duration-500",
                          fullPledge ? "h-2" : "h-1.5"
                        )}
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {achievement.unlocked && (
                  <div className={cn(
                    "flex items-center justify-center text-green-600 font-medium",
                    fullPledge ? "text-sm mt-2" : "text-xs mt-1"
                  )}>
                    <CheckCircle size={fullPledge ? 16 : 12} className="mr-1" />
                    Unlocked
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {fullPledge && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Achievement Stats</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-quizDashboard-primary">
                  {achievements.filter(a => a.unlocked).length}
                </div>
                <div className="text-sm text-gray-600">Unlocked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">
                  {achievements.length}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {achievements.filter(a => a.rarity === 'common' && a.unlocked).length}
                </div>
                <div className="text-sm text-gray-600">Common</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {achievements.filter(a => a.rarity === 'rare' && a.unlocked).length}
                </div>
                <div className="text-sm text-gray-600">Rare</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {achievements.filter(a => a.rarity === 'legendary' && a.unlocked).length}
                </div>
                <div className="text-sm text-gray-600">Legendary</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Achievements;