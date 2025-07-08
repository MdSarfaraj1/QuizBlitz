import React, { useState, useEffect } from 'react';
import { Brain, ChevronDown, ChevronRight } from 'lucide-react';
import AIQuizGenerator from './AiQuizGenerator';
import UserManagement from './UserManagement';
import CategoryManagement from './CategoryManagement';
import CommunicationPanel from './CommunicationPanel';
import axios from 'axios';

const AdminPanel = () => {
  const [expandedSections, setExpandedSections] = useState({
    categories: false,
    users: true,
    communication: false,
    aiQuiz: false,
    advanced: false,
  });

  // State for fetched data
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch users and categories from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/Admin/getAllUsersAndCategories`, {withCredentials: true});
        if (response.status!=200) throw new Error('Failed to fetch admin data');
       console.log(response.data);
        setUsers(response.data.users);
        setCategories(response.data.categories);
      } catch (err) {
        // Optionally show error to user
        setUsers([]);
        setCategories([]);
         console.error(err);
      }
    };
    fetchData();
  }, []); // Runs once on mount

  const toggleSection = (sec) =>
    setExpandedSections((prev) => ({ ...prev, [sec]: !prev[sec] }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-inter text-gray-800 antialiased">
      <h1 className="text-4xl font-extrabold text-indigo-800 mb-8 text-center drop-shadow-md">
        Admin Dashboard
      </h1>

      <UserManagement
        users={users}
        setUsers={setUsers} // Pass setUsers so UserManagement can update it after CUD operations
        expanded={expandedSections.users}
        toggleSection={toggleSection}
      />

      <CategoryManagement
        categories={categories}
        setCategories={setCategories} // Pass setCategories so CategoryManagement can update it after CUD operations
        expanded={expandedSections.categories}
        toggleSection={toggleSection}
      />

      <CommunicationPanel
        expanded={expandedSections.communication}
        toggleSection={toggleSection}
      />

      <section className="mb-10 bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div
          onClick={() => toggleSection('aiQuiz')}
          className="flex items-center cursor-pointer p-5 bg-gradient-to-r from-violet-700 to-indigo-800 text-white rounded-t-2xl hover:from-violet-800 hover:to-indigo-900 transition-all duration-200"
        >
          {expandedSections.aiQuiz ? (
            <ChevronDown className="w-6 h-6 text-violet-300" />
          ) : (
            <ChevronRight className="w-6 h-6 text-violet-300" />
          )}
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