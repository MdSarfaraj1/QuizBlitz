import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { User, Bell, Shield,AlertTriangle } from "lucide-react";
export const SettingsNavigation = ({ activeSection, onSectionChange }) => {
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=john"
  };

  const navigationItems = [
    { title: "Profile", icon: User, id: "profile", color: "purple" },
    { title: "Security", icon: Shield, id: "security", color: "blue" },
    { title: "Notifications", icon: Bell, id: "notifications", color: "green" },
    { title: "Danger Zone", icon: AlertTriangle, id: "danger", color: "red" }
  ];

  return (
    <div className="w-full lg:w-80 lg:flex-shrink-0">
      <div className="lg:sticky lg:top-6 space-y-6">
        {/* User Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-y-0 space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-100">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{userData.name}</h3>
                <p className="text-sm text-gray-600">{userData.email}</p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Menu */}
        <Card>
          <CardContent className="p-2">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? `bg-${item.color}-100 text-${item.color}-700`
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => onSectionChange(item.id)}
                  >
                    <Icon className={`h-5 w-5 ${
                      isActive ? `text-${item.color}-600` : "text-gray-400"
                    }`} />
                    {item.title}
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};