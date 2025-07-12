import React, { useState } from 'react';
import axios from 'axios';
import { User, ChevronDown, ChevronRight, Save, X, Trash2,  Edit, Search, PlusCircle } from 'lucide-react'; // Import Search icon

const UserManagement = ({ users, setUsers, expanded, toggleSection }) => {
  const [pendingUserRoleChanges, setPendingUserRoleChanges] = useState({});
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');

  // New state for Add User Modal
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('user'); // Default role for new users

  // State for editing user (now handles both name/email and role)
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserName, setEditedUserName] = useState('');
  const [editedUserEmail, setEditedUserEmail] = useState('');

  // New state for search term
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Updates the role for a user in the pending changes state.
   * This is called when the dropdown value changes while in edit mode.
   */
  const handleRoleChange = (userId, newRole) => {
    setPendingUserRoleChanges((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  /**
   * Starts the editing mode for a user's name, email, and role.
   * Initializes input fields and the role dropdown with current values.
   */
  const startEditingUser = (user) => {
    setEditingUserId(user.id);
    setEditedUserName(user.name);
    setEditedUserEmail(user.email);
    // Initialize pending role change with the current role
    handleRoleChange(user.id, user.role);
  };

 
  const cancelEditingUser = (userId) => {
    setEditingUserId(null);
    setEditedUserName('');
    setEditedUserEmail('');
    // Clear any pending role changes for this user
    setPendingUserRoleChanges((prev) => {
      const newState = { ...prev };
      delete newState[userId];
      return newState;
    });
  };

  /**
   * Saves all changes (name, email, and role) for a user.
   * In a real app, this would hit an API.
   */
  const saveUserChanges = async (userId) => {
    if (!editedUserName || !editedUserEmail) {
      console.error("Name and Email cannot be empty.");
      return;
    }
console.log("going to update user by aadmin",userId)
    const newRole = pendingUserRoleChanges[userId];
    try {
      const res = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/Admin/updateUserByAdmin/${userId}`, {
        name: editedUserName,
        email: editedUserEmail,
        role: newRole,
      }, {
        withCredentials: true,
      });
      const updatedUser = res.data.user;
      if(res.status==200){
        setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
              }
            : user
        )
      );
      }
      cancelEditingUser(userId);
    } catch (err) {
        if (err.response && err.response.status === 400) {
    alert(err.response.data.message); 
 
  }else
     alert("Some error occurred while updating.");
      console.error('Failed to update user:', err);
    }
  };
//deleteuser
  const deleteUser = async (userIdToDelete) => {
    if (!userIdToDelete) return;
    try {
      const res=await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/Admin/deleteUserByAdmin/${userIdToDelete}`, {
        data: { reason: deleteReason },
        withCredentials: true,
      });
      if(res.status==204)
      {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userIdToDelete));
      setShowDeleteUserModal(null);
      setDeleteReason('');
      }
      
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  // Handles adding a new user. In a real app, this would hit an API.
  const handleAddUser = async () => {
    if (!newUserName || !newUserEmail) {
      console.error("Name and Email are required to add a new user.");
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/Admin/addNewUser`, {
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
      }, {
        withCredentials: true,
      });
      if(res.status==201){
        const newUser = res.data.user;
      setUsers((prevUsers) => [...prevUsers, newUser]);
      }
      else if(res.status==409)
      {
        alert(res.data.message);
      }
      
    } catch (err) {
      console.error('Failed to add user:', err);
    }finally{
        setShowAddUserModal(false);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserRole('user');
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mb-10 bg-white rounded-2xl shadow-xl transform transition-all duration-300 hover:shadow-2xl">
      <div
        onClick={() => toggleSection("users")}
        className="flex items-center cursor-pointer p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-2xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200"
      >
        {expanded ? (
          <ChevronDown className="w-6 h-6 text-blue-300" />
        ) : (
          <ChevronRight className="w-6 h-6 text-blue-300" />
        )}
        <User className="ml-3 w-7 h-7" />
        <h2 className="ml-4 text-2xl font-bold tracking-wide">
          User Management
        </h2>
      </div>

      {expanded && (
        <div className="p-6">
          {/* Add New User Button - Moved above search bar */}

          {/* Search Bar and add user button */}
          <div className="mb-6 flex justify-between items-center">
            {/* search bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {/* add user button */}
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={() => setShowAddUserModal(true)}
                className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold py-2 px-3 rounded-md border border-indigo-600 hover:border-indigo-800 transition-colors duration-200"
              >
                <PlusCircle className="w-4 h-4 mr-1" /> Add User
              </button>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Name Field */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {editingUserId === user.id ? (
                          <input
                            type="text"
                            value={editedUserName}
                            onChange={(e) => setEditedUserName(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md w-full"
                          />
                        ) : (
                          <>
                            {user.name}
                            <br />
                            <span style={{ fontSize: "0.75em", color: "#666" }}>
                              ID: {user.id}
                            </span>
                          </>
                        )}
                      </td>
                      {/* Email Field */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {editingUserId === user.id ? (
                          <input
                            type="email"
                            value={editedUserEmail}
                            onChange={(e) => setEditedUserEmail(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md w-full"
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      {/* Role Field - Conditional Rendering */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {editingUserId === user.id ? ( // Role is editable if editingUserId is set
                          <select
                            value={pendingUserRoleChanges[user.id] || user.role} // Show pending change or current role
                            onChange={(e) =>
                              handleRoleChange(user.id, e.target.value)
                            }
                            className={`block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none sm:text-sm
                                          ${
                                            pendingUserRoleChanges[user.id] &&
                                            pendingUserRoleChanges[user.id] !==
                                              user.role
                                              ? "border-indigo-500 bg-indigo-50"
                                              : "border-gray-300 bg-white"
                                          }`}
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <span className="text-gray-900 capitalize">
                            {user.role}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {editingUserId === user.id ? (
                            // User is being edited: Show Save/Cancel for all changes
                            <>
                              <button
                                onClick={() => saveUserChanges(user.id)}
                                className="text-green-600 hover:text-green-900"
                                title="Save Changes"
                              >
                                <Save className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => cancelEditingUser(user.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Cancel Changes"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </>
                          ) : (
                            // No edit in progress: Show Edit and Delete buttons
                            <>
                              <button
                                onClick={() => startEditingUser(user)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Edit User"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => setShowDeleteUserModal(user.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Delete User"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {showDeleteUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl transform scale-95 animate-zoom-in">
            <h3 className="font-bold text-2xl text-red-700 mb-4 text-center">
              Delete User Confirmation
            </h3>
            <p className="mb-6 text-center text-gray-700">
              Are you sure you want to delete this user? Please provide a brief
              reason for this action.
            </p>
            <textarea
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              placeholder="Reason for deletion..."
              className="border border-gray-300 p-3 w-full rounded-lg mb-6 resize-y focus:outline-none focus:ring-2 focus:ring-red-400 text-base"
              rows="4"
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setShowDeleteUserModal(null);
                  setDeleteReason("");
                }}
                className="flex-1 border border-gray-300 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-all duration-200 font-semibold shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteUser(showDeleteUserModal)}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold shadow-md"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4  animate-fade-in">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl transform scale-95 animate-zoom-in">
            <h3 className="font-bold text-2xl text-indigo-700 mb-6 text-center">
              Add New User
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="newUserName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="newUserName"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Enter user's name"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
                />
              </div>
              <div>
                <label
                  htmlFor="newUserEmail"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="newUserEmail"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="Enter user's email"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
                />
              </div>
              <div>
                <label
                  htmlFor="newUserRole"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Role:
                </label>
                <select
                  id="newUserRole"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => {
                  setShowAddUserModal(false);
                  setNewUserName("");
                  setNewUserEmail("");
                  setNewUserRole("user");
                }}
                className="flex-1 border border-gray-300 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-all duration-200 font-semibold shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold shadow-md"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserManagement;
