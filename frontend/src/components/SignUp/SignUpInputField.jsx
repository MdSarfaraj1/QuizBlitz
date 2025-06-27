import { useState } from "react";
import { Eye, EyeOff ,ArrowRight} from "lucide-react";
// import UploadImage from "./UploadImage";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordMatch,
  getPasswordStrength,
} from "../../Utills/validation";
import axios from "axios";
import { useAuth } from "../../Context/UserContextProvider";

const SignUpInputField = () => {
   const { setUser } = useAuth()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
   const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

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
      newErrors.password = "Password must be at least 5 characters with at least one number";
      isValid = false;
    }
    if (!validatePasswordMatch(password, confirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
const generateNewAvatar = () => {
    const seed = Math.random().toString(36).substring(2, 8);
    const newAvatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
    return newAvatarUrl;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/User/register`, {username:name,email,password},{ withCredentials: true });

      if (response.status === 201) {
        setMessage({
          text: response.data.message,
          type: 'success'
        });
        setTimeout(() => {
          setUser(response.data.userId, response.data.username)
          navigate(`/dashboard`);
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        setMessage({
              text: error.response.data.message|| 'Something went wrong. Please try again later.',
              type: 'error'
            });
        }
       else {
        setMessage({
          text: 'Network error. Please check your connection.',
          type: 'error'
        });
      }
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength(password);
    if (strength === "weak") return "bg-red-500";
    if (strength === "medium") return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {message.text && (
        <div
          className={`alert ${
            message.type === "success" ? "alert-success" : "alert-danger"
          } mb-3`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-0.5">
          <label className="signup-label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className={`signup-input  ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-1">
          <label className="signup-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className={`signup-input ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="signup-label" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`signup-input ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {password && (
            <div className="w-full h-1.5 bg-gray-200 rounded">
              <div
                className={`h-full ${getPasswordStrengthColor()}`}
                style={{
                  width: `${
                    getPasswordStrength(password) === "weak"
                      ? 33
                      : getPasswordStrength(password) === "medium"
                      ? 66
                      : 100
                  }%`,
                }}
              />
            </div>
          )}
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="signup-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`signup-input ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-myColour  hover:bg-myColour/90 text-white size-lg rounded-full flex py-2 justify-center w-full"
        >
          {isLoading ? "Creating Account..." : `Sign Up`}{" "}
          <ArrowRight className="ml-2 h-7 w-5" />
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              className="text-purple-600 hover:underline text-sm font-medium"
              onClick={() => navigate("/login")}
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