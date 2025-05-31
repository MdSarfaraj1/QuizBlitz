import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shuffle, Sparkles } from 'lucide-react';
import axios from 'axios';

const CategorySelection = ({ selectedCategory, setSelectedCategory }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        let response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/allCategories`, { withCredentials: true });
        console.log("Profile Fetch response:", response.data);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Profile Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter(category =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, categories]);

  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
          <Sparkles className="w-6 h-6 text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="ml-4 text-purple-300 text-lg">Loading categories...</p>
      </div>
    );
  }

  return (
    <>
      {/* Search Bar and Random Quiz Button */}
      <div className="flex gap-4 mb-6 sticky top-4 z-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-[#2a2a40] to-[#252544] text-white placeholder-purple-300 border border-orange-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm shadow-lg"
          />
        </div>
        
        <button
          onClick={()=>navigate('/exploreQuizzes')}
          className="px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 group shadow-lg"
        >
          <Shuffle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          <span  className="hidden sm:inline">Popular Quizzes</span>
          <span className="sm:hidden">🎲</span>
        </button>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 && !isLoading ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-purple-300 mb-2">No categories found</h3>
          <p className="text-purple-400">Try adjusting your search terms</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 pr-2">
          {filteredCategories.map((category, index) => (
            <div
              key={category._id}
              onClick={() => setSelectedCategory(category)}
              style={{ animationDelay: `${index * 0.05}s` }}
              className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up backdrop-blur-sm relative overflow-hidden
                ${selectedCategory?._id === category._id
                  ? 'border-purple-500 bg-gradient-to-br from-purple-800/60 to-pink-800/40 shadow-purple-500/25 shadow-xl'
                  : 'border-purple-700/30 bg-gradient-to-br from-purple-900/40 to-indigo-900/30 hover:border-purple-500/50 hover:bg-gradient-to-br hover:from-purple-800/50 hover:to-pink-800/30'
                }
              `}
            >
              <div className="text-center relative z-10">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-white group-hover:text-purple-200 transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-purple-300 group-hover:text-purple-200 transition-colors leading-relaxed">
                  {category.description}
                </p>
                
                {/* Selection indicator */}
                {selectedCategory?._id === category._id && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="flex items-center gap-2 bg-purple-500/30 px-3 py-1 rounded-full border border-purple-400/30">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-purple-200">Selected</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              {/* Subtle shine effect */}
              <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
            </div>
          ))}
        </div>
      )}

      {/* Category count */}
      {!isLoading && (
        <div className="text-center mt-8">
          <p className="text-purple-400 text-sm">
            {searchTerm ? (
              <>Showing {filteredCategories.length} of {categories.length} categories</>
            ) : (
              <>{categories.length} categories available</>
            )}
          </p>
        </div>
      )}

      
    </>
  );
};

export default CategorySelection;