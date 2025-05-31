import { useState } from "react";
import { useUser } from "@/context/user-context";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { Bell } from "lucide-react";

export function NotificationsSection() {
  const { userData, updateNotifications } = useUser();

  const handleToggleEmailNotifications = (checked) => {
    updateNotifications("email", checked);
    toast.success(checked ? "Email notifications enabled" : "Email notifications disabled");
  };

  const handleTogglePushNotifications = (checked) => {
    updateNotifications("push", checked);
    toast.success(checked ? "Push notifications enabled" : "Push notifications disabled");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="profile-settings-iabel" htmlFor="email-notifications">Email Notifications</label  >
              <p className="text-sm text-muted-foreground">
                Receive quiz updates and important announcements via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={userData.notifications.email}
              onCheckedChange={handleToggleEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="profile-settings-iabel" htmlFor="push-notifications">Push Notifications</label  >
              <p className="text-sm text-muted-foreground">
                Get real-time updates and reminders as push notifications
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={userData.notifications.push}
              onCheckedChange={handleTogglePushNotifications}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}