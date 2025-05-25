import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { BarChart } from 'lucide-react';
import { cn } from "../../Utills/cn"; // You can still use this if your project includes it
import { Link } from 'react-router-dom';



const Leaderboard = () => {
   const topUsers = [
    { id: 1,position:1, name: "Sarah Kim", score: 9850, avatarUrl: "https://i.pravatar.cc/150?img=1" },
    { id: 2,position:2, name: "David Chen", score: 9720, avatarUrl: "https://i.pravatar.cc/150?img=2" },
    { id: 3,position:3, name: "Alex Johnson", score: 9450, avatarUrl: "https://i.pravatar.cc/150?img=3", isCurrentUser: true },
   
  ];
  const currentUser = topUsers.find(user => user.isCurrentUser) || topUsers[2]; 
  return (
    <Card className="leaderboard-card">
      <CardHeader className="pb-3 border-b">
        <CardTitle className=" text-2xl font-bold text-gray-800 flex items-center">
          <BarChart className="h-5 w-5 mr-2 text-purple-950" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2">
          <div className="bg-purple-100 border border-purple-200 p-4 rounded-md">
            <div className="flex items-center">
              <div className="mr-4 text-xl font-bold text-purple">#{currentUser.position}</div>
              <div className="h-10 w-10 mr-3 relative flex shrink-0 overflow-hidden rounded-full">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="aspect-square h-full w-full"/>
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">{currentUser.name.charAt(0)}</div>
                )}
              </div>
              <div>
                <p className="font-medium">
                  {currentUser.name}
                  <span className="text-xs bg-purple-200 text-purple-950 px-2 py-0.5 rounded-full ml-2">
                    You
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">{currentUser.score} points</p>
              </div>
            </div>
          </div>

          <h3 className="font-medium text-sm text-muted-foreground uppercase mt-4">Top Players</h3>

          <div className="space-y-3">
            {topUsers.map((user) => (
              <div key={user.id} className="flex items-center p-2 hover:bg-secondary/50 rounded-md">
                <div className="mr-4 text-base font-bold w-5">#{user.position}</div>
                <div className="h-10 w-10 mr-3 relative flex shrink-0 overflow-hidden rounded-full">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="aspect-square h-full w-full"/>
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">{currentUser.name.charAt(0)}</div>
                )}
              </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.score} points</p>
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
