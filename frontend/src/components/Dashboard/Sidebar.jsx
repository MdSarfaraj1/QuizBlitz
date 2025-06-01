import { useState } from 'react';
import { 
  Home, 
  BookOpen,
  Award,
  BarChart2, 
  Star,
  Settings,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import {useAuth} from "../../Context/UserContextProvider"
const Sidebar = ({ activeItem, onItemSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {username}=useAuth();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', key: 'dashboard' },
    { icon: BookOpen, label: 'My Quizzes', key: 'quizzes' },
    { icon: Star, label: 'Favorites', key: 'Things To Learn' },
    { icon: BarChart2, label: 'Leaderboard', key: 'leaderboard' },
    { icon: Award, label: 'Create Quiz', key: 'createQuiz' },
    { icon: Settings, label: 'Settings', key: 'settings' },
    { icon: LogOut, label: 'Sign Out', key: 'signout' },
  ];

  const handleItemClick = (itemKey) => {
    onItemSelect(itemKey);
    setIsOpen(false); // Close mobile sidebar after selection
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
        className={`fixed inset-y-0 left-0 z-40 bg-white flex flex-col w-64 border-r shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-center border-b border-gray-200">
           <h1 className="text-2xl font-bold text-quizDashboard-primary">
            Quiz<span className="text-quizDashboard-accent">Blitz</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto pt-5 px-3">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleItemClick(item.key)}
                  className={`
                    w-full flex items-center p-3 text-base rounded-lg group transition-colors
                    ${
                      activeItem === item.key
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600" 
                    }
                  `}
                >
                  <item.icon
                    className={`w-5 h-5 transition-colors ${
                      activeItem === item.key
                        ? "text-blue-600"
                        : "text-gray-500 group-hover:text-blue-600"
                    }`}
                  />
                  <span className="ml-3 text-left">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://i.pravatar.cc/100"
                alt="User avatar"
                className="absolute w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{username||'User'}</p>
              <p className="text-xs text-gray-500">QuizBlitz</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;