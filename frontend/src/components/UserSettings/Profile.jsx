import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { Pencil } from "lucide-react";
import { Toast } from "../UI/toast";

export function ProfileSection() {
  const [userData, updateUserData] = useState({
    name: "John Doe",
    email: "abcd@gmail.com",
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

      updateUserData({ name, email, avatar: avatarUrl });
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
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Pencil className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent>
         <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative group">
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full border-2 border-purple-700 bg-white"
              />
              <button
                type="button"
                onClick={generateNewAvatar}
                className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
              >
                Change
              </button>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">
                Your profile picture
              </p>
              <button
                className="profile-settings-button bg-slate-400"
                onClick={generateNewAvatar}
                variant="outline"
                size="sm"
              >
                Generate New Avatar
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="profile-settings-label" htmlFor="name">Display Name</label>
            <input className="profile-settings-input"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your display name"
            />
          </div>

          <div className="space-y-2">
            <label className="profile-settings-label" htmlFor="email">Email Address</label>
            <input className="profile-settings-input"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
            />
            <p className="text-xs text-muted-foreground">
              Your email is used for important account notifications.
            </p>
          </div>

          <button className="profile-settings-button" disabled={isSubmitting} >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
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

