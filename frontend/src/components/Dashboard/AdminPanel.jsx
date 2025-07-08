import React, { useState } from 'react';
import {
  Plus, Edit3, Trash2, Users, UserCheck, UserX,
  Megaphone, Bell, Brain, Calendar, Search, Filter, Save, X, ChevronDown, ChevronRight, Mail, Wand2 // Added Wand2 for sparkle effect
} from 'lucide-react';
import AIQuizGenerator from './AiQuizGenerator';

const AdminPanel = () => {
  // State to manage the expansion of different sections (categories, users, communication, advanced)
  const [expandedSections, setExpandedSections] = useState({
    categories: false, users: false, communication: false, aiQuiz: false, advanced: false
  });

  // State for search queries in categories and users sections
  const [searchCategory, setSearchCategory] = useState('');
  const [searchUser, setSearchUser] = useState('');

  // State for managing category editing
  const [editCategoryId, setEditCategoryId] = useState(null); // Stores the ID of the category being edited
  const [editedCategories, setEditedCategories] = useState({}); // Stores changes to categories before saving

  // State for controlling the visibility of the "Add Category" modal
  const [showAddCategory, setShowAddCategory] = useState(false);
  // State for new category input values
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');

  // Sample data for categories
  const [categories, setCategories] = useState([
    { id: 1, name: 'Science', description: 'Physics, Chemistry, Biology', quizCount: 15 },
    { id: 2, name: 'Mathematics', description: 'Algebra, Geometry, Calculus', quizCount: 22 },
    { id: 3, name: 'History', description: 'World History, Ancient Civilizations', quizCount: 8 }
  ]);

  // Sample data for users
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', joinDate: '2024-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'user', joinDate: '2024-03-10' }
  ]);

  // State for managing pending user role changes before saving
  const [pendingUserRoleChanges, setPendingUserRoleChanges] = useState({});

  // State for managing the "Delete User" modal
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(null); // Stores the ID of the user to be deleted
  const [deleteReason, setDeleteReason] = useState(''); // Stores the reason for user deletion

  // States for Gemini API integrations
  const [quizTopicPrompt, setQuizTopicPrompt] = useState('');
  const [quizSuggestions, setQuizSuggestions] = useState([]);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [isDraftingAnnouncement, setIsDraftingAnnouncement] = useState(false);

  /**
   * Toggles the expanded state of a given section.
   * @param {string} sec - The name of the section to toggle (e.g., 'users', 'categories').
   */
  const toggleSection = sec =>
    setExpandedSections(prev => ({ ...prev, [sec]: !prev[sec] }));

  /**
   * Saves all pending changes to category data.
   */
  const saveAllCategoryEdits = () => {
    setCategories(currentCategories =>
      currentCategories.map(cat =>
        editedCategories[cat.id]
          ? { ...cat, ...editedCategories[cat.id] }
          : cat
      )
    );
    setEditedCategories({}); // Clear all pending edits
    setEditCategoryId(null); // Exit all edit modes
  };

  /**
   * Cancels all pending changes to category data and exits edit mode.
   */
  const cancelAllCategoryEdits = () => {
    setEditedCategories({});
    setEditCategoryId(null); // Exit all edit modes
  };

  /**
   * Adds a new category to the list.
   */
  const addNewCategory = () => {
    if (!newCategoryName.trim()) return; // Prevent adding empty categories
    const newId = Math.max(...categories.map(c => c.id), 0) + 1; // Generate unique ID
    setCategories(prev => [
      ...prev,
      { id: newId, name: newCategoryName, description: newCategoryDescription, quizCount: 0 }
    ]);
    // Clear input fields and close modal
    setNewCategoryName('');
    setNewCategoryDescription('');
    setShowAddCategory(false);
  };

  /**
   * Saves all pending user role changes.
   */
  const saveUserChanges = () => {
    setUsers(currentUsers =>
      currentUsers.map(user => {
        if (pendingUserRoleChanges[user.id] !== undefined) {
          return { ...user, role: pendingUserRoleChanges[user.id] };
        }
        return user;
      })
    );
    setPendingUserRoleChanges({}); // Clear pending changes
  };

  /**
   * Cancels all pending user role changes.
   */
  const cancelUserChanges = () => {
    setPendingUserRoleChanges({});
  };


  /**
   * Deletes a user from the list.
   * @param {number} userId - The ID of the user to delete.
   */
  const deleteUser = userId => {
    if (!deleteReason.trim()) return; // Require a reason for deletion
    setUsers(uList => uList.filter(u => u.id !== userId));
    setShowDeleteUserModal(null); // Close modal
    setDeleteReason(''); // Clear reason
    // If the deleted user had pending role changes, clear them
    setPendingUserRoleChanges(prev => {
      const updated = { ...prev };
      delete updated[userId];
      return updated;
    });
  };

  /**
   * Calls the Gemini API to generate quiz topic suggestions.
   */
  const generateQuizTopics = async () => {
    if (!quizTopicPrompt.trim()) return;
    setIsGeneratingQuiz(true);
    setQuizSuggestions([]); // Clear previous suggestions

    try {
      let chatHistory = [];
      const prompt = `Generate 5 unique and engaging quiz topic ideas for a quiz category about "${quizTopicPrompt}". Provide only the list of topics, one per line.`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will automatically provide the API key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setQuizSuggestions(text.split('\n').filter(s => s.trim() !== ''));
      } else {
        setQuizSuggestions(['Failed to generate suggestions.']);
        console.error('Gemini API response format unexpected:', result);
      }
    } catch (error) {
      console.error('Error generating quiz topics:', error);
      setQuizSuggestions(['Error generating suggestions. Please try again.']);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  /**
   * Calls the Gemini API to draft an announcement message.
   */
  const draftAnnouncement = async () => {
    if (!announcementMessage.trim()) return;
    setIsDraftingAnnouncement(true);

    try {
      let chatHistory = [];
      const prompt = `Draft a concise and engaging announcement message based on the following key points: "${announcementMessage}". Make it suitable for a quiz app users. Keep it under 100 words.`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will automatically provide the API key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setAnnouncementMessage(text); // Update the announcement message with the drafted text
      } else {
        console.error('Gemini API response format unexpected:', result);
      }
    } catch (error) {
      console.error('Error drafting announcement:', error);
    } finally {
      setIsDraftingAnnouncement(false);
    }
  };


  // Filtered lists for display based on search queries
  const displayedCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchCategory.toLowerCase())
  );
  const displayedUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  // Check if there are any pending user role changes
  const hasUserChanges = Object.keys(pendingUserRoleChanges).length > 0;

  // Check if there are any pending category edits
  const hasCategoryChanges = Object.keys(editedCategories).length > 0;

  return (
    // Main container for the admin panel, with a subtle gradient background and improved font
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-inter text-gray-800 antialiased">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-blue-900 mb-8 text-center drop-shadow-sm">Admin Dashboard</h1>

      {/* Users Section */}
      <section className="mb-10 bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div onClick={() => toggleSection('users')}
          className="flex items-center cursor-pointer p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-2xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200">
          {expandedSections.users ? <ChevronDown className="w-6 h-6 text-blue-200" /> : <ChevronRight className="w-6 h-6 text-blue-200" />}
          <Users className="ml-3 w-7 h-7" />
          <h2 className="ml-4 text-2xl font-bold tracking-wide">Manage Users</h2>
        </div>
        {expandedSections.users && (
          <div className="p-6">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={searchUser}
                onChange={e => setSearchUser(e.target.value)}
                placeholder="Search users by name or email..."
                className="pl-12 pr-6 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-lg"
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              {displayedUsers.map(user => {
                // Determine the current effective role, considering pending changes
                const effectiveRole = pendingUserRoleChanges[user.id] !== undefined
                  ? pendingUserRoleChanges[user.id]
                  : user.role;

                return (
                  <div key={user.id} className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-xl ring-2 ring-blue-300 group-hover:ring-blue-400 transition-all duration-200">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-0 sm:ml-4 mt-3 sm:mt-0 text-center sm:text-left flex-grow">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{user.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start mb-1"><Mail className="w-4 h-4 mr-1" /> {user.email}</p>
                      <p className="text-xs text-gray-500">Joined: {user.joinDate}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0 sm:ml-4 items-center justify-center">
                      <span className={`px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                        effectiveRole === 'admin' ? 'bg-purple-100 text-purple-800 border border-purple-300' : 'bg-green-100 text-green-800 border border-green-300'
                      }`}>
                        {effectiveRole}
                      </span>
                      <button onClick={() => {
                        const newRole = effectiveRole === 'admin' ? 'user' : 'admin';
                        setPendingUserRoleChanges(prev => ({
                          ...prev,
                          [user.id]: newRole
                        }));
                      }} className="flex items-center justify-center p-2.5 rounded-full text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-all duration-200 shadow-sm hover:shadow-md group">
                        {effectiveRole === 'admin' ? <UserX className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                        <span className="ml-2 hidden group-hover:inline-block"> {effectiveRole === 'admin' ? 'Demote' : 'Promote'}</span>
                      </button>
                      <button onClick={() => setShowDeleteUserModal(user.id)}
                        className="p-2.5 rounded-full text-red-600 hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {hasUserChanges && (
              <div className="flex justify-end gap-4 mt-6">
                <button onClick={cancelUserChanges}
                  className="flex items-center bg-gray-200 text-gray-800 px-6 py-3 rounded-xl shadow-md hover:bg-gray-300 transition-all duration-200 font-semibold text-lg">
                  <X className="mr-2 w-5 h-5" /> Cancel
                </button>
                <button onClick={saveUserChanges}
                  className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200 font-semibold text-lg">
                  <Save className="mr-2 w-5 h-5" /> Save Changes
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Delete User Modal */}
      {showDeleteUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl transform scale-95 animate-zoom-in">
            <h3 className="font-bold text-2xl text-red-700 mb-4 text-center">Delete User Confirmation</h3>
            <p className="mb-6 text-center text-gray-700">
              Are you sure you want to delete this user? Please provide a brief reason for this action.
            </p>
            <textarea
              value={deleteReason}
              onChange={e => setDeleteReason(e.target.value)}
              placeholder="Reason for deletion..."
              className="border border-gray-300 p-3 w-full rounded-lg mb-6 resize-y focus:outline-none focus:ring-2 focus:ring-red-400 text-base"
              rows="4"
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setShowDeleteUserModal(null)}
                className="flex-1 border border-gray-300 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-all duration-200 font-semibold shadow-sm">
                Cancel
              </button>
              <button onClick={() => deleteUser(showDeleteUserModal)}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold shadow-md">
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Section */}
      <section className="mb-10 bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div onClick={() => toggleSection('categories')}
          className="flex items-center cursor-pointer p-5 bg-gradient-to-r from-teal-600 to-green-700 text-white rounded-t-2xl hover:from-teal-700 hover:to-green-800 transition-all duration-200">
          {expandedSections.categories ? <ChevronDown className="w-6 h-6 text-teal-200" /> : <ChevronRight className="w-6 h-6 text-teal-200" />}
          <Plus className="ml-3 w-7 h-7" />
          <h2 className="ml-4 text-2xl font-bold tracking-wide">Manage Categories</h2>
        </div>
        {expandedSections.categories && (
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full sm:w-auto flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  value={searchCategory}
                  onChange={e => setSearchCategory(e.target.value)}
                  placeholder="Search categories..."
                  className="pl-12 pr-6 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 text-lg"
                />
              </div>
              <button onClick={() => setShowAddCategory(true)}
                className="flex items-center justify-center bg-teal-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-teal-700 transition-all duration-200 font-semibold text-lg whitespace-nowrap">
                <Plus className="mr-2 w-5 h-5" /> Add Category
              </button>
            </div>
            <div className="space-y-4">
              {displayedCategories.map(cat => (
                <div key={cat.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex-grow mb-4 sm:mb-0">
                    {editCategoryId === cat.id ? (
                      <div className="flex flex-col gap-3">
                        <input
                          value={editedCategories[cat.id]?.name ?? cat.name}
                          onChange={e => setEditedCategories(prev => ({
                            ...prev,
                            [cat.id]: {
                              ...prev[cat.id],
                              name: e.target.value
                            }
                          }))}
                          className="border border-gray-300 p-2.5 rounded-lg w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <textarea
                          value={editedCategories[cat.id]?.description ?? cat.description}
                          onChange={e => setEditedCategories(prev => ({
                            ...prev,
                            [cat.id]: {
                              ...prev[cat.id],
                              description: e.target.value
                            }
                          }))}
                          className="border border-gray-300 p-2.5 rounded-lg w-full resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                          rows="2"
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className="font-semibold text-xl text-gray-900 mb-1">{cat.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{cat.description}</p>
                      </>
                    )}
                    <p className="text-sm text-blue-600 font-medium">{cat.quizCount} quizzes</p>
                  </div>
                  <div className="flex gap-3 flex-shrink-0 mt-4 sm:mt-0">
                    <button onClick={() => setEditCategoryId(cat.id)}
                      className="p-3 rounded-full text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow-md">
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button onClick={() => {
                      setCategories(list => list.filter(c => c.id !== cat.id));
                      // If a category being deleted had pending edits, clear them
                      setEditedCategories(prev => {
                        const updated = { ...prev };
                        delete updated[cat.id];
                        return updated;
                      });
                      if (editCategoryId === cat.id) {
                        setEditCategoryId(null); // Exit edit mode if the deleted category was being edited
                      }
                    }} className="p-3 rounded-full text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-200 shadow-sm hover:shadow-md">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {hasCategoryChanges && (
              <div className="flex justify-end gap-4 mt-6">
                <button onClick={cancelAllCategoryEdits}
                  className="flex items-center bg-gray-200 text-gray-800 px-6 py-3 rounded-xl shadow-md hover:bg-gray-300 transition-all duration-200 font-semibold text-lg">
                  <X className="mr-2 w-5 h-5" /> Cancel
                </button>
                <button onClick={saveAllCategoryEdits}
                  className="flex items-center bg-teal-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-teal-700 transition-all duration-200 font-semibold text-lg">
                  <Save className="mr-2 w-5 h-5" /> Save Changes
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Add Category Modal */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl transform scale-95 animate-zoom-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-2xl text-teal-700">Add New Category</h3>
              <button onClick={() => setShowAddCategory(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-5">
              <input
                placeholder="Category Name"
                value={newCategoryName}
                onChange={e => setNewCategoryName(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <textarea
                placeholder="Description"
                value={newCategoryDescription}
                onChange={e => setNewCategoryDescription(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-teal-400 text-base"
                rows="3"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setShowAddCategory(false)}
                  className="flex-1 border border-gray-300 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-all duration-200 font-semibold shadow-sm">
                  Cancel
                </button>
                <button onClick={addNewCategory}
                  className="flex-1 flex items-center justify-center bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-all duration-200 font-semibold shadow-md">
                  <Save className="mr-2 w-5 h-5" /> Save Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Communication & Notification Section */}
      <section className="mb-10 bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div onClick={() => toggleSection('communication')}
          className="flex items-center cursor-pointer p-5 bg-gradient-to-r from-purple-600 to-pink-700 text-white rounded-t-2xl hover:from-purple-700 hover:to-pink-800 transition-all duration-200">
          {expandedSections.communication ? <ChevronDown className="w-6 h-6 text-purple-200" /> : <ChevronRight className="w-6 h-6 text-purple-200" />}
          <Megaphone className="ml-3 w-7 h-7" />
          <h2 className="ml-4 text-2xl font-bold tracking-wide">Communication & Notifications</h2>
        </div>
        {expandedSections.communication && (
          <div className="p-6 space-y-6">

            {/* Send Announcement */}
            <div>
              <label className="font-bold text-lg text-gray-700 block mb-3">Announcement Message</label>
              <div className="flex flex-col gap-3">
                <textarea
                  value={announcementMessage}
                  onChange={e => setAnnouncementMessage(e.target.value)}
                  placeholder="Write your announcement message or provide key points for a draft..."
                  className="w-full border border-gray-300 p-3 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-purple-400 text-base"
                  rows="4"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={draftAnnouncement}
                    className="flex-1 flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 font-semibold text-lg"
                    disabled={isDraftingAnnouncement}>
                    {isDraftingAnnouncement ? 'Drafting...' : <><Wand2 className="inline-block mr-2 w-5 h-5" /> Draft Announcement ✨</>}
                  </button>
                  <button className="flex-1 flex items-center justify-center bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-all duration-200 font-semibold text-lg">
                    <Megaphone className="inline-block mr-2 w-5 h-5" /> Send Announcement
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* Advanced Features - AI Quiz Generator (Commented out as per original) */}
      {/* AI Quiz Generator Section */}
      <section className="mb-10 bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div onClick={() => toggleSection('aiQuiz')}
          className="flex items-center cursor-pointer p-5 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-t-2xl hover:from-indigo-700 hover:to-purple-800 transition-all duration-200">
          {expandedSections.aiQuiz ? <ChevronDown className="w-6 h-6 text-indigo-200" /> : <ChevronRight className="w-6 h-6 text-indigo-200" />}
          <Brain className="ml-3 w-7 h-7" />
          <h2 className="ml-4 text-2xl font-bold tracking-wide">AI Quiz Generator</h2>
        </div>
        {expandedSections.aiQuiz && (
          <div className="p-6">
            <AIQuizGenerator />
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
