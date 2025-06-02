import { useState } from 'react';
import Sidebar from "../components/Dashboard/Sidebar";
import Leaderboard from "../components/Dashboard/LeaderBoard";
import SavedQuizzes from "../components/Dashboard/SavedQuizzes";
import Achievements from "../components/Dashboard/Acheivements";
import MainDashBoard from "../components/Dashboard/MainDashboard";
import ThingsToLearn from '../components/Dashboard/ThingsToLearn';
import UserSettings  from '../components/UserSettings/UserSettings';
import QuizProgressDashboard from '../components/Dashboard/Chart';
// Placeholder components for other sections
const MyQuizzes = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4">My Quizzes</h2>
    <p className="text-gray-600">Here you can view and manage all your created quizzes.</p>
  </div>
);


const CreateQuiz = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4">Create New Quiz</h2>
    <p className="text-gray-600">Create a new quiz by adding questions and answers.</p>
  </div>
);

const Settings = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4">Settings</h2>
    <p className="text-gray-600">Manage your account settings and preferences.</p>
  </div>
);

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
         <MainDashBoard />  );
      case 'progress':
        return (
          <div className="ml-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Progress Overview</h1>
              <p className="text-gray-600">Track your quiz progress and achievements</p>
            </div>
              <QuizProgressDashboard />
            </div>)
      case 'quizzes':
        return (
          <div className="ml-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">My Quizzes</h1>
              <p className="text-gray-600">Manage your created quizzes</p>
            </div>
            <MyQuizzes />
          </div >
        );
      
      case 'Things To Learn':
        return (
          <div className="ml-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Favorite Quizzes</h1>
              <p className="text-gray-600">Your starred and favorite quizzes</p>
            </div>
            <ThingsToLearn />
          </div >
        );
      
      case 'leaderboard':
        return (
          <div className="ml-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Leaderboard</h1>
              <p className="text-gray-600">See how you rank against other players</p>
            </div>
            <div className="bg-white rounded-lg shadow-md">
              <Leaderboard fullPledge="true" />
            </div>
          </div >
        );
      
      case 'createQuiz':
        return (
          <div className="ml-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Create Quiz</h1>
              <p className="text-gray-600">Design your own quiz</p>
            </div>
            <CreateQuiz />
          </div >
        );
      
      case 'settings':
        return (
         <UserSettings/>
        );
      
      case 'signout':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Sign Out</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to sign out?</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Confirm Sign Out
            </button>
          </div>
        );
      case 'SavedQuizzes':
        return (
          <div className="ml-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Saved Quizzes</h1>
              <p className="text-gray-600">Your saved quizzes for later</p>
            </div>
            <SavedQuizzes fullPledge="true" />
          </div >
        );
      case 'achievements':
        return (
          <div className="ml-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Achievements</h1>
              <p className="text-gray-600">Your earned achievements and badges</p>
            </div>
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