
import UserProfile from "./UserProfile";
import RecentQuizzes from "./RecentQuizzes";
import Leaderboard from "./LeaderBoard";
import SavedQuizzes from "./SavedQuizzes";
import Achievements from "./Acheivements";
import FavoriteQuizCategories from "./FevouriteQuiz";


const MainDashboard = () => {
  

  
  return (
      <div >
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
        
          <div className="space-y-6 mb-8">
            <UserProfile />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <RecentQuizzes />
            </div>
            <div>
              <Leaderboard />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
            <div className="space-y-6">
            <FavoriteQuizCategories/>
            </div>
            <div className="lg:col-span-2 space-y-6">
             <SavedQuizzes />
            </div>
          </div>
       
        </div>
      </div>
    
  );
};

export default MainDashboard;
