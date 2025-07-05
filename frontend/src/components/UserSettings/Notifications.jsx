
// Enhanced Notifications.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { Bell, Mail, Smartphone, Volume2, MessageSquare, Calendar, Zap } from "lucide-react";
import { Toast } from "../UI/toast";

export function NotificationsSection() {
  const [userData, setUserData] = useState({
    notifications: {
      email: true,
      push: false,
      reminders: true,
    }
  });
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const updateNotifications = (type, checked) => {
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: checked
      }
    }));
    showToast(
      checked 
        ? `${type.charAt(0).toUpperCase() + type.slice(1)} notifications enabled` 
        : `${type.charAt(0).toUpperCase() + type.slice(1)} notifications disabled`,
      "success"
    );
  };

  const notificationSettings = [
    {
      id: 'email',
      title: 'Email Notifications',
      description: 'Receive quiz updates and important announcements via email',
      icon: Mail,
      color: 'blue',
      checked: userData.notifications.email
    },
    {
      id: 'push',
      title: 'Push Notifications',
      description: 'Get real-time updates and reminders as push notifications',
      icon: Smartphone,
      color: 'green',
      checked: userData.notifications.push
    },
    {
      id: 'reminders',
      title: 'Study Reminders',
      description: 'Get reminded about upcoming quizzes and study sessions',
      icon: Calendar,
      color: 'purple',
      checked: userData.notifications.reminders
    },

  ];

  return (
    <>
      <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-slate-100">
          <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-xl">
              <Bell className="h-6 w-6 text-yellow-600" />
            </div>
            Notification Preferences
          </CardTitle>
          <p className="text-slate-600 mt-2">Choose how you want to be notified about updates and reminders</p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {notificationSettings.map((setting) => {
              const IconComponent = setting.icon;
              return (
                <div key={setting.id} className="group">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-${setting.color}-100 rounded-xl group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className={`w-5 h-5 text-${setting.color}-600`} />
                      </div>
                      <div className="space-y-1">
                        <label 
                          className="text-lg font-semibold text-slate-800 cursor-pointer" 
                          htmlFor={`${setting.id}-notifications`}
                        >
                          {setting.title}
                        </label>
                        <p className="text-sm text-slate-500 max-w-md">
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Custom Toggle Switch */}
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={`${setting.id}-notifications`}
                        className="sr-only"
                        checked={setting.checked}
                        onChange={(e) => updateNotifications(setting.id, e.target.checked)}
                      />
                      <button
                        type="button"
                        onClick={() => updateNotifications(setting.id, !setting.checked)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                          setting.checked
                            ? `bg-${setting.color}-600`
                            : 'bg-slate-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                            setting.checked ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

         
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