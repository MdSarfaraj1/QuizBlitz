import React, { useState, useEffect } from "react";
import QuizEdit from "./QuizEdit"; // adjust path if needed

import {
  Edit3,
  Trash2,
  Users,
  Star,
  Clock,
  BookOpen,
  Search,
  CheckCircle,
  Eye,
  ArrowLeft,
 
  Info,
} from "lucide-react"; 
import axios from "axios";

const MyQuizzes = () => {
  const [currentView, setCurrentView] = useState("list"); // 'list', 'view', 'edit'
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({});
 const handleView = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentView("view");
  };
  // initializing quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/userCreatedQuiz`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        const data = response.data;
        console.log("created quiz of user",data)
        setQuizzes(data.quizzes || []);
        setFilteredQuizzes(data.quizzes || []);
      }
    } catch (err) {
      setQuizzes([]);
      setFilteredQuizzes([]);
      console.error("Error fetching created quizzes:", err);
    } finally {
     setLoading(false)
    }
  };
  fetchQuizzes();
  }, []);

  // filtering quizzes based on search
  useEffect(() => {
    let filtered = quizzes;
    if (searchTerm) {
      filtered = filtered.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (quiz) => quiz.difficulty === selectedDifficulty
      );
    }
    setFilteredQuizzes(filtered);
  }, [searchTerm, selectedDifficulty, quizzes]);

// delete quiz
  const handleDelete = (quiz) => { //triggering deletion
    setQuizToDelete(quiz);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    if (!quizToDelete) return;
    setLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/deleteQuiz/${quizToDelete._id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setQuizzes((prev) => prev.filter((quiz) => quiz._id !== quizToDelete._id));
        setShowDeleteModal(false);0
        setQuizToDelete(null);
      } else if(response.status===403){
        // Optionally show error
        alert(response.data.error);
      }
    } catch (err) {
      alert("Error deleting quiz. Please try again.");
      console.error("Delete quiz error:", err);
    } finally {
      setLoading(false);
    }
  };
  //end of delete quiz

  //edit and save changes
  const handleEdit = (quiz) => {
    setSelectedQuiz(quiz);
    setEditForm({
      title: quiz.title,
      description: quiz.description,
      difficulty: quiz.difficulty,
      duration: quiz.duration,
      image: quiz.image,
      // Deep copy questions to prevent direct mutation of state
      questions: quiz.questions.map((q) => ({ ...q, options: [...q.options] })),
    });
    setCurrentView("edit");
  };
  const handleSaveEdit = async () => {
    if (!selectedQuiz) return;
    setLoading(true);
    try {
      const updatedQuiz = {
        ...editForm,
        totalQuestions: editForm.questions.length,
      };
      console.log("from update user route",selectedQuiz._id,updatedQuiz);
      const response = await axios.put(
        `${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/updateQuiz/${selectedQuiz._id}`,
      updatedQuiz,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setQuizzes((prev) =>
          prev.map((quiz) =>
            quiz._id === selectedQuiz._id ? { ...quiz, ...updatedQuiz } : quiz
          )
        );
        setCurrentView("list");
        setSelectedQuiz(null);
        alert("Quiz updated successfuly!")
      } else {
        alert("Failed to update quiz. Please try again.");
      }
    } catch (err) {
      alert("Error updating quiz. Please try again.");
      console.error("Update quiz error:", err);
    } finally {
      setLoading(false);
    }
  };

 
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-200 text-green-800 border border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-red-800 border border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };


  // Quiz View Component
