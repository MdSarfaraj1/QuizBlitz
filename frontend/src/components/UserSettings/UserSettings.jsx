import { useState } from "react";
import { ProfileSection } from "./Profile";
import { SecuritySection } from "./Security";
import { NotificationsSection } from "./Notifications";
import  DeleteAccount  from "./DeleteAccount";
import { Home, Settings as SettingsIcon } from "lucide-react";
import { Sidebar } from "./Sidebar"; 
import { Link } from 'react-router-dom'

export default function UserSettings() {
  const [activeSection, setActiveSection] = useState("profile");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "security":
        return <SecuritySection />;
      case "notifications":
        return <NotificationsSection />;
      case "danger":
        return <DeleteAccount />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-10">
        <div className="container flex items-center justify-between h-20 max-w-7xl px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-800 bg-clip-text text-transparent">
                Account Settings
              </h1>
              <p className="text-sm text-slate-500">Manage your account preferences</p>
            </div>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-800 transition-all duration-200 font-medium group"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Dashboard
          </Link>
        </div>
      </header>

      <main className="container max-w-7xl py-8 px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <div className="animate-in fade-in-50 duration-300">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
