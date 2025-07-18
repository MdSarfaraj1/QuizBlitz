import { useEffect, useState } from "react";
import { Trash2, AlertTriangle, Shield, User, Database ,ClipboardList, FilePlus2, Award, Star} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/UserContextProvider";



const fallbackUser = {
  username: "John Doe",
  email: "john.doe@example.com",
  totalQuizzesTaken: 65,
  totalCreatedQuizzes: 10,
  rank: 5,
  totalScore: 1200,
};

export default function DeleteAccount({ user }) {
  const { setUser } = useAuth(); 
 const navigate = useNavigate();
  // Use real user from props/context, fallback to mock
  const [currentUser,setCurrentUser] = useState(user || fallbackUser)
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
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/User/getProfile`, {
        withCredentials: true});
      if(res.status==200) {
        const data = res.data;
      setCurrentUser(data);
      } else {
       console.alert("Failed to fetch user data");
      }
    } catch (err) {
      showToastMessage(err.message || "Error fetching user data");
    }
  }
  fetchUserData();
},[])

  const handleDeleteAccount = async () => {
    if (confirmation !== "DELETE") {
      showToastMessage("Please type DELETE to confirm");
      return;
    }

    setIsDeleting(true);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/User/deleteAccount`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        
        resetDialog();
        showToastMessage("Account deleted successfully", "success");
       //logout
          await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/user/logout`,{},{ withCredentials: true, });
          setUser(null, null,null,null); // Clear from context
          navigate("/");
       
      } else {
        showToastMessage("Failed to delete account");
      }
    } catch (err) {
      showToastMessage(err.message || "Error deleting account");
    } 
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
     

<div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-6">📊 Account Activity</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    
    <div className="group bg-blue-50 rounded-xl p-5 transition hover:shadow-lg hover:bg-blue-100">
      <div className="flex items-center gap-3 mb-2">
        <ClipboardList className="w-6 h-6 text-blue-600 group-hover:text-blue-800" />
        <div className="text-2xl font-extrabold text-blue-700 group-hover:text-blue-900">
          {currentUser.totalQuizzesTaken}
        </div>
      </div>
      <div className="text-sm font-medium text-blue-800">Quizzes Taken</div>
    </div>

    <div className="group bg-green-50 rounded-xl p-5 transition hover:shadow-lg hover:bg-green-100">
      <div className="flex items-center gap-3 mb-2">
        <FilePlus2 className="w-6 h-6 text-green-600 group-hover:text-green-800" />
        <div className="text-2xl font-extrabold text-green-700 group-hover:text-green-900">
          {currentUser.totalCreatedQuizzes}
        </div>
      </div>
      <div className="text-sm font-medium text-green-800">Quizzes Created</div>
    </div>

    <div className="group bg-purple-50 rounded-xl p-5 transition hover:shadow-lg hover:bg-purple-100">
      <div className="flex items-center gap-3 mb-2">
        <Award className="w-6 h-6 text-purple-600 group-hover:text-purple-800" />
        <div className="text-2xl font-extrabold text-purple-700 group-hover:text-purple-900">
          #{currentUser.rank}
        </div>
      </div>
      <div className="text-sm font-medium text-purple-800">Rank</div>
    </div>

    <div className="group bg-yellow-50 rounded-xl p-5 transition hover:shadow-lg hover:bg-yellow-100">
      <div className="flex items-center gap-3 mb-2">
        <Star className="w-6 h-6 text-yellow-600 group-hover:text-yellow-800" />
        <div className="text-2xl font-extrabold text-yellow-700 group-hover:text-yellow-900">
          {currentUser.totalScore}
        </div>
      </div>
      <div className="text-sm font-medium text-yellow-800">Points Obtained</div>
    </div>

  </div>
</div>


      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow-sm border-2 border-red-200">
        <div className="p-6">
          

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
                  <li>• Profile: {currentUser.username} ({currentUser.email})</li>
                  <li>• Participations and Creations</li>
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