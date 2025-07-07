import React, { useState, useEffect, useMemo } from 'react';
import { Heart, X, Play, Star, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toast } from "../UI/toast";
const FavoriteQuizCategories = () => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modalFavorites, setModalFavorites] = useState(new Set());
  const [originalModalFavorites, setOriginalModalFavorites] = useState(new Set());
  const [toast, setToast] = useState(null);
   const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const hasChanges = useMemo(() => {
    return JSON.stringify([...modalFavorites].sort()) !== JSON.stringify([...originalModalFavorites].sort());
  }, [modalFavorites, originalModalFavorites]);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/favoriteCategories`,
          { withCredentials: true }
        );
        if (response.data.success) {
          const data = response.data.categories || [];
          console.log('Fetched favorite categories:', data);
          setFavorites(data);
          const ids = new Set(data.map(cat => cat._id));
          setModalFavorites(ids);
          setOriginalModalFavorites(new Set(ids));
        } else {
          setError('Failed to load favorite categories');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load favorite categories');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handlePlayQuiz = (category) => {
    navigate(`/startQuiz`,{state:{alreadySelected:category}});
  };

  const handleRemoveFromModal = (categoryId) => {
    setModalFavorites(prev => {
      const newSet = new Set(prev);
      newSet.delete(categoryId);
      return newSet;
    });
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      const categoryIds = Array.from(modalFavorites);

      await axios.put(
        `${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/updateFavoriteCategories`,
        {  favoriteCategoryIds: categoryIds },
        { withCredentials: true }
      );

      const updatedFavorites = favorites.filter(cat => modalFavorites.has(cat._id));
      setFavorites(updatedFavorites);
      setOriginalModalFavorites(new Set(modalFavorites));
      setShowModal(false);
      showToast('Changes saved successfully!', 'success');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleCloseModal = () => {
    setModalFavorites(new Set(originalModalFavorites));
    setShowModal(false);
  };

  const getProgressColor = (played, total) => {
    const percentage = (played / total) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressPercentage = (played, total) => Math.round((played / total) * 100);

  const CategoryCard = ({ category, isCompact = false, showRemove = false }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow">
      <div className="flex items-center justify-between mb-3">
       <div className="flex items-center gap-2">
            {category.icon && <span className="w-4 h-4 text-gray-500">{category.icon}</span>}
            <h3 className={`font-medium text-gray-800 ${isCompact ? 'text-sm' : 'text-base'}`}>
                {category.title}
            </h3>
        </div>

        {showRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFromModal(category._id);
            }}
            className="p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mb-3">
        <div className="flex justify-between mb-1 text-xs text-gray-600">
          <span>Progress</span>
          <span>{getProgressPercentage(category.playedQuizzes, category.totalQuizzes)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-full rounded-full transition-all duration-300 ${getProgressColor(category.playedQuizzes, category.totalQuizzes)}`}
            style={{ width: `${getProgressPercentage(category.playedQuizzes, category.totalQuizzes)}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          <span className="font-semibold text-blue-600">{category.playedQuizzes}</span>
          <span className="text-gray-400"> / </span>
          <span>{category.totalQuizzes} quizzes</span>
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePlayQuiz(category);
          }}
        className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-blue-500 hover:to-purple-600 text-white rounded-full text-xs"
        >
          <Play className="w-3 h-3" />
          Play
        </button>
      </div>
    </div>
  );

  const displayedFavorites = favorites.slice(0, 4);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-3 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-1.5 rounded-lg">
            <Heart className="w-4 h-4 text-white fill-current" />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-semibold text-base">Favorite Categories</h2>
            <p className="text-pink-100 text-xs">Your top quiz topics</p>
          </div>
          <div className="bg-white/20 px-2 py-1 rounded-full">
            <span className="text-white text-xs font-medium">{favorites.length}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-pink-500 mb-4" />
            <p className="text-gray-600">Loading your favorite categories...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8">
            <AlertCircle className="w-8 h-8 text-red-500 mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Retry
            </button>
          </div>
        ) : displayedFavorites.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-600 font-medium mb-2">No favorite categories yet</p>
            <p className="text-gray-400 text-sm">Start playing quizzes and mark your favorites!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedFavorites.map(category => (
              <CategoryCard key={category._id} category={category} isCompact={true} />
            ))}
          </div>
        )}

          <div className="mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Manage All {favorites.length} Categories</span>
            </button>
          </div>
        
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-white fill-current" />
                <div>
                  <h2 className="text-xl font-bold text-white">Manage Favorite Categories</h2>
                  <p className="text-pink-100 text-sm">Remove categories you no longer want</p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/20 rounded-lg"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {Array.from(modalFavorites).length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium mb-2">No categories selected</p>
                  <p className="text-gray-400 text-sm">All categories have been removed</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favorites.filter(cat => modalFavorites.has(cat._id)).map(category => (
                    <CategoryCard
                      key={category._id}
                      category={category}
                      showRemove={true}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={!hasChanges || saving}
                className={`flex-1 px-6 py-3 rounded-lg text-white font-medium ${
                  !hasChanges || saving
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500'
                }`}
              >
            
                {saving ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {toast && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
              />
            )}
    </div>

  );
};

export default FavoriteQuizCategories;
