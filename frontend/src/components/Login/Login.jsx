import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Logo from './Logo';
import { Link,  } from 'react-router-dom';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast,setToast]=useState({})
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setToast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }
    
    // Demo login success message
    setToast({
      title: "Success!",
      description: "Welcome back! You've successfully logged in.",
    });
  };

  return (
    <div className="login-background flex min-h-screen flex-col md:flex-row">
      {/* Illustration Area (hidden on mobile) */}
      <div className="hidden md:block md:w-1/2 lg:w-7/12 illustration-area relative">
        <div className="absolute inset-0 z-10 flex items-center justify-center p-12">
          <div className="w-full max-w-md text-white">
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-lg opacity-90">Sign in to begin your quiz journey. Track your scores, challenge yourself, and improve with every attempt. Let’s test your knowledge and have some fun along the way!</p>
          </div>
        </div>
      </div>
      
      {/* Login Form Area */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 lg:w-5/12 p-6 sm:p-10">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>
          
          {/* Title visible only on mobile */}
          <div className="md:hidden text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Please log in to continue</p>
          </div>
          
          {/* Login Form */}
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Sign In</h3>
            
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <div className="relative">
                  <div className="absolute left-3 top-4 text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="login-input-field"
                  />
                </div>
              </div>
              
              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input 
                    id="password" 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="login-input-field"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <input 
                type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(prev=>!prev)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              
              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full h-12 text-base bg-myColour/20 rounded-md font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
              >
                Sign In
              </button>
              
              {/* Sign up option */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{" "}
                <Link to={'/signup'} className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
          
          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-500">
            &copy; 2025 QuizBlitz. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;