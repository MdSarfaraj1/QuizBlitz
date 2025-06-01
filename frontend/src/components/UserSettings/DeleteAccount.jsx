import { useState } from "react";
import { Trash2, AlertTriangle, Shield, User, Database } from "lucide-react";

// Mock user context for demonstration
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  joinDate: "January 2024",
  postsCount: 24,
  commentsCount: 156
};

export default function DeleteAccount() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("error");

  const showToastMessage = (message, type = "error") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDeleteAccount = async () => {
    if (confirmation !== "DELETE") {
      showToastMessage("Please type DELETE to confirm");
      return;
    }

    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      showToastMessage("Account successfully deleted!", "success");
      setIsDialogOpen(false);
      setConfirmation("");
      setIsDeleting(false);
    }, 2000);
  };

  const resetDialog = () => {
    setIsDialogOpen(false);
    setConfirmation("");
    setIsDeleting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-2 bg-gray-50 min-h-screen">
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 ${
          toastType === "success" 
            ? "bg-green-50 border-green-200 text-green-800" 
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          <div className="flex items-center gap-2">
            {toastType === "success" ? (
              <Shield className="h-4 w-4" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
            {toastMessage}
          </div>
        </div>
      )}

    

      {/* Account Stats */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{mockUser.postsCount}</div>
            <div className="text-sm text-blue-700">Posts Created</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{mockUser.commentsCount}</div>
            <div className="text-sm text-green-700">Comments Made</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">5</div>
            <div className="text-sm text-purple-700">Months Active</div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow-sm border-2 border-red-200">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-700">Danger Zone</h3>
              <p className="text-sm text-red-600">Irreversible actions</p>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-800 mb-2">Delete Account</h4>
                <p className="text-sm text-red-700 mb-3">
                  Once you delete your account, there is no going back. This action will permanently remove:
                </p>
                <ul className="text-sm text-red-700 space-y-1 ml-4">
                  <li>• Your profile and personal information</li>
                  <li>• All your posts and comments</li>
                  <li>• Your account settings and preferences</li>
                  <li>• Any uploaded files or media</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Delete Account</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <Database className="h-4 w-4" />
                  <span className="font-medium">Data to be deleted:</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 ml-6">
                  <li>• Profile: {mockUser.name} ({mockUser.email})</li>
                  <li>• {mockUser.postsCount} posts and {mockUser.commentsCount} comments</li>
                  <li>• All account settings and preferences</li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-700 mb-3">
                  To confirm, please type <span className="font-bold text-red-600">DELETE</span> below:
                </p>
                <input
                  type="text"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  placeholder="Type DELETE to confirm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={resetDialog}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || confirmation !== "DELETE"}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete Account
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}