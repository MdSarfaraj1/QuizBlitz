import { useNavigate } from "react-router-dom";
import { useState, useEffect , } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../Context/UserContextProvider";
const Navbar = () => {
  const {userId}=useAuth()
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header
      className={`fixed  border-b-black top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2 rounded-t-xl"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-padding flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-primary">
          <h1 className="text-2xl font-bold text-quizDashboard-primary">
            Quiz<span className="text-quizDashboard-accent">Blitz</span>
          </h1>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-700 hover:text-quizDashboard-accent font-medium"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-700 hover:text-quizDashboard-accent  font-medium"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-gray-700 hover:text-quizDashboard-accent  font-medium"
          >
            Testimonials
          </a>
          {userId ? (
            <span
              className="text-myColour hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:bg-clip-text cursor-pointer transition-all duration-300 font-semibold text-lg hover:scale-105 transform"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </span>
          ) : (
            <span
              className="text-myColour hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:bg-clip-text cursor-pointer transition-all duration-300 font-semibold text-lg hover:scale-105 transform"
              onClick={() => navigate("/login")}
            >
              Get Started
            </span>
          )}
        </nav>
        {/* Mobile Menu */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="container-padding flex flex-col space-y-4">
            <a
              href="#features"
              className="text-gray-700 hover:text-quizDashboard-accent font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-quizDashboard-accent font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-myColour font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            {userId ? (
              <span
                className="text-myColour hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:bg-clip-text cursor-pointer  duration-500 font-semibold text-md hover:scale-105"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </span>
            ) : (
              <span
                className="text-myColour hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:bg-clip-text cursor-pointer transition-all duration-300 font-semibold text-lg hover:scale-105 transform"
                onClick={() => navigate("/login")}
              >
                Get Started
              </span>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;