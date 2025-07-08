import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { Bell, Mail, Calendar } from "lucide-react";
import { Toast } from "../UI/toast";
import axios from "axios";

export function NotificationsSection() {
  const [notificationData, setNotificationData] = useState({
    email: false,
    remainders: false,
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Fetch notification settings from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/User/getNotifications`,
          { withCredentials: true }
        );
        if (res.status !== 200) {
          throw new Error("Failed to fetch notification settings");
        }
        setNotificationData(res.data.notifications);
      } catch (e) {
        showToast("Could not load notification settings", "error");
        console.error("Error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Update notification settings in backend
  const updateNotifications = async (type, checked) => {
    setNotificationData((prev) => ({
      ...prev,
      [type]: checked,
    }));

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/User/updateNotifications`,
        {notifications: {...notificationData, [type]: checked,}},
        { withCredentials: true }
      );

      showToast(
        checked
          ? `${type.charAt(0).toUpperCase() + type.slice(1)} notifications enabled`
          : `${type.charAt(0).toUpperCase() + type.slice(1)} notifications disabled`,
        "success"
      );
    } catch (error) {
      showToast("Could not update notification settings", "error");
      // Revert UI state
      setNotificationData((prev) => ({...prev,[type]: !checked,}));
    } finally {
      setLoading(false);
    }
  };

  const notificationSettings = [
    {
      id: "email",
      title: "Email Notifications",
      description: "Receive quiz updates and important announcements via email",
      icon: Mail,
      color: "blue",
      checked: notificationData.email,
    },
    {
      id: "remainders",
      title: "Study Reminders",
      description: "Get reminded about upcoming quizzes and study sessions",
      icon: Calendar,
      color: "green",
      checked: notificationData.remainders,
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
          <p className="text-slate-600 mt-2">
            Choose how you want to be notified about updates and remainders
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {loading ? (
              <div className="text-center text-slate-500 py-8">Loading...</div>
            ) : (
              notificationSettings.map((setting) => {
                const IconComponent = setting.icon;
                return (
                  <div key={setting.id} className="group">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 bg-${setting.color}-100 rounded-xl group-hover:scale-110 transition-transform duration-200`}
                        >
                          <IconComponent
                            className={`w-5 h-5 text-${setting.color}-600`}
                          />
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
                      {/* Toggle */}
                      <div className="relative">
                        <input
                          type="checkbox"
                          id={`${setting.id}-notifications`}
                          className="sr-only"
                          checked={setting.checked}
                          onChange={(e) =>
                            updateNotifications(setting.id, e.target.checked)
                          }
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateNotifications(setting.id, !setting.checked)
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                            setting.checked
                              ? `bg-${setting.color}-600`
                              : "bg-slate-200"
                          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                          disabled={loading}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              setting.checked
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
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
