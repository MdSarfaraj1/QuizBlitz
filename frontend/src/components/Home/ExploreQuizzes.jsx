import { useEffect, useState, useCallback } from "react"; // Import useCallback
import { Search, Filter, Clock, Users, Star, ArrowRight, BookOpen, Brain, Globe, Calculator, Palette, Music, ChevronDown, Bookmark, BookmarkCheck, TrendingUp, ArrowLeft } from "lucide-react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/UserContextProvider";
import { Toast } from "../UI/toast";
import MultiplayerModal from "../Multiplayer/MultiPlayer";

const ExploreQuizzes = () => {
    const { userId } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const [quizzes, setQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [savedQuizzes, setSavedQuizzes] = useState(new Set()); // Track saved quizzes
    const [initialSavedQuizzes, setInitialSavedQuizzes] = useState(new Set()); // To compare for changes
    const [showFilters, setShowFilters] = useState(false);
    const [toast, setToastMessage] = useState("");
    const [quizId,setQuizId]=useState("")// useful in multiplayer management
      const [showMultiplayerModal, setShowMultiplayerModal] = useState(false);

  const handleStartMultiplayer = async (id) => {
    setQuizId(id)
    setShowMultiplayerModal(true);
  };
    // --- Fetch Quizzes and Initial Saved State ---
    useEffect(() => {
        const getPredefinedQuizSet = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/getQuizSets`, {
                    params: { userId },
                    withCredentials: true,
                });
                if (response.status === 200) {
                    setQuizzes(response.data.quiz);
                    if (Array.isArray(response.data.quizIds)) {
                        const initialSet = new Set(response.data.quizIds);
                        setSavedQuizzes(initialSet);
                        setInitialSavedQuizzes(initialSet); // Store initial state
                    }
                    console.log("Quiz of the day:", response.data.quiz);
                    setIsLoading(false);
                }
            } catch (e) {
                console.error("Error fetching quiz of the day:", e);
                setIsLoading(false); // Ensure loading state is turned off even on error
                setToastMessage({
                    message: "Failed to load quizzes. Please try again.",
                    type: "failure",
                });
            }
        };
        getPredefinedQuizSet();
    }, [userId]); // Depend on userId to refetch if it changes

    // --- Determine if the list of saved quizzes has been modified ---
    const isListModified = savedQuizzes.size !== initialSavedQuizzes.size ||
                           ![...savedQuizzes].every(id => initialSavedQuizzes.has(id));


    // --- Handle Saving/Unsving a single quiz ---
    const handleToggleSaveQuiz = useCallback((quizId) => {
        setSavedQuizzes(prevSavedQuizzes => {
            const newSavedQuizzes = new Set(prevSavedQuizzes);
            if (newSavedQuizzes.has(quizId)) {
                newSavedQuizzes.delete(quizId);
            } else {
                newSavedQuizzes.add(quizId);
            }
            return newSavedQuizzes;
        });
    }, []); // No dependencies for useCallback as it uses functional update of state

    // --- Handle the "Save Changes" action ---
    const handleSaveChanges = async () => {
        if (!isListModified) {
            setToastMessage({
                message: "No changes to save!",
                type: "info",
            });
            return;
        }
        if(!userId){
              setToastMessage({
                    message: "You have to login first!",
                    type: "failure",
                });
                return
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/saveUnsaveQuiz`, {
                quizIds: Array.from(savedQuizzes),
            }, { withCredentials: true });

            if (response.status === 200) {
                // Update initialSavedQuizzes to reflect the new saved state
                setInitialSavedQuizzes(new Set(savedQuizzes));
                setToastMessage({
                    message: "Quizzes saved successfully!",
                    type: "success",
                });
                console.log("Saved quizzes successfully:", response.data);
            }
        } catch (error) {
            console.error("Error saving quizzes:", error);
            setToastMessage({
                message: "Failed to save changes. Please try again.",
                type: "failure",
            });
        }
    };

    const handleStartQuiz = async (id) => {
        try {
             if (!userId) {
      const hasPlayed = localStorage.getItem('guestQuizPlayed');
      if (hasPlayed) {
        alert("You've already played once as a guest. Please log in to play again.");
        return;
      } else {
        localStorage.setItem('guestQuizPlayed', 'true');
      }
    }
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/startPredefinedQuiz/${id}`, { withCredentials: true });

            if (response.status === 200) {
                const quizData = response.data;
                console.log("Quiz data:", quizData);
                navigate('/runQuiz', { state: { quizData } });
            }
        } catch (error) {
            console.error("Error starting quiz:", error);
            setToastMessage({
                message: "Failed to start quiz. Please try again.",
                type: "failure",
            });
        }
    };


    const filteredQuizzes = quizzes.filter(quiz => {
        const matchesSearch = quiz.category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || quiz.category.title === selectedCategory;
        const matchesDifficulty = selectedDifficulty === "all" || quiz.difficulty === selectedDifficulty;

        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "easy": return "text-green-600 bg-green-100";
            case "medium": return "text-yellow-600 bg-yellow-100";
            case "hard": return "text-red-600 bg-red-100";
            default: return "text-gray-600 bg-gray-100";
        }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="mx-auto max-w-7xl px-4 pt-8 pb-4 relative">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Dive into{" "}
                <span className="text-quizDashboard-primary">Quiz</span>
                <span className="text-quizDashboard-accent">Blitz</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Sharpen your computer science skills with bite-sized quizzes —
                from algorithms and data structures to full-stack web
                development. Learn faster. Practice smarter.
              </p>
            </div>
            {/* Back to Dashboard Button */}
            <button
              onClick={() => navigate("/startQuiz")}
              className="absolute top-8 left-6 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 transition duration-300 group"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700 group-hover:text-quizDashboard-accent transition" />
              <span className="font-semibold text-gray-800 text-base hidden sm:inline group-hover:text-quizDashboard-accent">
                Back
              </span>
            </button>
          </div>
        </div>

        {/* Quiz Grid */}
        <div className="container mx-auto max-w-7xl px-4 pb-12 pt-5">
          <div className="flex sticky top-0 z-30 shadow-md rounded-b-md bg-white items-center mb-8 p-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                {isLoading
                  ? "🔄 Loading Amazing Quizzes..."
                  : `🎯 ${filteredQuizzes.length} Quiz${
                      filteredQuizzes.length !== 1 ? "zes" : ""
                    } Found`}
              </h2>
              <p className="text-slate-600 text-lg">
                Choose your challenge and level up your skills
              </p>
            </div>

            {/* Save Changes Button */}
            <button
              onClick={handleSaveChanges}
              disabled={!isListModified}
              title={
                isListModified
                  ? "Click to save your changes"
                  : "No Quizzes is Seected"
              }
              className={`flex items-center gap-3 ml-6 px-6 py-3 rounded-full transition-all duration-300
                            ${
                              isListModified
                                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 scale-105"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
            >
              <span className="font-semibold">
                {isListModified ? "Save Changes" : "Mark For Later"}
              </span>
              {isListModified && <BookmarkCheck className="h-5 w-5" />}
            </button>

            {/* Search and Filters */}
            <div className="relative group ml-6 flex-1">
              {/* Search Icon */}
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search topics, languages, frameworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-32 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-700 placeholder-slate-400 shadow-lg hover:shadow-xl"
              />

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-700 shadow-md font-medium"
              >
                <Filter className="h-4 w-4 text-slate-500" />
                <ChevronDown
                  className={`h-3 w-3 text-slate-500 transition-transform duration-300 ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Filter Dropdown */}
              {showFilters && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border-2 border-slate-200 rounded-2xl shadow-2xl z-50 p-6">
                  <div className="space-y-6">
                    {/* Difficulty Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Difficulty
                      </label>
                      <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-700 appearance-none cursor-pointer"
                      >
                        <option value="all">All Difficulties</option>
                        <option value="easy">🟢 Easy</option>
                        <option value="medium">🟡 Medium</option>
                        <option value="hard">🔴 Hard</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {toast && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToastMessage(null)}
              />
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border overflow-hidden animate-pulse"
                >
                  {/* Skeleton Header */}
                  <div className="bg-gray-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
                      <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
                  </div>

                  {/* Skeleton Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="text-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-12 mx-auto mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded w-16 mx-auto"></div>
                        </div>
                      ))}
                    </div>
                    <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredQuizzes.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No CS quizzes found
              </h3>
              <p className="text-gray-600">
                Try searching for different programming topics or adjust your
                filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredQuizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border overflow-hidden group"
                >
                  {/* Quiz Header with Gradient */}
                  <div
                    className={`bg-gradient-to-r ${quiz.color} p-6 text-white relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 text-6xl opacity-20 transform rotate-12">
                      {quiz.image}
                    </div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                            quiz.difficulty
                          )}`}
                        >
                          {quiz.difficulty}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-semibold">
                              {quiz.rating}
                            </span>
                          </div>
                          <button
                            onClick={() => handleToggleSaveQuiz(quiz._id)}
                            className="p-1 rounded-full hover:bg-white/20 transition-colors"
                            title={
                              savedQuizzes.has(quiz._id)
                                ? "Remove from saved"
                                : "Save for later"
                            }
                          >
                            {savedQuizzes.has(quiz._id) ? (
                              <BookmarkCheck className="h-5 w-5 fill-current" />
                            ) : (
                              <Bookmark className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">
                        {quiz.title}
                      </h3>
                      <p className="text-white/90 text-sm line-clamp-2">
                        {quiz.description}
                      </p>
                    </div>
                  </div>

                  {/* Quiz Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          {quiz.duration} min
                        </p>
                        <p className="text-xs text-gray-500">Duration</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <BookOpen className="h-4 w-4 text-gray-500" />
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          {quiz.totalQuestions}
                        </p>
                        <p className="text-xs text-gray-500">Questions</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="h-4 w-4 text-gray-500" />
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          {quiz.participants.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">Players</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      {/* Start Quiz Button */}
                      <button
                        onClick={() => handleStartQuiz(quiz._id)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm group"
                      >
                        Start
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      {/* Multiplayer Button */}
                      <button
                        onClick={()=>handleStartMultiplayer(quiz._id)}
                        className="flex-1  bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow"
                      >
                        🤝 Multiplayer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Multiplayer Modal */}
        <MultiplayerModal
          isOpen={showMultiplayerModal}
          onClose={() => setShowMultiplayerModal(false)}
          userId={userId}
          quizId={quizId}
        />
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Test Your Own CS Knowledge?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Create custom computer science quizzes and challenge your ability!
            </p>
            <button
              onClick={() => navigate("/startQuiz")}
              className="inline-flex items-center gap-2 ml-5 bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Start Random One
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
};

export default ExploreQuizzes;