const QuizView = () => (
  <div className="min-h-screen bg-gradient-to-br rounded-t-lg from-blue-50 to-indigo-100 p-6 font-sans flex flex-col items-center">
    {/* back button */}
    <div className="w-full max-w-5xl mb-4">
      <button
        onClick={() => setCurrentView("list")}
        className="flex items-center gap-1 text-gray-700 bg-white hover:bg-gray-100 p-2 rounded-md transition-colors shadow-md border border-gray-200"
        title="Back to Quizzes List"
      >
        <ArrowLeft size={16} className="flex-shrink-0" />
        <span className="font-medium text-sm">Back</span>
      </button>
    </div>
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-8 md:p-10">
        <div
          className={`flex flex-col md:flex-row bg-gradient-to-br ${selectedQuiz.color} items-start md:items-center justify-between p-6 rounded-lg shadow-inner text-white mb-6 gap-6`}
        >
          <div className="flex items-center gap-5 flex-1">
            <span className="text-6xl drop-shadow-md flex-shrink-0">
              {selectedQuiz.image}
            </span>
            <div className="flex flex-col">
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-1 text-white">
            
                {selectedQuiz.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-100 opacity-90">
                
                {selectedQuiz.description}
              </p>
            </div>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-bold shadow-md flex-shrink-0 ${getDifficultyColor(
              selectedQuiz.difficulty
            )}`}
          >
            {selectedQuiz.difficulty.charAt(0).toUpperCase() +
              selectedQuiz.difficulty.slice(1)}
          </span>
        </div>

        {/* The rest of your content (stats, questions) follows */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 p-6 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Clock size={24} className="text-blue-500" />
              {selectedQuiz.duration}
            </div>
            <div className="text-sm text-gray-600 mt-1">Minutes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <BookOpen size={24} className="text-purple-500" />
              {selectedQuiz.totalQuestions}
            </div>
            <div className="text-sm text-gray-600 mt-1">Questions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Users size={24} className="text-green-500" />
              {selectedQuiz.participants}
            </div>
            <div className="text-sm text-gray-600 mt-1">Participants</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Star size={24} className="text-yellow-500" fill="currentColor" />
              {selectedQuiz.rating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Rating ({selectedQuiz.ratingCount})
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Quiz Questions
          </h3>
          <div className="space-y-6">
            {selectedQuiz.questions.map((question, index) => (
              <div
                key={question._id}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-lg font-bold px-3 py-1 rounded-full flex-shrink-0 min-w-[32px] text-center">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-xl text-gray-900 mb-4 leading-relaxed">
                      {question.question}
                    </p>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg flex items-center gap-3 transition-colors duration-200 ${
                            optionIndex === question.correctAnswer
                              ? "bg-green-50 border border-green-200 text-green-800"
                              : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
                          }`}
                        >
                          <span
                            className={`font-bold ${
                              optionIndex === question.correctAnswer
                                ? "text-green-600"
                                : "text-gray-600"
                            }`}
                          >
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          <span className="flex-1">{option}</span>
                          {optionIndex === question.correctAnswer && (
                            <span className="ml-auto text-green-600 font-semibold text-sm flex items-center gap-1">
                              <CheckCircle size={16} /> Correct
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded-lg w-96 mb-8 mx-auto md:mx-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg p-6 h-36"
                >
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg p-6 h-80"
                >
                  <div className="h-24 bg-gray-200 rounded-t-2xl mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-5/6 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
    {currentView === "list" && (
  <QuizListView
    quizzes={quizzes}
    filteredQuizzes={filteredQuizzes}
    searchTerm={searchTerm}
    selectedDifficulty={selectedDifficulty}
    setSearchTerm={setSearchTerm}
    setSelectedDifficulty={setSelectedDifficulty}
    handleView={handleView}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    getDifficultyColor={getDifficultyColor}
    formatDate={formatDate}
  />
)}
{currentView === "view" && <QuizView />}
{currentView === "edit" && (
  <QuizEdit
    editForm={editForm}
    setEditForm={setEditForm}
    handleSaveEdit={handleSaveEdit}
    setCurrentView={setCurrentView}
  />
)}


      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-auto shadow-2xl transform scale-100 animate-fade-in-up">
            <div className="text-center mb-6">
              <Trash2 size={48} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 text-base">
                Are you sure you want to delete "
                <span className="font-semibold text-gray-800">
                  {quizToDelete?.title}
                </span>
                "? This action is irreversible.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-3 rounded-lg transition-colors border border-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                Delete Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

  // Quiz List View
const QuizListView = ({
  quizzes,
  filteredQuizzes,
  searchTerm,
  selectedDifficulty,
  setSearchTerm,
  setSelectedDifficulty,
  handleView,
  handleEdit,
  handleDelete,
  getDifficultyColor,
  formatDate,
}) => (
    <div className="min-h-screen bg-gradient-to-br text-gr  rounded-t-lg from-blue-50 to-indigo-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            My Quizzes 📚
          </h1>
          <p className="text-lg text-gray-700 mt-2">
            Effortlessly manage and track your quiz collection.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <div className="flex-1 w-full">
              <label htmlFor="search-quiz" className="sr-only">
                Search quizzes
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="search-quiz"
                  type="text"
                  placeholder="Search quizzes by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="w-full md:w-auto">
              <label htmlFor="difficulty-select" className="sr-only">
                Filter by difficulty
              </label>
              <select
                id="difficulty-select"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full md:w-48 px-5 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out appearance-none bg-white pr-10 text-gray-800"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "1.2em",
                }}
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium text-gray-600">
                  Total Quizzes
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {quizzes.length}
                </p>
              </div>
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center shadow-inner">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium text-gray-600">
                  Total Participants
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {quizzes.reduce((sum, quiz) => sum + quiz.participants, 0)}
                </p>
              </div>
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center shadow-inner">
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium text-gray-600">
                  Average Rating
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1 flex items-center">
                  {quizzes.length > 0
                    ? (
                        quizzes.reduce((sum, quiz) => sum + quiz.rating, 0) /
                        quizzes.length
                      ).toFixed(1)
                    : "0.0"}
                  <Star
                    className="h-5 w-5 text-yellow-500 ml-2"
                    fill="currentColor"
                  />
                </p>
              </div>
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center shadow-inner">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Grid */}
        {filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform hover:-translate-y-2 hover:shadow-xl transition duration-300 ease-in-out"
              >
                <div
                  className={`h-24 rounded-t-2xl flex items-center justify-between p-4 text-white relative overflow-hidden bg-gradient-to-r ${quiz.color}`}
                >
                  {/* Faded background emoji */}
                  <div className="absolute top-0 right-0 text-7xl opacity-20 rotate-12 pointer-events-none">
                    {quiz.image}
                  </div>
                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold line-clamp-2 pr-4 z-10">
                    {quiz.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm ${getDifficultyColor(quiz.difficulty)}`}
                  >
                    {quiz.difficulty.charAt(0).toUpperCase() +
                      quiz.difficulty.slice(1)}
                  </span>
                </div>

                {/* Main Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {quiz.description}
                  </p>

                  <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700 mb-5">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-blue-500" />
                      <span>{quiz.duration} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} className="text-purple-500" />
                      <span>{quiz.totalQuestions} Qs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-green-500" />
                      <span>{quiz.participants} enrolled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star
                        size={16}
                        className="text-yellow-500"
                        fill="currentColor"
                      />
                      <span>
                        {quiz.rating} 
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mb-5 border-t border-gray-100 pt-4">
                    Created on {formatDate(quiz.createdAt)}
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleView(quiz)}
                      className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 p-2 rounded-md flex items-center justify-center transition-colors duration-200 border border-gray-200 shadow-sm hover:shadow-md"
                      title="View Quiz Details"
                    >
                      <Eye size={15} className="flex-shrink-0" />
                      <span className="hidden sm:inline-block text-xs ml-1">
                        View
                      </span>
                    </button>
                    <button
                      onClick={() => handleEdit(quiz)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-lg"
                      title="Edit Quiz"
                    >
                      <Edit3 size={15} className="flex-shrink-0" />
                      <span className="hidden sm:inline-block text-xs ml-1">
                        Edit
                      </span>
                    </button>
                    <button
                      onClick={() => handleDelete(quiz)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-md flex items-center justify-center transition-colors duration-200 border border-red-200 shadow-sm hover:shadow-md"
                      title="Delete Quiz"
                    >
                      <Trash2 size={15} className="flex-shrink-0" />
                      <span className="hidden sm:inline-block text-xs ml-1">
                        Delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100 mx-auto max-w-lg">
            <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Info className="h-14 w-14 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No quizzes found
            </h3>
            <p className="text-gray-600 text-base max-w-sm mx-auto">
              {searchTerm || selectedDifficulty !== "all"
                ? "It seems your search or filter criteria yielded no results. Try broadening your search!"
                : "You currently have no quizzes. Start by creating a new one to populate your collection!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
export default MyQuizzes;
