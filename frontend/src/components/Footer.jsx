import { Facebook,Twitter,Instagram } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mb-0 rounded-lg">
      <div className="container-padding max-w-7xl mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">
              <span className="text-accent">Quiz</span>Blitz
            </h2>
            <p className="mb-6 max-w-md">
              Challenge your mind with fun quizzes across multiple categories.
              Test your knowledge, compete with friends, and learn something new every day.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="sr-only">Facebook</span>
                  <Facebook size={18}/>
                </div>
              </a>
              <a href="#" className="hover:text-white">
                <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="sr-only">Twitter</span>
                  <Twitter  size={18}/>
                </div>
              </a>
              <a href="#" className="hover:text-white">
                <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="sr-only">Instagram</span>
                  <Instagram size={18}/>
                </div>
              </a>
            </div>
          </div>
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
              <li><a href="#testimonials" className="hover:text-white transition">Testimonials</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
            </ul>
          </div>
          {/* Support us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-800 text-center">
          <p>&copy; 2025 QuizBlitz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;