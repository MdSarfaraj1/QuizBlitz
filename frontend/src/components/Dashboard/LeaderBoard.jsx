import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { BarChart, Trophy, Award, Target, Crown, Medal, Star } from 'lucide-react';
import { cn } from "../../Utills/cn";
import { useEffect,useState } from 'react';
import { useAuth } from '../../Context/UserContextProvider';
import axios from 'axios';
const Leaderboard = ({ fullPledge = false }) => {
  const {userId}=useAuth()
const [topUsers, setTopUsers] = useState([])
const [currentUser, setCurrentUser] = useState({rank: 0,
        username: "Loading...",
        totalScore: 0,
        quizzesTaken: 0,
        avatar: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png"||"",
        achievements: 0,});
 useEffect(() => {
  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/getLeaderboard/${userId}`, { withCredentials: true });
      if (response.status === 200) {
        const data = response.data;
        console.log("Leaderboard data:", data);
      setTopUsers(data.leaderboard || []);
      setCurrentUser(data.userRank || null);
      }
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    
    }
  };

  fetchLeaderboardData();
}, []);
 

  const getPositionIcon = (rank) => {
    switch (rank) {
      case 1: return Crown;
      case 2: return Trophy;
      case 3: return Medal;
      default: return Target;
    }
  };

  const getPositionColor = (rank) => {
    switch (rank) {
      case 1: return "text-yellow-500 bg-yellow-50 border-yellow-200";
      case 2: return "text-gray-400 bg-gray-50 border-gray-200";
      case 3: return "text-amber-600 bg-amber-50 border-amber-200";
      default: return "text-blue-500 bg-blue-50 border-blue-200";
    }
  };

 

  return (
    <Card className={cn(
      "leaderboard-card",
      fullPledge ? "h-full w-full" : ""
    )}>
      <CardHeader className={cn( 
        "pb-3 border-b from-amber-400 to-yellow-500 bg-gradient-to-r rounded-t-lg",
        fullPledge ? "p-6" : ""
      )}>
        <CardTitle className={cn(
          "font-bold text-slate-500 flex items-center",
          fullPledge ? "text-3xl" : "text-xl"
        )}>
        <span className="bg-yellow-100 rounded-full p-2 mr-2 flex items-start justify-center shadow-sm">
            <BarChart className="w-6 h-6 text-red-500" />
          </span>
          Leaderboard
        </CardTitle>
        {fullPledge && (
          <div className="mt-4 text-sm text-gray-600">
            Compete with quiz masters from around the world
          </div>
        )}
      </CardHeader>
      <CardContent className={cn(
        "pt-4",
        fullPledge ? "p-6 pt-6 h-full overflow-auto" : ""
      )}>
        {/* Current User Highlight */}
        <div className={cn(
          "relative bg-gradient-to-r from-quizDashboard-primary/10 to-blue-50 border-2 border-quizDashboard-primary/20 rounded-lg mb-6 animate-entry",
          fullPledge ? "p-6" : "p-4"
        )}>
          {fullPledge && 
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-quizDashboard-primary text-white rounded-full text-xs font-bold">
              YOU
            </span>
          </div>
          }
        
          
          <div className="flex items-center">
            {fullPledge && 
            <div className={cn(
              "mr-4 flex items-center justify-center rounded-full border-2",
              getPositionColor(currentUser.rank),
              fullPledge ? "h-16 w-16" : "h-12 w-12"
            )}>
              {React.createElement(getPositionIcon(currentUser.rank), {
                size: 24 
              })}
            </div>
            }
            <div className={cn(
              "mr-4 relative flex shrink-0 overflow-hidden rounded-full border-2 border-pink-400 shadow-lg",
              fullPledge ? "h-16 w-16" : "h-12 w-12"
            )}>
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.username} className="aspect-square h-full w-full"/>
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-quizDashboard-primary text-white font-bold">
                  {currentUser.username.charAt(0)}
                </div>
              )}
            </div>

            <div className={` ${fullPledge ? "flex-1" : "flex flex-col  "}`}>
              <div className="flex items-center gap-2 mb-1">
                <h3 className={cn(
                  "font-bold text-gray-800",
                  fullPledge ? "text-xl" : "text-lg"
                )}>
                  {currentUser.username}
                </h3>
              </div>
              {
                !fullPledge && 
                <div className="text-center ">
                  <div className={
                    "font-bold text-quizDashboard-primary text-lg"
                  }>
                    #{currentUser.rank} <span className={
                    "text-gray-600 text-xs"}>Rank </span>
                  </div>
                 
                </div>
              }
                {fullPledge && 
                 <div className={
                "grid gap-4 grid-cols-4" 
              }>
                <div className="text-center">
                  <div className={cn(
                    "font-bold text-quizDashboard-primary",
                    fullPledge ? "text-2xl" : "text-lg"
                  )}>
                    #{currentUser.rank}
                  </div>
                  <div className={cn(
                    "text-gray-600",
                    fullPledge ? "text-sm" : "text-xs"
                  )}>
                    Rank
                  </div>
                </div>
             
                  <div className="text-center">
                  <div className={cn(
                    "font-bold text-green-600",
                    fullPledge ? "text-2xl" : "text-lg"
                  )}>
                    {currentUser.totalScore}
                  </div>
                  <div className={cn(
                    "text-gray-600",
                    fullPledge ? "text-sm" : "text-xs"
                  )}>
                    Points
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={cn(
                    "font-bold text-blue-600",
                    fullPledge ? "text-2xl" : "text-lg"
                  )}>
                    {currentUser.quizzesTaken}
                  </div>
                  <div className={cn(
                    "text-gray-600",
                    fullPledge ? "text-sm" : "text-xs"
                  )}>
                    Quizzes
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={cn(
                    "font-bold text-purple-600",
                    fullPledge ? "text-2xl" : "text-lg"
                  )}>
                    {currentUser.achievements}
                  </div>
                  <div className={cn(
                    "text-gray-600",
                    fullPledge ? "text-sm" : "text-xs"
                  )}>
                    Badges
                  </div>
                </div>
              </div> 
                }
            </div>
          </div>
        </div>

        {/* Top Players Section */}
        <div className="space-y-4">
          <h3 className={cn(
            "font-semibold text-gray-700 uppercase tracking-wide border-b pb-2",
            fullPledge ? "text-base" : "text-sm"
          )}>
            🏆 Top Players
          </h3>

          <div className={cn(
            "space-y-3",
            fullPledge ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 space-y-0" : ""
          )}>
            {topUsers.length>0 && topUsers.slice(0,2).map((user) => {
              const PositionIcon = getPositionIcon(user.rank);
              
              return (
                <div 
                  key={user.id} 
                  className={cn(
                    "relative flex items-center rounded-lg border transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-quizDashboard-soft-bg",
                    user.isCurrentUser ? "ring-2 ring-quizDashboard-primary/50 bg-quizDashboard-primary/5" : "",
                    fullPledge ? "p-4" : "p-3"
                  )}
                >

                  {/* Position Icon */}
                  <div className={cn(
                    "mr-3 flex items-center justify-center rounded-full border-2",
                    getPositionColor(user.rank),
                    fullPledge ? "h-12 w-12" : "h-10 w-10"
                  )}>
                    <PositionIcon size={fullPledge ? 20 : 16} />
                  </div>

                  {/* Avatar */}
                  <div className={cn(
                    "mr-3 relative flex shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm",
                    fullPledge ? "h-12 w-12" : "h-10 w-10"
                  )}>
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="aspect-square h-full w-full"/>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-quizDashboard-primary text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={cn(
                        "font-semibold text-gray-800 truncate",
                        fullPledge ? "text-base" : "text-sm"
                      )}>
                        {user.username}
                      </p>
      
                    </div>
                    
                    <div className={cn(
                      "grid gap-2",
                      fullPledge ? "grid-cols-4" : "grid-cols-1"
                    )}>
                      <div className="flex items-center gap-1">
                        <span className={cn(
                          "font-bold text-quizDashboard-primary",
                          fullPledge ? "text-lg" : "text-sm"
                        )}>
                          #{user.rank}
                        </span>
                        {!fullPledge && (
                          <span className="text-xs text-gray-500">rank</span>
                        )}
                      </div>
                      {fullPledge &&
                      <>
                       <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-500" />
                        <span className={cn(
                          "font-medium text-gray-700",
                          fullPledge ? "text-sm" : "text-xs"
                        )}>
                          {user.totalScore}
                        </span>
                        {!fullPledge && (
                          <span className="text-xs text-gray-500">pts</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Target size={12} className="text-blue-500" />
                        <span className={cn(
                          "text-gray-600",
                          fullPledge ? "text-sm" : "text-xs"
                        )}>
                          {user.quizzesTaken}
                        </span>
                        {!fullPledge && (
                          <span className="text-xs text-gray-500">quiz</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Award size={12} className="text-purple-500" />
                        <span className={cn(
                          "text-gray-600",
                          fullPledge ? "text-sm" : "text-xs"
                        )}>
                          {user.achievements}
                        </span>
                        {!fullPledge && (
                          <span className="text-xs text-gray-500">badges</span>
                        )}
                      </div>
                    
                      </>
                      }
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Symbol Legend for full pledge */}
        {fullPledge && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-4">Legend</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-quizDashboard-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-quizDashboard-primary font-bold">#</span>
                </div>
                <div>
                  <div className="font-medium text-sm">Rank</div>
                  <div className="text-xs text-gray-600">Position in leaderboard</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star size={16} className="text-yellow-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">Points</div>
                  <div className="text-xs text-gray-600">Total quiz score</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target size={16} className="text-blue-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">Quizzes</div>
                  <div className="text-xs text-gray-600">Total completed</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award size={16} className="text-purple-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">Badges</div>
                  <div className="text-xs text-gray-600">Achievements earned</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;


