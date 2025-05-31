import { useState } from "react";
import { ProfileSection } from "../components/UserSettings/Profile";
import { SecuritySection } from "../components/UserSettings/Security";
// import { NotificationsSection } from "@/components/settings/NotificationsSection";
// import { DangerZoneSection } from "@/components/settings/DangerZoneSection";
import { Home } from "lucide-react";
import { SettingsSidebar } from "../components/UserSettings/Settings"; 
import {Link} from 'react-router-dom'
export default function UserSettings() {
  const [activeSection, setActiveSection] = useState("profile");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "security":
        return <SecuritySection />;
      // case "notifications":
      //   return <NotificationsSection />;
      // case "danger":
      //   return <DangerZoneSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
     
        <div className="h-screen bg-background overflow-x-hidden">
          <header className="border-b">
            <div className="container flex items-center justify-between h-16 max-w-7xl">
              <h1 className="text-2xl font-bold text-quizDashboard-primary">Your Settings</h1>
              <Link
                href="/dashboard"
                className="text-lg flex text-slate-600  hover:text-[#7c3bed] transition-colors hover:underline font-medium"
              ><Home className="w-8 h-6"/> Return to Dashboard
              </Link>

            </div>
          </header>

          <main className="container max-w-7xl py-6 px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar - On mobile */}
              <div className="md:hidden mb-4">
                <SettingsSidebar
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                />
              </div>

              {/* Desktop Sidebar */}
              <div className="hidden md:block">
                <SettingsSidebar
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                />
              </div>

              {/* Main Content Area */}
              <div className="flex-1 space-y-6">
                {renderActiveSection()}
              </div>
            </div>
          </main>
        </div>
    
  
  );
}