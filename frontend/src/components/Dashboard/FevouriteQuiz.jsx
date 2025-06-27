import React, { useState } from 'react';
import { Heart, X, TrendingUp, Play, Star } from 'lucide-react';

const FavoriteQuizCategories = () => {
  const [showAllModal, setShowAllModal] = useState(false);

  // Sample data - replace with your actual data
  const favoriteCategories = [
    { id: 1, name: "Science & Technology", totalQuizzes: 45, playedQuizzes: 12, trending: true },
    { id: 2, name: "History", totalQuizzes: 38, playedQuizzes: 8, trending: false },
    { id: 3, name: "Sports", totalQuizzes: 52, playedQuizzes: 20, trending: true },
    { id: 4, name: "Movies & Entertainment", totalQuizzes: 67, playedQuizzes: 15, trending: false },
    { id: 5, name: "Geography", totalQuizzes: 41, playedQuizzes: 9, trending: false },
    { id: 6, name: "Literature", totalQuizzes: 29, playedQuizzes: 6, trending: false },
    { id: 7, name: "Music", totalQuizzes: 35, playedQuizzes: 11, trending: true },
    { id: 8, name: "Food & Cooking", totalQuizzes: 23, playedQuizzes: 7, trending: false },
    { id: 9, name: "Art & Culture", totalQuizzes: 31, playedQuizzes: 5, trending: false },
    { id: 10, name: "Mathematics", totalQuizzes: 28, playedQuizzes: 4, trending: false },
    { id: 11, name: "Animals & Nature", totalQuizzes: 44, playedQuizzes: 13, trending: true },
    { id: 12, name: "Space & Astronomy", totalQuizzes: 26, playedQuizzes: 3, trending: false },
    { id: 13, name: "Programming", totalQuizzes: 33, playedQuizzes: 7, trending: false },
    { id: 14, name: "Psychology", totalQuizzes: 19, playedQuizzes: 2, trending: false },
    { id: 15, name: "Business & Finance", totalQuizzes: 37, playedQuizzes: 9, trending: false }
  ];

  const displayedCategories = favoriteCategories.slice(0, 5);

  const handleCategoryClick = (category) => {
    // Add your click handler logic here
    console.log('Category clicked:', category);
  };

  const getProgressColor = (played, total) => {
    const percentage = (played / total) * 100;
    if (percentage >= 80) return 'from-emerald-400 to-emerald-500';
    if (percentage >= 60) return 'from-blue-400 to-blue-500';
    if (percentage >= 40) return 'from-amber-400 to-amber-500';
    return 'from-rose-400 to-rose-500';
  };


const CompactCategoryItem = ({ category, onClick, onRemove, onPlay }) => (
  <div 
    onClick={() => onClick(category)}
    className="group relative bg-white border border-gray-100 rounded-lg p-3 hover:border-blue-200 hover:shadow-md cursor-pointer transition-all duration-200"
  >
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0 pr-3">
        {/* Category Name with Cross Icon */}
        <div className="flex items-center gap-2 mb-2 justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-3 h-3 text-amber-500 fill-current flex-shrink-0" />
            <h3 className="font-medium text-gray-800 text-sm truncate group-hover:text-blue-700 transition-colors">
              {category.name}
            </h3>
          </div>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              onRemove(category);
            }} 
            className="p-1 rounded hover:bg-red-100 text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
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

        {/* Played / Total + Play Button */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">
            <span className="font-semibold text-blue-600">{category.playedQuizzes}</span>
            <span className="text-gray-400"> / </span>
            <span>{category.totalQuizzes} quizzes</span>
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onPlay(category);
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


  const FullCategoryItem = ({ category, onClick }) => (
    <div 
      onClick={() => onClick(category)}
      className="group relative overflow-hidden bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:shadow-blue-100 hover:border-blue-300 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="relative flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
            <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 truncate">
              {category.name}
            </h3>
         
        
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${getProgressColor(category.playedQuizzes, category.totalQuizzes)}`}
              style={{ width: `${(category.playedQuizzes / category.totalQuizzes) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Stats */}
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
      </div>
      
      {/* Hover indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Compact Header */}
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
            <span className="text-white text-xs font-medium">{favoriteCategories.length}</span>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="p-4 space-y-3">
        {displayedCategories.map((category) => (
          <CompactCategoryItem 
            key={category.id} 
            category={category} 
            onClick={handleCategoryClick}
          />
        ))}
      </div>

      {/* Show All Button */}
      {favoriteCategories.length > 6 && (
        <div className="px-4 pb-4">
          <button
            onClick={() => setShowAllModal(true)}
            className="w-full group relative overflow-hidden px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>View All {favoriteCategories.length} Categories</span>
            </div>
          </button>
        </div>
      )}

      {/* Modal for Show All */}
      {showAllModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-rose-500 to-pink-500 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <Heart className="w-6 h-6 text-white fill-current" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">All Favorite Categories</h2>
                    <p className="text-rose-100 text-sm">Explore all your favorite quiz topics</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAllModal(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[65vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteCategories.map((category) => (
                  <FullCategoryItem 
                    key={category.id} 
                    category={category} 
                    onClick={(cat) => {
                      handleCategoryClick(cat);
                      setShowAllModal(false);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAllModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Add logic to manage favorites here
                    console.log('Manage favorites clicked');
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Manage Favorites
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