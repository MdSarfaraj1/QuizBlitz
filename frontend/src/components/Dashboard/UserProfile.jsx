
import { Award, TrendingUp, Clock, Medal } from 'lucide-react';

// JSDoc for type hinting for the 'User' object
const UserProfileHeader = () => {
let user={
  name: "John Doe",
  avatar: "https://i.pravatar.cc/100",
  totalQuizzes: 25,
  averageScore: 85,
  rank: 3,
  points: 1500,
  level:9
}
  return (
    <div className=" border-2 rounded-lg bg-white shadow-md p-4 animate-entry">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="relative mb-4 md:mb-0 md:mr-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
          />
          <div className="absolute -bottom-2 -right-2 bg-quizDashboard-primary/80 text-white rounded-full p-1.5">
            <Medal size={16} />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
          <p className="text-gray-500 mb-4">Quiz enthusiast</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {/* Quizzes Taken */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-center md:justify-start text-sky-500 mb-1">
                <Award size={18} className='text-sky-500'/>
                <span className=" font-semibold text-md">Quizzes</span>
              </div>
              <p className="text-xl font-bold">{user.totalQuizzes}</p>
            </div>

            {/* Average Score */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-center md:justify-start text-green-700 mb-1">
                <TrendingUp size={18} className="mr-1" />
                <span className="font-semibold text-md">Avg Score</span>
              </div>
              <p className="text-xl font-bold">{user.averageScore}%</p>
            </div>

            {/* Global Rank */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-center md:justify-start text-orange-600 mb-1">
                <Medal size={18} className="mr-1" />
                <span className="font-semibold text-md">Rank</span>
              </div>
              <p className="text-xl font-bold">#{user.rank}</p>
            </div>

            {/* Total Points */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-center md:justify-start text-green-500 mb-1">
                <Award size={18} className="mr-1" />
                <span className="font-semibold text-md">Points</span>
              </div>
              <p className="text-xl font-bold">{user.points.toLocaleString()}</p>
            </div>
           

          </div>
        </div>

        <div className="mt-4 md:mt-0 w-full md:w-auto flex justify-center">
          <button
          className='bg-orange-600 hover:bg-orange-700 text-white focus:ring-primary-500 py-3 px-6 text-lg rounded-md shadow-md'
      
            size="lg"
          >
            Start New Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;