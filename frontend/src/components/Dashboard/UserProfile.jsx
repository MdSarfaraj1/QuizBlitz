import axios from "axios";
import { Award, TrendingUp, Medal, Lightbulb, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/UserContextProvider";
import NotificationModal from "./Notification";
const UserProfile = () => {
  const { username } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/User/getProfile`,
          { withCredentials: true }
        );
        if (response.status === 200) setUser(response.data);
        else console.error("Failed to fetch user data", response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
const openModal=()=>setIsModalOpen(true)
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight">
            Welcome back, <span className="text-blue-600">{username}!</span>
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Ready for a new quiz challenge?
          </p>
        </div>
        <div className="mt-4 sm:mt-0 w-full sm:w-auto flex justify-center">
          <button
            onClick={() => navigate("/startQuiz")}
            className="homepage-button px-6 py-2 text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Start New Quiz
          </button>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-xl shadow-md p-5 md:p-6 animate-entry border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-5 md:space-y-0 md:space-x-6">
          {/* User Avatar Section */}
          <div className="relative flex-shrink-0">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-28 h-28 rounded-full object-cover border-green-500 border-2 shadow-sm transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1.5 text-xs font-semibold flex items-center justify-center border-2 border-white shadow-md">
              <Medal size={18} />
            </div>
          </div>

          {/* User Info & Stats Grid */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4">
              <div className="flex items-center justify-between space-x-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  {user.username}
                </h2>
                {/* Notification */}
                <button className="relative w-9 h-9" onClick={openModal}>
                  <div className="bg-sky-500 w-full h-full rounded-full shadow-md flex justify-center items-center  hover:bg-sky-600 transition-colors duration-300">
                    <Bell size={18} className="text-white" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-semibold rounded-full flex items-center justify-center shadow-sm">
                    3
                  </span>
                </button>
                
              </div>
              <p className="text-gray-500 text-base mt-0.5">Quiz Enthusiast</p>
            </div>
              <NotificationModal  isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {/* Quizzes Taken */}
              <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-4 border-sky-200 dashboard-stats-card">
                <div className="bg-sky-100 p-2.5 rounded-full mb-2">
                  <Award size={20} className="text-sky-600" />
                </div>
                <span className="font-semibold text-sky-700 text-xs uppercase tracking-wider">
                  Quizzes Taken
                </span>
                <p className="text-2xl font-extrabold text-sky-800 mt-0.5">
                  {user.totalQuizzesTaken || 0}
                </p>
              </div>

              {/* Average Score */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 border-emerald-200 dashboard-stats-card">
                <div className="bg-emerald-100 p-2.5 rounded-full mb-2">
                  <TrendingUp size={20} className="text-emerald-700" />
                </div>
                <span className="font-semibold text-emerald-800 text-xs uppercase tracking-wider">
                  Avg Score
                </span>
                <p className="text-2xl font-extrabold text-emerald-900 mt-0.5">
                  {user.averageScore ? `${user.averageScore}%` : "N/A"}
                </p>
              </div>

              {/* Global Rank */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 border-amber-200 dashboard-stats-card">
                <div className="bg-amber-100 p-2.5 rounded-full mb-2">
                  <Medal size={20} className="text-amber-700" />
                </div>
                <span className="font-semibold text-amber-800 text-xs uppercase tracking-wider">
                  Global Rank
                </span>
                <p className="text-2xl font-extrabold text-amber-900 mt-0.5">
                  {user.rank ? `#${user.rank}` : "N/A"}
                </p>
              </div>

              {/* Total Points */}
              <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-4 border-violet-200 dashboard-stats-card">
                <div className="bg-violet-100 p-2.5 rounded-full mb-2">
                  <Award size={20} className="text-violet-700" />
                </div>
                <span className="font-semibold text-violet-800 text-xs uppercase tracking-wider">
                  Total Points
                </span>
                <p className="text-2xl font-extrabold text-violet-900 mt-0.5">
                  {user.totalScore || 0}
                </p>
              </div>

              {/* User Created Quizzes */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 border-blue-200 dashboard-stats-card">
                <div className="bg-blue-100 p-2.5 rounded-full mb-2">
                  <Lightbulb size={20} className="text-blue-600" />
                </div>
                <span className="font-semibold text-blue-700 text-xs uppercase tracking-wider">
                  Quizzes Created
                </span>
                <p className="text-2xl font-extrabold text-blue-800 mt-0.5">
                  {user.totalCreatedQuizzes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;