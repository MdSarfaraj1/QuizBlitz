import axios from "axios";
import { Award, TrendingUp, Medal, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Context/UserContextProvider";

const UserProfile = () => {
  const { username } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/User/getProfile`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setUser(response.data);
          console.log("User data fetched successfully:", response);
        } else {
          console.error("Failed to fetch user data", response);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {username}!</h1>
          <p className="text-muted-foreground">
            Ready for a new quiz challenge?
          </p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto flex justify-center">
          <button
            onClick={() => navigate("/startQuiz")}
            className="homepage-button"
            size="lg"
          >
            Start New Quiz
          </button>
        </div>
      </div>

      <div className=" border-2 rounded-lg bg-white shadow-md p-4 animate-entry">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="relative mb-4 md:mb-0 md:mr-6">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
            />
            <div className="absolute -bottom-2 -right-2 bg-quizDashboard-primary/80 text-white rounded-full p-1.5">
              <Medal size={16} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="mb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <Link
                  to="/userSettings"
                  className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 hover:underline mt-1 md:mt-0 text-sm transition-colors"
                >
                  <Pencil size={14} />
                  Edit Profile
                </Link>
              </div>
              <p className="text-gray-500">Quiz enthusiast</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {/* Quizzes Taken */}
              <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-4 rounded-xl border border-sky-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center md:justify-start text-sky-600 mb-2">
                  <div className="bg-sky-100 p-2 rounded-lg mr-2">
                    <Award size={18} className="text-sky-600" />
                  </div>
                  <span className="font-semibold text-sm">Quizzes</span>
                </div>
                <p className="text-2xl font-bold text-sky-700">
                  {user.totalQuizzesTaken}
                </p>
              </div>

              {/* Average Score */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center md:justify-start text-emerald-700 mb-2">
                  <div className="bg-emerald-100 p-2 rounded-lg mr-2">
                    <TrendingUp size={18} className="text-emerald-700" />
                  </div>
                  <span className="font-semibold text-sm">Avg Score</span>
                </div>
                <p className="text-2xl font-bold text-emerald-800">
                  {user.averageScore}%
                </p>
              </div>

              {/* Global Rank */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center md:justify-start text-amber-700 mb-2">
                  <div className="bg-amber-100 p-2 rounded-lg mr-2">
                    <Medal size={18} className="text-amber-700" />
                  </div>
                  <span className="font-semibold text-sm">Rank</span>
                </div>
                <p className="text-2xl font-bold text-amber-800">
                  #{user.rank}
                </p>
              </div>

              {/* Total Points */}
              <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-4 rounded-xl border border-violet-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center md:justify-start text-violet-700 mb-2">
                  <div className="bg-violet-100 p-2 rounded-lg mr-2">
                    <Award size={18} className="text-violet-700" />
                  </div>
                  <span className="font-semibold text-sm">Points</span>
                </div>
                <p className="text-2xl font-bold text-violet-800">
                  {user.totalScore}
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
