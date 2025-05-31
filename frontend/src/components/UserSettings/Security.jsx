import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { Lock } from "lucide-react";
import {Toast} from "../UI/toast"; // adjust the path as needed

export function SecuritySection() {
  const [userPassword, setUserPassword] = useState("abc");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const updatePassword = useCallback(async (currentPassword, newPassword) => {
    await new Promise((res) => setTimeout(res, 1000)); // fake delay
    return currentPassword === userPassword;
  }, [userPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast("All fields are required", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("New passwords don't match", "error");
      return;
    }

    if (newPassword.length < 8) {
      showToast("Password must be at least 8 characters long", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await updatePassword(currentPassword, newPassword);

      if (success) {
        showToast("Password updated successfully!");
        setUserPassword(newPassword); 
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showToast("Failed to update password. Incorrect current password.", "error");
      }
    } catch {
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="profile-settings-label" htmlFor="currentPassword">Current Password</label>
              <input className="profile-settings-input"
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label className="profile-settings-label" htmlFor="newPassword">New Password</label>
              <input className="profile-settings-input"
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label className="profile-settings-label" htmlFor="confirmPassword">Confirm New Password</label>
              <input className="profile-settings-input"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="profile-settings-button w-full sm:w-auto"
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
          </form>
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
