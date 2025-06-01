import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { BarChart } from 'lucide-react';
import { cn } from "../../Utills/cn";
import { Link } from 'react-router-dom';

const Leaderboard = ({ fullPledge = false }) => {
  const topUsers = [
    { id: 1, position: 1, name: "Sarah Kim", score: 9850, avatarUrl: "https://i.pravatar.cc/150?img=1" },
    { id: 2, position: 2, name: "David Chen", score: 9720, avatarUrl: "https://i.pravatar.cc/150?img=2" },
    { id: 3, position: 3, name: "Alex Johnson", score: 9450, avatarUrl: "https://i.pravatar.cc/150?img=3", isCurrentUser: true },
    // Add more users for fullPledge view
    ...(fullPledge ? [
      { id: 4, position: 4, name: "Emma Wilson", score: 9320, avatarUrl: "https://i.pravatar.cc/150?img=4" },
      { id: 5, position: 5, name: "Michael Brown", score: 9180, avatarUrl: "https://i.pravatar.cc/150?img=5" },
      { id: 6, position: 6, name: "Lisa Garcia", score: 9050, avatarUrl: "https://i.pravatar.cc/150?img=6" },
      { id: 7, position: 7, name: "James Davis", score: 8920, avatarUrl: "https://i.pravatar.cc/150?img=7" },
      { id: 8, position: 8, name: "Anna Martinez", score: 8800, avatarUrl: "https://i.pravatar.cc/150?img=8" },
    ] : [])
  ];
  
  const currentUser = topUsers.find(user => user.isCurrentUser) || topUsers[2];

  return (
    <Card className={cn(
      "leaderboard-card",
      fullPledge ? "h-full w-full" : ""
    )}>
      <CardHeader className={cn(
        "pb-3 border-b",
        fullPledge ? "p-6" : ""
      )}>
        <CardTitle className={cn(
          "font-bold text-gray-800 flex items-center",
          fullPledge ? "text-3xl" : "text-2xl"
        )}>
          <BarChart className={cn(
            "mr-2 text-purple-950",
            fullPledge ? "h-8 w-8" : "h-5 w-5"
          )} />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(
        "pt-4",
        fullPledge ? "p-6 pt-6 h-full overflow-auto" : ""
      )}>
        <div className="space-y-2">
          <div className={cn(
            "bg-purple-100 border border-purple-200 rounded-md",
            fullPledge ? "p-6" : "p-4"
          )}>
            <div className="flex items-center">
              <div className={cn(
                "mr-4 font-bold text-purple",
                fullPledge ? "text-3xl" : "text-xl"
              )}>
                #{currentUser.position}
              </div>
              <div className={cn(
                "mr-3 relative flex shrink-0 overflow-hidden rounded-full",
                fullPledge ? "h-16 w-16" : "h-10 w-10"
              )}>
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="aspect-square h-full w-full"/>
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <p className={cn(
                  "font-medium",
                  fullPledge ? "text-lg" : ""
                )}>
                  {currentUser.name}
                  <span className={cn(
                    "bg-purple-200 text-purple-950 px-2 py-0.5 rounded-full ml-2",
                    fullPledge ? "text-sm" : "text-xs"
                  )}>
                    You
                  </span>
                </p>
                <p className={cn(
                  "text-muted-foreground",
                  fullPledge ? "text-base" : "text-sm"
                )}>
                  {currentUser.score} points
                </p>
              </div>
            </div>
          </div>

          <h3 className={cn(
            "font-medium text-muted-foreground uppercase mt-4",
            fullPledge ? "text-base" : "text-sm"
          )}>
            Top Players
          </h3>

          <div className={cn(
            "space-y-3",
            fullPledge ? "grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0" : ""
          )}>
            {topUsers.map((user) => (
              <div key={user.id} className={cn(
                "flex items-center rounded-md hover:bg-secondary/50",
                fullPledge ? "p-4 bg-white shadow-sm hover:shadow-md transition-shadow" : "p-2"
              )}>
                <div className={cn(
                  "mr-4 font-bold w-5",
                  fullPledge ? "text-lg w-8" : "text-base"
                )}>
                  #{user.position}
                </div>
                <div className={cn(
                  "mr-3 relative flex shrink-0 overflow-hidden rounded-full",
                  fullPledge ? "h-12 w-12" : "h-10 w-10"
                )}>
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="aspect-square h-full w-full"/>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className={cn(
                    "font-medium",
                    fullPledge ? "text-base" : ""
                  )}>
                    {user.name}
                  </p>
                  <p className={cn(
                    "text-muted-foreground",
                    fullPledge ? "text-sm" : "text-xs"
                  )}>
                    {user.score} points
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;