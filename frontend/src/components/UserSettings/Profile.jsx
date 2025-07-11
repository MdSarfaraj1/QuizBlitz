import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { User, Camera, Mail, Edit3, Check, X } from "lucide-react";
import { Toast } from "../UI/toast";
import { generateNewAvatar } from "../../Utills/GenerateAvatar"; // Assume this is a utility function to generate a new avatar
import axios from "axios";
import { useAuth } from "../../Context/UserContextProvider"; 
export function ProfileSection() {
  const {setUser ,userId,role} = useAuth();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [avatar, setAvatarUrl] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
const [selectedFile, setSelectedFile] = useState(null); // holds the selected image file
const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

useEffect(() => {
    // Simulate fetching user data from an API
    const fetchUserData = async () => {
      try {
        
        const response=await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/User/getProfile`,{withCredentials: true}); 
        if (response.status === 200) {
          setName(response.data.username || ""); // Set name from response
          setEmail(response.data.email || ""); // Set email from response
          setAvatarUrl(response.data.avatar || ""); // Set avatar from response
         
        }
        
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        showToast("Failed to load user data. Please try again later.", "error");
      }
    };
    fetchUserData();
  }, []);

const handleUploadImage = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAvatarUrl(URL.createObjectURL(file)); // show preview
    }
  };
  input.click();
};


const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

   if (selectedFile) {
     formData.append("avatar", selectedFile);
   } else {
     formData.append("avatarUrl", avatar); // send existing or new avatar URL
   }

    const res = await axios.put(
      `${import.meta.env.VITE_APP_BACKEND_URL}/User/updateProfile`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if(res.status===200){
      setAvatarUrl(res.data.avatar); 
      setUser(userId,name,res.data.avatar,role); // Update user context with new data
    showToast("Profile updated successfully!", "success");
    setSelectedFile(null);
    }
    
  } catch (error) {
    console.error(error);
    showToast("Failed to update profile. Please try again.", "error");
  } finally {
    setIsSubmitting(false);
  }
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
                  src={avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg ring-2 ring-slate-100"
                />
                <button
                  type="button"
                  onClick={()=>setAvatarUrl(generateNewAvatar)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center text-white"
                >
                  <Camera className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h4 className="font-semibold text-slate-800">Profile Picture</h4>
                  <p className="text-sm text-slate-500">
                    Click on your avatar to generate new or -</p>
                </div>
                <button
                  type="button"
                  onClick={handleUploadImage}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors duration-200 font-medium"
                >
                  <Camera className="w-4 h-4" />
                  Upload Image
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid gap-6">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="name">
                  <Edit3 className="w-4 h-4" />
                  User Name
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