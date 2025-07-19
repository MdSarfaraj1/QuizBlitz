import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shuffle, Sparkles, Heart,Users } from 'lucide-react'; // Added Heart icon
import axios from 'axios';
import {Toast} from '../UI/toast'
import JoinRoomModal from '../Multiplayer/JoinRoomPage';

const CategorySelection = ({ selectedCategory, setSelectedCategory, userId }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toast,setToast]=useState({})
    const [favoriteCategoryIds, setFavoriteCategoryIds] = useState(new Set()); 
    const [initialFavoriteCategoryIds, setInitialFavoriteCategoryIds] = useState(new Set()); 
    const[showJoinRoomModal,setShowJoinRoomModal]=useState(false)

    const [hasFavoriteChanges, setHasFavoriteChanges] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                let categoriesResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/allCategories`, { withCredentials: true });
                setCategories(categoriesResponse.data.categories);

                if (userId) {
                  const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/favoriteCategories`,
          { withCredentials: true }
        );
                    const userFavorites = new Set(response.data.categories.map(cat => cat._id));
                    setFavoriteCategoryIds(userFavorites);
                    setInitialFavoriteCategoryIds(new Set(userFavorites)); 
                }
            } catch (error) {
                console.error("Data fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [userId]); 

    // Effect to check for changes in favorite categories
    useEffect(() => {
        const currentFavorites = JSON.stringify(Array.from(favoriteCategoryIds).sort());
        const initialFavorites = JSON.stringify(Array.from(initialFavoriteCategoryIds).sort());
        setHasFavoriteChanges(currentFavorites !== initialFavorites);
    }, [favoriteCategoryIds, initialFavoriteCategoryIds]);

    const filteredCategories = useMemo(() => {
        return categories.filter(category =>
            category.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, categories]);

    const handleToggleFavorite = (categoryId, event) => {
        event.stopPropagation(); // Prevent card selection when clicking favorite button
        setFavoriteCategoryIds(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(categoryId)) {
                newFavorites.delete(categoryId);
            } else {
                newFavorites.add(categoryId);
            }
            return newFavorites;
        });
    };

    const handleSaveChanges = async () => {
        try {
            // Convert Set to Array for sending to backend
            const updatedFavoriteIds = Array.from(favoriteCategoryIds);
            await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/updateFavoriteCategories`,
                {  favoriteCategoryIds: updatedFavoriteIds },
                { withCredentials: true }
            );
            setInitialFavoriteCategoryIds(new Set(favoriteCategoryIds)); // Update initial state after saving
            setHasFavoriteChanges(false); // Reset changes flag
            setToast({message:"Fevourite Category added succesfully",type:"success"})
        } catch (error) {
            console.error("Error saving favorite categories:", error);
            alert('Failed to save favorite categories. Please try again.');
             setToast({message:"Failed to save favorite categories. Please try again."})
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 bg-white rounded-2xl shadow-lg border border-purple-200">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
                    <Sparkles className="w-6 h-6 text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="ml-4 text-purple-600 text-lg">Loading categories...</p>
            </div>
        );
    }

    return (
      <>
        {/* Search Bar and Popular Quizzes Button */}
        <div className="flex gap-4 mb-6 sticky top-4 z-40 p-2 bg-white rounded-2xl shadow-md border border-gray-200">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
            />
          </div>

          <button
            onClick={() => navigate("/exploreQuizzes")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 group"
          >
            <Shuffle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span className="hidden sm:inline">Popular Quizzes</span>
            <span className="sm:hidden">🎲</span>
          </button>
          {/* join room */}
          <button
            onClick={() => setShowJoinRoomModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 group"
          >
            <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="hidden sm:inline">Join Room</span>
            <span className="sm:hidden">🔗</span>
          </button>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 && !isLoading ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-purple-200">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No categories found
            </h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredCategories.map((category, index) => (
              <div
                key={category._id}
                onClick={() => setSelectedCategory(category)}
                style={{ animationDelay: `${index * 0.05}s` }}
                className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:-translate-y-2 animate-fade-in-up relative overflow-hidden
                                ${
                                  selectedCategory?._id === category._id
                                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-blue-200/50 shadow-xl"
                                    : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                                }
                            `}
              >
                <div className="text-center relative z-10 flex flex-col h-full">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-blue-700 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed flex-grow">
                    {category.description}
                  </p>

                  {/* Favorite Button */}
                  {userId && (
                    <button
                      className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow-md transition-all duration-200 z-20"
                      onClick={(e) => handleToggleFavorite(category._id, e)}
                      title={
                        favoriteCategoryIds.has(category._id)
                          ? "Unmark as favorite"
                          : "Mark as favorite"
                      }
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors duration-200 ${
                          favoriteCategoryIds.has(category._id)
                            ? "text-red-500 fill-current"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  )}

                  {/* Selection indicator */}
                  {selectedCategory?._id === category._id && (
                    <div className="mt-4 flex items-center justify-center">
                      <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full border border-blue-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold text-blue-700">
                          Selected
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Subtle hover effect (lighter) */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100/30 to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}

        {/* Save Changes Button */}
        {userId && hasFavoriteChanges && (
          <div className="fixed bottom-6 ml-96 transform -translate-x-1/2 z-50">
            <button
              onClick={handleSaveChanges}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        )}
        {/* toast messegase */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
         <JoinRoomModal isOpen={showJoinRoomModal} onClose={() => setShowJoinRoomModal(false)} />
      </>
    );
};

export default CategorySelection;