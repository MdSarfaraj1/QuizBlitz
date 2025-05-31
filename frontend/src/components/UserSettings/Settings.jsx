
import { cn } from "../../Utills/cn";
import { Pencil, Lock, Bell, Trash, LogOut } from "lucide-react";
export function Settings({ activeSection, onSectionChange }) {
  const userData = {
    name: "John Doe",
    email: "abcd@gmail.ocm",
    avatar: "https://avatars.githubusercontent.com/u/12345678?v=4", // Placeholder avatar URL
  }

  const navigationItems = [
    { title: "Profile", icon: <Pencil className="h-4 w-4" />, id: "profile" },
    { title: "Security", icon: <Lock className="h-4 w-4" />, id: "security" },
    { title: "Notifications", icon: <Bell className="h-4 w-4" />, id: "notifications" },
    { title: "Account", icon: <Trash className="h-4 w-4" />, id: "danger" },
    
  ];

  return (
    <div className="w-full md:w-60 md:flex-shrink-0 border-r  md:pt-6">
      <div className="md:sticky md:top-6 space-y-6 p-4 md:p-0">
        <div className="flex flex-col items-center md:items-start space-y-3 md:px-4">
          <img
            src={userData.avatar}
            alt={userData.name}
            className="w-16 h-16 rounded-full border-2 border-purple-700 p-0.5"
          />
          <div className="text-center md:text-left">
            <h3 className="font-semibold">{userData.name}</h3>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
          </div>
        </div>

        {/* options */}
        <div className="grid md:grid-cols-1 grid-cols-3 gap-1 mr-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={cn( "flex gap-2 px-4 py-2 rounded-md  text-slate-900 font-sans hover:bg-purple-100 font-semibold text-sm tracking-wide",
                activeSection === item.id ? "bg-[#7c3bed] text-white hover:bg-[#7c3bed]/90" : " ",
                
              )}
              onClick={() => onSectionChange(item.id)}
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}