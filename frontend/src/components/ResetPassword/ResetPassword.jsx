import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    // Handle email submission
    const handleEmailSubmit = async (e) => {
      e.preventDefault();
        setLoading(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/resetPassword`, { email },{withCredentials:true});
        setMessage({ text:"🎉 OTP sent to your email!", type: "success" });
        setStep(2);
      } catch (error) {
        setMessage({
          text: error.response?.data?.message || "Failed to send OTP",
          type: "error"
        });
      }
      setLoading(false);
    };
    // Handle OTP submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/resetPassword/verify-otp`, { email, otp },{withCredentials:true});
      setMessage({ text: "✅ OTP verified. Please set your new password.", type: "success" });
      setStep(3);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Invalid OTP",
        type: "error"
      });
    }
    setLoading(false);
  };
    // Handle password reset
 const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/resetPassword/set-new-password`, {
        email,
        otp,
        newPassword
      },{withCredentials:true});
      setMessage({ text:  "🔒 Password has been reset successfully!", type: "success" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Password reset failed",
        type: "error"
      });
    }
    setLoading(false);
  };
  const renderStep = () => {
    const commonButtonStyles = `${loading 
        ? "reset-password-button bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed" 
        : " reset-password-button bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800"
      }
    `;

    if (step === 1) {
      return (
        <div className="space-y-6 animate-fade-in">
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={"reset-password-input"}
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <span className="text-purple-300">✉️</span>
              </div>
            </div>
            <button type="submit" className={commonButtonStyles} disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending OTP...
                </div>
              ) : (
                "Send Verification Code"
              )}
            </button>
          </form>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="space-y-6 animate-fade-in">
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`reset-password-input text-center text-2xl tracking-widest`}
                maxLength="6"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <span className="text-purple-300">🔢</span>
              </div>
            </div>
            <button type="submit" className={commonButtonStyles} disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : (
                "Verify Code"
              )}
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-fade-in">
        <form onSubmit={handlePasswordReset} className="space-y-6">
          <div className="relative">
            <input
              type="password"
              placeholder="Create new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={"reset-password-input"}
              minLength="6"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-purple-300">🔐</span>
            </div>
          </div>
          <button type="submit" className={commonButtonStyles} disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating Password...
              </div>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/30 via-transparent to-pink-800/30"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
          
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                    transition-all duration-500 transform ${step >= stepNum 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110 shadow-lg' 
                      : 'bg-white/20 text-gray-400 scale-100'
                    }
                  `}>
                    {step > stepNum ? '✓' : stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-8 h-1 mx-2 rounded-full transition-all duration-500 ${
                      step > stepNum ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

         
          {/* Title */}
          <h2 className="text-4xl font-black mb-3 text-center bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-lg">
            Reset Password
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-200 mb-8 text-center leading-relaxed">
            {step === 1 && "🔐 Enter your email to get started with password recovery"}
            {step === 2 && "📱 Check your email and enter the verification code"}
            {step === 3 && "🎯 Almost done! Create your new secure password"}
          </p>

          {/* Message */}
          {message.text && (
            <div className={`
              text-center py-4 px-6 rounded-2xl mb-6 shadow-lg transform transition-all duration-500 animate-bounce
              ${message.type === "success" 
                ? "bg-gradient-to-r from-green-500/80 to-emerald-500/80 text-white border border-green-400/30" 
                : "bg-gradient-to-r from-red-500/80 to-pink-500/80 text-white border border-red-400/30"
              }
            `}>
              <div className="font-semibold flex items-center justify-center gap-2">
                {message.type === "success" ? "✅" : "❌"}
                {message.text}
              </div>
            </div>
          )}

          {/* Form */}
          {renderStep()}

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="text-gray-300 mb-4 text-sm">
              Remember your password?
            </div>
            <button 
              className="inline-flex items-center px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-white/10 hover:border-white/20"
              onClick={() => navigate('/login')}
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>

    
    </div>
  );
}

export default ResetPassword;