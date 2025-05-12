import { useNavigate } from "react-router-dom";
import { useState, useEffect , } from "react";
import { Menu } from "lucide-react";

const Navbar = () => {
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
        isScrolled ? "bg-white shadow-md py-2 rounded-t-xl" : "bg-transparent py-4"
      }`}
    >
      <div className="container-padding flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-primary">
          <span className="text-myColour">QuizBlitz</span>
        </a>

        {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-700 hover:text-myColour font-medium">Features</a>
          <a href="#how-it-works" className="text-gray-700 hover:text-myColour  font-medium">How It Works</a>
          <a href="#testimonials" className="text-gray-700 hover:text-myColour  font-medium">Testimonials</a>
          <button className="bg-myColour hover:bg-myColour/90 p-2 rounded-md text-white" 
          onClick={() => navigate("/login")}>
          Get Started</button>
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
              className="text-gray-700 hover:text-myColour font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-myColour font-medium py-2"
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
            <button className="bg-myColour opacity-100 hover:opacity-95 py-1 rounded-md " onClick={() => navigate("/login")}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;