import { useState } from 'react';
import {
  Home,
  BookOpen,
  Award,
  BarChart2,
  Lightbulb,
  TrendingUp,
  Settings,
  Menu,
  X,
  LogOut,
  Medal,
  InboxIcon
} from 'lucide-react';
import { useAuth } from '../../Context/UserContextProvider';

const Sidebar = ({ activeItem, onItemSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { role,username } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", key: "dashboard" },
    { icon: Award, label: "My Quizzes", key: "quizzes" },
    { icon: InboxIcon, label: "Saved Quizzes", key: "SavedQuizzes" },
    { icon: TrendingUp, label: "Progress", key: "progress" },
    { icon: Lightbulb, label: "Things To Learn", key: "Things To Learn" },
    { icon: BarChart2, label: "Leaderboard", key: "leaderboard" },
    { icon: Award, label: "Create New Quiz", key: "createQuiz" },
    { icon: Settings, label: "Settings", key: "settings" },
    { icon: LogOut, label: "Sign Out", key: "signout" },
  ];

  const handleItemClick = (itemKey) => {
    onItemSelect(itemKey);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-white flex flex-col w-72 border-r shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-center border-b border-gray-200 bg-gradient-to-r from-indigo-100 to-white">
          <h1 className="text-3xl font-bold text-quizDashboard-primary">
            Quiz<span className="text-quizDashboard-accent">Blitz</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleItemClick(item.key)}
                  className={`group w-full flex items-center p-3 rounded-xl transition-all duration-150 ease-in-out ${
                    activeItem === item.key
                      ? "bg-indigo-50 text-indigo-700 shadow-sm font-medium"
                      : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 transition-colors duration-150 ${
                      activeItem === item.key
                        ? "text-indigo-700"
                        : "text-gray-500 group-hover:text-indigo-700"
                    }`}
                  />
                  <span className="ml-3 text-left tracking-wide">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
       {role === 'admin' && (
  <div className="p-1 border-t border-gray-200">
    <button
      onClick={() => handleItemClick("adminPanel")}
      className={`
        group w-full flex items-center p-3 rounded-xl transition-all duration-150 ease-in-out
        ${
          activeItem === "admin"
            ? "bg-indigo-100 text-indigo-700 shadow"
            : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
        }
      `}
    >
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-200 text-indigo-700 p-1 rounded-full">
          <Medal className="w-5 h-5" />
        </div>
        <div className="text-left">
          <p className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text group-hover:underline group-hover:decoration-2 group-hover:underline-offset-2">
            Admin Panel
          </p>
          <p className="text-xs text-gray-500 -mt-0.5">{username}</p>
        </div>
      </div>
    </button>
  </div>

)}

      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
