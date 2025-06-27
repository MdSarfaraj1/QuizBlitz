import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { User, Camera, Mail, Edit3, Check, X } from "lucide-react";
import { Toast } from "../UI/toast";

export function ProfileSection() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://avatars.githubusercontent.com/u/12345678?v=4",
  });
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [avatarUrl, setAvatarUrl] = useState(userData.avatar);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setUserData({ name, email, avatar: avatarUrl });
      showToast("Profile updated successfully!", "success");
    } catch (error) {
      showToast("Failed to update profile. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateNewAvatar = () => {
    const seed = Math.random().toString(36).substring(2, 8);
    const newAvatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
    setAvatarUrl(newAvatarUrl);
  };

  return (
    <>
      <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative group">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg ring-2 ring-slate-100"
                />
                <button
                  type="button"
                  onClick={generateNewAvatar}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center text-white"
                >
                  <Camera className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h4 className="font-semibold text-slate-800">Profile Picture</h4>
                  <p className="text-sm text-slate-500">
                    Click on your avatar or use the button below to generate a new one
                  </p>
                </div>
                <button
                  type="button"
                  onClick={generateNewAvatar}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors duration-200 font-medium"
                >
                  <Camera className="w-4 h-4" />
                  Generate New Avatar
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid gap-6">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="name">
                  <Edit3 className="w-4 h-4" />
                  Display Name
                </label>
                <input
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your display name"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="email">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Used for important account notifications and login
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-600/25"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}