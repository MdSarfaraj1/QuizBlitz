import Sidebar from "../components/Dashboard/Sidebar";
import UserProfile from "../components/Dashboard/UserProfile";
import RecentQuizzes from "../components/Dashboard/RecentQuizzes";
import Leaderboard from "../components/Dashboard/LeaderBoard";
import SavedQuizzes from "../components/Dashboard/SavedQuizzes";
import Achievements from "../components/Dashboard/Acheivements";
import QuizTakenChart from "../components/Dashboard/Chart";

const Dashboard = () => {
  return (
    <div className="min-h-screen from-quizDashboard-primary/10">
      <Sidebar />

      <div className="md:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Alex!</h1>
              <p className="text-muted-foreground">
                Ready for a new quiz challenge?
              </p>
            </div>
          </div>
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
            <Achievements/>
            </div>
            <div className="lg:col-span-2 space-y-6">
             <SavedQuizzes />
            </div>
            
          </div>

          
         

         <QuizTakenChart/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
