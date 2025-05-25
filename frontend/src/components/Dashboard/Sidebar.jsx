import  { useState } from 'react';
import { Link } from 'react-router-dom';
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

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'My Quizzes', path: '/quizzes' },
    { icon: Star, label: 'Favorites', path: '/favorites' },
    { icon: BarChart2, label: 'Leaderboard', path: '/leaderboard' },
    { icon: Award, label: 'Create Quiz', path: '/createQuiz' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: LogOut, label: 'Sign Out', path: '/signout' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-white flex flex-col w-64 border-r transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-center border-b border-border">
          <h1 className="text-2xl font-bold text-quizDashboard-primary">
            Quiz<span className="text-quizDashboard-accent">Blitz</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto pt-5 px-3">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`
                  flex items-center p-3 text-base rounded-lg group
                  ${
                    window.location.pathname === item.path
                      ? "bg-quizDashboard-primary/10  text-quizDashboard-primary font-medium"
                      : "text-gray-600 hover:bg-quizDashboard-primary/10" 
                  }
                `}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon
                    className={
                      ("w-5 h-5 transition-colors",
                      window.location.pathname === item.path
                        ? "text-quizDashboard-primary"
                        : "text-gray-500 group-hover:text-quizDashboard-primary")
                    }
                  />
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://i.pravatar.cc/100"
                alt="User avatar"
                className="absolute w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Alex Johnson</p>
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
