import React, { useState, useEffect, useMemo } from 'react';
import { Heart, X, TrendingUp, Play, Star } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FavoriteQuizCategories = () => {
    const navigate = useNavigate();
    const [showAllModal, setShowAllModal] = useState(false);
    const [favoriteCategories, setFavoriteCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalFavoriteCategoryIds, setModalFavoriteCategoryIds] = useState(new Set());
    const [initialModalFavoriteCategoryIds, setInitialModalFavoriteCategoryIds] = useState(new Set());

    const hasModalChanges = useMemo(() => {
        const current = JSON.stringify(Array.from(modalFavoriteCategoryIds).sort());
        const initial = JSON.stringify(Array.from(initialModalFavoriteCategoryIds).sort());
        return current !== initial;
    }, [modalFavoriteCategoryIds, initialModalFavoriteCategoryIds]);

    useEffect(() => {
        const fetchFavoriteCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/favoriteCategories`,
                    { withCredentials: true }
                );
                if (response.data.success) {
                    const fetched = response.data.categories || [];
                    setFavoriteCategories(fetched);
                    const initialFavorites = new Set(fetched.map(cat => cat._id));
                    setModalFavoriteCategoryIds(initialFavorites);
                    setInitialModalFavoriteCategoryIds(new Set(initialFavorites));
                } else {
                    setError('Failed to load favorite categories');
                }
            } catch (err) {
                console.error("Error fetching favorite categories:", err);
                setError(err.response?.data?.message || 'Failed to load favorite categories');
            } finally {
                setLoading(false);
            }
        };
        fetchFavoriteCategories();
    }, []);



    const displayedCategories = favoriteCategories.slice(0, 5);

    const handleCategoryClick = (category) => {
        console.log('Category clicked:', category);
    };

    const handlePlayQuiz = (category) => {
        navigate(`/startquiz/${category._id}`);
        if (showAllModal) setShowAllModal(false);
    };

    const handleRemoveFromModalFavorites = (categoryId, event) => {
        event.stopPropagation();
        setModalFavoriteCategoryIds(prev => {
            const newFavorites = new Set(prev);
            newFavorites.delete(categoryId);
            return newFavorites;
        });
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        try {
            const categoriesToKeep = Array.from(modalFavoriteCategoryIds);
            const userId = 'CURRENT_LOGGED_IN_USER_ID'; // Replace this

            await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL}/User/updateFavoriteCategories`,
                { userId, favoriteCategoryIds: categoriesToKeep },
                { withCredentials: true }
            );

            const updated = favoriteCategories.filter(cat => modalFavoriteCategoryIds.has(cat._id));
            setFavoriteCategories(updated);
            setInitialModalFavoriteCategoryIds(new Set(modalFavoriteCategoryIds));
            alert('Favorite categories updated successfully!');
            setShowAllModal(false);
        } catch (err) {
            console.error("Error saving favorite categories:", err);
            setError(err.response?.data?.message || 'Failed to save favorite categories');
        } finally {
            setLoading(false);
        }
    };

    const getProgressColor = (played, total) => {
        const percentage = (played / total) * 100;
        if (percentage >= 80) return 'from-emerald-400 to-emerald-500';
        if (percentage >= 60) return 'from-blue-400 to-blue-500';
        if (percentage >= 40) return 'from-amber-400 to-amber-500';
        return 'from-rose-400 to-rose-500';
    };

    const CompactCategoryItem = ({ category, onClick, onPlay }) => (
        <div
            onClick={() => onClick(category)}
            className="group relative bg-white border border-gray-100 rounded-lg p-3 hover:border-blue-200 hover:shadow-md cursor-pointer transition-all duration-200"
        >
            <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-2 justify-between">
                        <div className="flex items-center gap-2">
                            <Star className="w-3 h-3 text-amber-500 fill-current" />
                            <h3 className="font-medium text-gray-800 text-sm truncate group-hover:text-blue-700">
                                {category.title}
                            </h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div
                                className={`h-full rounded-full bg-gradient-to-r transition-all duration-300 ${getProgressColor(category.playedQuizzes, category.totalQuizzes)}`}
                                style={{ width: `${(category.playedQuizzes / category.totalQuizzes) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                            {Math.round((category.playedQuizzes / category.totalQuizzes) * 100)}%
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                            <span className="font-semibold text-blue-600">{category.playedQuizzes}</span>
                            <span className="text-gray-400"> / </span>
                            <span>{category.totalQuizzes} quizzes</span>
                        </span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onPlay?.(category);
                            }}
                            className="text-blue-600 text-xs font-semibold hover:underline flex items-center gap-1"
                        >
                            <Play className="w-4 h-4" /> Play
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const FullCategoryItem = ({ category, onClick, onPlay, onRemove, showRemove }) => (
        <div
            onClick={() => onClick(category)}
            className="group relative overflow-hidden bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:shadow-blue-100 hover:border-blue-300 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className="relative flex items-center justify-between">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors truncate">
                            {category.title}
                        </h3>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${getProgressColor(category.playedQuizzes, category.totalQuizzes)}`}
                            style={{ width: `${(category.playedQuizzes / category.totalQuizzes) * 100}%` }}
                        ></div>
                    </div>
                </div>
                <div className="ml-4 text-right">
                    <div className="flex items-center gap-1 text-sm font-bold">
                        <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {category.playedQuizzes}
                        </span>
                        <span className="text-gray-400 font-normal">/</span>
                        <span className="text-gray-600 font-semibold">{category.totalQuizzes}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        {Math.round((category.playedQuizzes / category.totalQuizzes) * 100)}% Complete
                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onPlay?.(category);
                    }}
                    className="absolute bottom-2 right-2 px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1"
                >
                    <Play className="w-3 h-3" /> Play
                </button>

                {showRemove && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove?.(category._id, e);
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-transform">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-1.5 rounded-lg">
                        <Heart className="w-4 h-4 text-white fill-current" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-white font-semibold text-base">Favorite Categories</h2>
                        <p className="text-rose-100 text-xs">Your top quiz topics</p>
                    </div>
                    <div className="bg-white/20 px-2 py-1 rounded-full">
                        <span className="text-white text-xs font-medium">
                            {favoriteCategories.length}
                        </span>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[200px] py-8">
                    <Heart className="w-8 h-8 animate-pulse mx-auto text-rose-400 mb-4" />
                    <p className="text-gray-600">Loading your favorite categories...</p>
                </div>
            ) : error ? (
                <div className="text-center py-8">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-blue-500 hover:text-blue-600 underline"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <>
                    <div className="p-4 space-y-3">
                        {displayedCategories.length > 0 ? (
                            displayedCategories.map((category) => (
                                <CompactCategoryItem
                                    key={category._id}
                                    category={category}
                                    onClick={handleCategoryClick}
                                    onPlay={handlePlayQuiz}
                                />
                            ))
                        ) : (
                            <div className="px-4 pb-4 text-center text-gray-500 text-sm">
                                <div className="flex flex-col items-center gap-2 p-6 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
                                    <Heart className="w-8 h-8 text-gray-300" />
                                    <p className="font-medium text-gray-600">No favorite categories yet</p>
                                    <p className="text-xs text-gray-400">Start playing quizzes and mark your favorite topics!</p>
                                </div>
                            </div>
                        )}
                    </div>
                    {favoriteCategories.length > 5 && (
                        <div className="px-4 pb-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowAllModal(true);
                                }}
                                className="w-full group relative overflow-hidden px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <div className="relative flex items-center justify-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>Manage All {favoriteCategories.length} Categories</span>
                                </div>
                            </button>
                        </div>
                    )}
                </>
            )}

            {showAllModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        <div className="relative bg-gradient-to-r from-rose-500 to-pink-500 p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="bg-white/20 p-2 rounded-xl">
                                        <Heart className="w-6 h-6 text-white fill-current" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">All Favorite Categories</h2>
                                        <p className="text-rose-100 text-sm">Explore all your favorite quiz topics and manage them</p>
                                    </div>
                                </div>
                               <button
    onClick={() => {
        setModalFavoriteCategoryIds(new Set(initialModalFavoriteCategoryIds));
        setShowAllModal(false); // <-- Add this line
    }}
    className="p-2 hover:bg-white/20 rounded-xl"
>
    <X className="w-6 h-6 text-white" />
</button>
                            </div>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[65vh]">
                            {favoriteCategories.filter(cat => modalFavoriteCategoryIds.has(cat._id)).length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {favoriteCategories
                                        .filter(cat => modalFavoriteCategoryIds.has(cat._id))
                                        .map((category) => (
                                            <FullCategoryItem
                                                key={category._id}
                                                category={category}
                                                onClick={handleCategoryClick}
                                                onPlay={handlePlayQuiz}
                                                onRemove={handleRemoveFromModalFavorites}
                                                showRemove={true}
                                            />
                                        ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 text-gray-500 text-base">
                                    <p>You have no favorite categories selected in this modal.</p>
                                    <p>Close to return or save changes to confirm removal.</p>
                                </div>
                            )}
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-200">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setModalFavoriteCategoryIds(new Set(initialModalFavoriteCategoryIds));
                                        setShowAllModal(false);
                                    }}
                                    className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleSaveChanges}
                                    className={`flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg
                                        ${!hasModalChanges || loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'}
                                    `}
                                    disabled={!hasModalChanges || loading}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FavoriteQuizCategories;
