import { useState } from "react";
import { ProfileSection } from "./Profile";
import { SecuritySection } from "./Security";
import { NotificationsSection } from "./Notifications";
import  DeleteAccount  from "./DeleteAccount";
import { Sidebar } from "./Navigation"; 


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
      

      <main className="container max-w-7xl py-2 px-4">
        <div className="space-y-8">
          {/* Horizontal Navigation */}
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* Main Content */}
          <div className="max-w-4xl">
            <div className="animate-in fade-in-50 duration-300">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}