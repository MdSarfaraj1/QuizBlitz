import { cn } from "../../Utills/cn";
import { Pencil, Lock, Bell, Trash, User } from "lucide-react";

export function Sidebar({ activeSection, onSectionChange }) {
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://avatars.githubusercontent.com/u/12345678?v=4",
  }

  const navigationItems = [
    { title: "Profile", icon: <User className="h-4 w-4" />, id: "profile", color: "from-blue-500 to-blue-600" },
    { title: "Security", icon: <Lock className="h-4 w-4" />, id: "security", color: "from-green-500 to-green-600" },
    { title: "Notifications", icon: <Bell className="h-4 w-4" />, id: "notifications", color: "from-yellow-500 to-yellow-600" },
    { title: "Danger Zone", icon: <Trash className="h-4 w-4" />, id: "danger", color: "from-red-500 to-red-600" },
  ];

  return (
    <div className="w-full lg:w-72 lg:flex-shrink-0">
      <div className="lg:sticky lg:top-24 space-y-6">
        {/* User Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg ring-2 ring-purple-100"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-800">{userData.name}</h3>
              <p className="text-sm text-slate-500">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60">
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group relative overflow-hidden",
                  activeSection === item.id
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-600/25"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <div className={cn(
                  "p-2 rounded-lg",
                  activeSection === item.id
                    ? "bg-white/20"
                    : "bg-slate-100 group-hover:bg-slate-200"
                )}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.title}</span>
                {activeSection === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r opacity-10 from-white to-transparent" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}