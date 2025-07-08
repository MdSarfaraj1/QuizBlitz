import React, { useState } from 'react';
import { LayoutList, ChevronDown, ChevronRight, Edit, Save, X, Trash2, PlusCircle, Search } from 'lucide-react'; // Import Search icon

const CategoryManagement = ({ categories, setCategories, expanded, toggleSection }) => {
  const [editCategoryId, setEditCategoryId] = useState(null); // ID of the category currently being edited
  const [editedCategories, setEditedCategories] = useState({}); // Stores changes to categories before saving
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // Stores category ID to confirm deletion
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  /**
   * Handles changes to an input field for a category being edited.
   */
  const handleEditChange = (id, field, value) => {
    setEditedCategories((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  /**
   * Saves changes for a specific category. In a real app, this would hit an API.
   */
  const saveCategoryEdit = async (categoryId) => {
    const updatedData = editedCategories[categoryId];
    if (!updatedData) return;

    console.log(`Saving category ${categoryId} with data:`, updatedData);
    // Simulate API call to update category
    // try {
    //   const response = await fetch(`/api/categories/${categoryId}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(updatedData),
    //   });
    //   if (!response.ok) throw new Error('Failed to update category');
    //   const updatedCategory = await response.json(); // Assuming API returns the updated category

    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === categoryId ? { ...cat, ...updatedData } : cat
      )
    );
    setEditedCategories((prev) => {
      const newState = { ...prev };
      delete newState[categoryId];
      return newState;
    });
    setEditCategoryId(null); // Exit edit mode for this category
    console.log(`Category ${categoryId} updated successfully!`);
    // } catch (error) {
    //   console.error('Error updating category:', error);
    //   alert('Failed to update category. Please try again.');
    // }
  };

  /**
   * Cancels edits for a specific category.
   */
  const cancelCategoryEdit = (categoryId) => {
    setEditedCategories((prev) => {
      const newState = { ...prev };
      delete newState[categoryId];
      return newState;
    });
    setEditCategoryId(null); // Exit edit mode for this category
  };

  /**
   * Adds a new category. In a real app, this would hit an API.
   */
  const addCategory = async () => {
    if (!newCategory.name.trim()) {
      alert('Category name cannot be empty.');
      return;
    }

    console.log('Adding new category:', newCategory);
    // Simulate API call to add category
    // try {
    //   const response = await fetch('/api/categories', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newCategory),
    //   });
    //   if (!response.ok) throw new Error('Failed to add category');
    //   const addedCategory = await response.json(); // Assuming API returns the newly added category

    // For simulation, generate a simple ID
    const addedCategory = {
      ...newCategory,
      id: categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1,
      quizCount: 0, // New categories start with 0 quizzes
    };

    setCategories((prev) => [...prev, addedCategory]);
    setNewCategory({ name: '', description: '' }); // Clear form
    setShowAddForm(false); // Hide add form
    console.log('Category added successfully!');
    // } catch (error) {
    //   console.error('Error adding category:', error);
    //   alert('Failed to add category. Please try again.');
    // }
  };

  /**
   * Deletes a category. In a real app, this would hit an API.
   */
  const deleteCategory = async (categoryId) => {
    setShowDeleteConfirm(null); // Hide confirmation dialog
    console.log(`Deleting category with ID: ${categoryId}`);
    // Simulate API call to delete category
    // try {
    //   const response = await fetch(`/api/categories/${categoryId}`, { method: 'DELETE' });
    //   if (!response.ok) throw new Error('Failed to delete category');

    setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== categoryId));
    console.log(`Category ${categoryId} deleted successfully!`);
    // } catch (error) {
    //   console.error('Error deleting category:', error);
    //   alert('Failed to delete category. Please try again.');
    // }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="mb-10 bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      <div
        onClick={() => toggleSection('categories')}
        className="flex items-center cursor-pointer p-5 bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-t-2xl hover:from-teal-700 hover:to-cyan-800 transition-all duration-200"
      >
        {expanded ? (
          <ChevronDown className="w-6 h-6 text-teal-300" />
        ) : (
          <ChevronRight className="w-6 h-6 text-teal-300" />
        )}
        <LayoutList className="ml-3 w-7 h-7" />
        <h2 className="ml-4 text-2xl font-bold tracking-wide">Category Management</h2>
      </div>

      {expanded && (
        <div className="p-6">
        
            {/* Add New Category Button and Search Bar in a flex container */}
            <div className=" flex justify-between items-center"> 
              {/* search bar */}
              <div className="relative flex-grow mr-4"> 
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search categories by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* add category button */}
              <div > 
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold py-2 px-3 rounded-md border border-indigo-600 hover:border-indigo-800 transition-colors duration-200"
                >
                  <PlusCircle className="w-4 h-4 mr-1" />
                  {showAddForm ? 'Hide Add Category Form' : 'Add New Category'}
                </button>
              </div>
            </div>

            {/* Add Category Form */}
          <div className="mb-6 pb-4">
            {showAddForm && (
              <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                <h3 className="text-lg font-semibold mb-3">New Category Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category Name</label>
                    <input
                      type="text"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="e.g., Space Exploration"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                    <input
                      type="text"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="e.g., Quizzes about planets, stars, and galaxies"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addCategory}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                    disabled={!newCategory.name.trim()}
                  >
                    Add Category
                  </button>
                </div>
              </div>
            )}
          </div>


          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quizzes</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCategories.length > 0 ? ( // Check if there are filtered categories
                  filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {editCategoryId === category.id ? (
                          <input
                            type="text"
                            value={editedCategories[category.id]?.name ?? category.name}
                            onChange={(e) => handleEditChange(category.id, 'name', e.target.value)}
                            className="border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        ) : (
                          category.name
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {editCategoryId === category.id ? (
                          <textarea
                            value={editedCategories[category.id]?.description ?? category.description}
                            onChange={(e) => handleEditChange(category.id, 'description', e.target.value)}
                            className="border border-gray-300 rounded-md py-1 px-2 w-full h-20 resize-y focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            rows="3"
                          />
                        ) : (
                          <p className="line-clamp-2 hover:line-clamp-none transition-all duration-200 cursor-pointer" title={category.description}>
                            {category.description || '-'}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.quizCount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editCategoryId === category.id ? (
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => saveCategoryEdit(category.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Save Changes"
                            >
                              <Save className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => cancelCategoryEdit(category.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Cancel Changes"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => setEditCategoryId(category.id)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit Category"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(category.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Category"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                        {showDeleteConfirm === category.id && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg border border-red-300 z-10">
                            <p className="text-red-700 mb-3">Are you sure you want to delete {category.name}?</p>
                            <div className="flex justify-center space-x-3">
                              <button
                                onClick={() => deleteCategory(category.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                              >
                                Yes, Delete
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No categories found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoryManagement;