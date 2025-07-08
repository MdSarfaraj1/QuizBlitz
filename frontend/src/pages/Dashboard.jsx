import { useState } from 'react';
import Sidebar from "../components/Dashboard/Sidebar";
import Leaderboard from "../components/Dashboard/LeaderBoard";
import SavedQuizzes from "../components/Dashboard/SavedQuizzes";
import Achievements from "../components/Dashboard/Acheivements";
import MainDashBoard from "../components/Dashboard/MainDashboard";
import ThingsToLearn from '../components/Dashboard/ThingsToLearn';
import UserSettings  from '../components/UserSettings/UserSettings';
import QuizProgressDashboard from '../components/Dashboard/Chart';
import CreateQuiz from '../components/CreateQuiz/CreateQuiz';
import AdminPanel from '../components/Dashboard/AdminPanel';
import MyQuizzes from '../components/Dashboard/MyQuizzes';
import axios from 'axios';
import { useAuth } from '../Context/UserContextProvider';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
const { setUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
       await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null, null,null); // Clear from context
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
         <MainDashBoard />  );
      case 'progress':
        return (
          <div className="ml-10">
          
              <QuizProgressDashboard />
            </div>)
      case 'quizzes':
        return (
          <div className="ml-10">
            <MyQuizzes/>
          </div >
        );
      case 'adminPanel':
        return (  
          <div className="ml-10">
           <AdminPanel />
          </div >
        );
      case 'Things To Learn':
        return (
          <div className="ml-10">
            <ThingsToLearn />
          </div >
        );
      
      case 'leaderboard':
        return (
          <div className="ml-10">
            
            <div className="bg-white rounded-lg shadow-md">
              <Leaderboard fullPledge="true" />
            </div>
          </div >
        );
      
      case 'createQuiz':
        return (
          <div className="ml-10">
            <CreateQuiz />
          </div >
        );
      
      case 'settings':
        return (
         <UserSettings/>
        );
      
      case 'signout':
        return (
          <div className="bg-gradient-to-br  transition transform hover:-translate-y-1 hover:shadow-lg from-purple-100 via-white to-pink-100 rounded-lg shadow-md p-6 ml-5">

            <h2 className="text-2xl font-bold mb-4">Sign Out</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to sign out?</p>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Confirm Sign Out
            </button>
          </div>
        );
      case 'SavedQuizzes':
        return (
          <div className="ml-10">
            <SavedQuizzes fullPledge="true" />
          </div >
        );
      case 'achievements':
        return (
          <div className="ml-10">
            
            <Achievements fullPledge="true" />
          </div >
        );
      
      default:
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
            <p className="text-gray-600">The requested section could not be found.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        activeItem={activeSection} 
        onItemSelect={setActiveSection} 
      />

      <div className="md:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;