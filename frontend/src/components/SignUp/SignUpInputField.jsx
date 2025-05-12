import  { useState } from "react";
import { validateEmail, validateName, validatePassword, validatePasswordMatch, getPasswordStrength } from "../../Utills/validation";
import { Eye, EyeOff } from "lucide-react";
import UploadImage from "./UploadImage";

const SignUpInputField = ({ onSwitchToLogin }) => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    
    if (!validateName(name)) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }
    
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    
    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters with at least one number";
      isValid = false;
    }
    
    if (!validatePasswordMatch(password, confirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // if (!validateForm()) return;
    
    // setIsLoading(true);
    
    // try {
    //   await signup(name, email, password, avatarUrl || undefined);
    //   toast({
    //     title: "Account created!",
    //     description: "You have successfully registered.",
    //   });
    // } catch (error) {
    //   toast({
    //     title: "Registration failed",
    //     description: "There was an error creating your account.",
    //     variant: "destructive",
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength(password);
    if (strength === "weak") return "bg-destructive";
    if (strength === "medium") return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className="w-full max-w-md mx-auto  animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold  mb-2">Create Account</h1>
        <p className="text-gray-500">Join our quiz community</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
       <UploadImage onAvatarChange={setAvatarUrl} /> 
        
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className={errors.name ? "border-destructive" : ""}
            autoComplete="name"
          />
          {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className={errors.email ? "border-destructive" : ""}
            autoComplete="email"
          />
          {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "border-destructive pr-10" : "pr-10"}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {password && (
            <div className="w-full h-1.5 bg-gray-200 rounded overflow-hidden">
              <div
                className={`h-full transition-all ${getPasswordStrengthColor()}`}
                style={{ width: `${(getPasswordStrength(password) === "weak" ? 33 : getPasswordStrength(password) === "medium" ? 66 : 100)}%` }}
              />
            </div>
          )}
          {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-destructive text-xs">{errors.confirmPassword}</p>
          )}
        </div>
        
        <button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#7c3bed] hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpInputField;