import { useState } from "react";
import { ProfileSection } from "./Profile";
import { SecuritySection } from "./Security";
// import { NotificationsSection } from "@/components/settings/NotificationsSection";
// import { DangerZoneSection } from "@/components/settings/DangerZoneSection";
import { Home } from "lucide-react";
import { SettingsNavigation } from "./SettingsNavigation"; 
import {Link} from 'react-router-dom'



  const UserSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "security":
        return <SecuritySection />;
      case "notifications":
        return <NotificationsSection />;
      case "danger":
        return <DangerZoneSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          <SettingsNavigation 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
          
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
