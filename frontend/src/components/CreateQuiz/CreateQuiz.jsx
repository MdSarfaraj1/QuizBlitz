
  import { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Lightbulb, Save, Eye, Clock, BookOpen, Target, Zap, Search, ChevronDown, Wand2 } from 'lucide-react';
import { sendGeminiRequest } from '../../Utills/getResponseFromAI';
import axios from 'axios';

export default function CraeteQuiz() {
  const [quizData, setQuizData] = useState({
    description: '',
    category: '',
    categoryId:'',
    image: '',
    difficulty: '',
    duration: 5,
    questions: [
      {
        id: 1,
        questionText: '',
        correctAnswer: '',
        options: ['', '', ''],
        hint: ''
      }
    ],
  });

  const [categories, setCategories] = useState([]);
  const [categorySearch, setCategorySearch] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const categoryRef = useRef(null);
  const categoryInputRef = useRef(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/allCategories`)
      .then(response => {
        setCategories(response.data.categories);
        console.log('Categories fetched:', response.data);
      });
  }, []);

  const filteredCategories = categories.filter(cat =>
    cat.title.toLowerCase().includes(categorySearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const difficulties = [
    { value: 'easy', label: 'Easy', color: 'from-green-500 to-emerald-600' },
    { value: 'medium', label: 'Medium', color: 'from-yellow-500 to-orange-600' },
    { value: 'hard', label: 'Hard', color: 'from-red-500 to-rose-600' }
  ];

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      questionText: '',
      correctAnswer: '',
      options: ['', '', ''],
      hint: ''
    };
    setQuizData(prev => ({
      ...prev,
      questions: [newQuestion, ...prev.questions]
    }));
  };

  const removeQuestion = (questionId) => {
    if (quizData.questions.length > 1) {
      setQuizData(prev => ({
        ...prev,
        questions: prev.questions.filter(q => q.id !== questionId)
      }));
    }
  };

  const updateQuestion = (questionId, field, value, optionIndex = null) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId) {
          if (field === 'options' && optionIndex !== null) {
            const newOptions = [...q.options];
            newOptions[optionIndex] = value;
            return { ...q, options: newOptions };
          }
          return { ...q, [field]: value };
        }
        return q;
      })
    }));
  };

  const generateAIContent = async (questionId) => {
    setIsLoading(true);
    const question = quizData.questions.find(q => q.id === questionId);

    if (!question.questionText || !question.correctAnswer) {
      alert('Please enter the question text and correct answer first.');
      setIsLoading(false);
      return;
    }

    const systemInstruction = `You are an intelligent quiz content generator. Your task is to generate:\n      - 3 wrong but plausible options (distractors) for a multiple-choice question.\n      - 1 short relatable hint that helps solve the question.\n    Respond in this JSON format:\n      {\n        \"options\": [\"wrong1\", \"wrong2\", \"wrong3\"],\n        \"hint\": \"your hint here\"\n      }`;

    const userPrompt = ` Category: ${quizData.category}\n                          Question: ${question.questionText} \n                          Correct Answer: ${question.correctAnswer}`;

    try {
      const aiResponse = await sendGeminiRequest(systemInstruction, userPrompt);
      const cleanJSON = aiResponse.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJSON);

      updateQuestion(questionId, 'options', parsed.options[0], 0);
      updateQuestion(questionId, 'options', parsed.options[1], 1);
      updateQuestion(questionId, 'options', parsed.options[2], 2);
      updateQuestion(questionId, 'hint', parsed.hint);
    } catch (error) {
      console.error('Error parsing AI response:', error);
      alert('AI failed to generate content. Please try again.');
    }finally {  
      setIsLoading(false);
    }
  };

  const selectCategory = (title) => {
    const selected = categories.find(cat => cat.title === title);
    if (selected) {
      setQuizData(prev => ({
        ...prev,
        category: selected.title,
        image: selected.icon,
        categoryId:selected._id
      }));
      setCategorySearch(title);
      setShowCategoryDropdown(false);
    }
  };

  const handleQuizInfoChange = (field, value) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const saveQuiz = async () => {
  
    if (!quizData.description || !quizData.category || !quizData.difficulty) {
      alert('Please fill in all quiz information fields.');
      return;
    }

    const incompleteQuestions = quizData.questions.filter(q =>
      !q.questionText || !q.correctAnswer || q.options.some(opt => !opt)
    );

    if (incompleteQuestions.length > 0) {
      alert('Please complete all questions and their options.');
      return;
    }

    if (quizData.questions.length < 1) {
      alert('Please add at least 5 questions to your quiz.');
      return;
    }

    try {
        setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/createQuiz`,
        { quizData },
        { withCredentials: true }
      );
      if (response.status === 201) {
        alert('Quiz saved successfully!');
      } else {
        alert('Failed to save quiz. Please try again later.');
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Failed to save quiz. Please try again later.');
    }finally {
      setIsLoading(false);
    }
  };

  const previewQuiz = () => {
    console.log('Quiz preview:', quizData);
    alert('Quiz preview will open in a new window.');
  };


  return (
    <div className="min-h-screen border-0 hover:shadow-lg hover:-translate-y-1 transition-transform shadow-md bg-gradient-to-br rounded-t-lg from-blue-100  to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Design Your Ultimate Quiz
          </h1>
          <p className="text-gray-600">
            Create engaging quizzes with custom questions and settings
          </p>
        </div>

        {/* Quiz Information */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-indigo-100/50 mb-8 border border-indigo-100/30">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-indigo-600" />
            Quiz Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Description
              </label>
              <input
                type="text"
                value={quizData.description}
                onChange={(e) =>
                  handleQuizInfoChange("description", e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="What types of questions it contains..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="relative" ref={categoryRef}>
                <div
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all duration-200 cursor-pointer bg-white"
                  onClick={() => {
                    setShowCategoryDropdown(true);
                    if (categoryInputRef.current) {
                      categoryInputRef.current.focus();
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <input
                      ref={categoryInputRef}
                      type="text"
                      value={categorySearch}
                      onChange={(e) => {
                        const value = e.target.value;
                        setCategorySearch(value);
                        if (value === "") {
                          handleQuizInfoChange("category", "");
                        }
                      }}
                      className="flex-1 outline-none bg-transparent"
                      placeholder="Search categories..."
                      onFocus={() => setShowCategoryDropdown(true)}
                      autoComplete="off"
                    />
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((cat) => (
                        <button
                          key={cat._id}
                          onClick={() => selectCategory(cat.title)}
                          className="w-full text-left px-4 py-3 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                        >
                          {cat.title}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500 text-sm">
                        No categories found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff.value}
                    onClick={() =>
                      handleQuizInfoChange("difficulty", diff.value)
                    }
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      quizData.difficulty === diff.value
                        ? `bg-gradient-to-r ${diff.color} text-white shadow-lg`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time Limit (minutes)
              </label>
              <input
                type="number"
                value={quizData.duration}
                onChange={(e) =>
                  handleQuizInfoChange(
                    "duration",
                    parseInt(e.target.value) || 0
                  )
                }
                min="1"
                max="180"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-indigo-100/50 mb-8 border border-indigo-100/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Zap className="h-6 w-6 text-indigo-600" />
              Questions ({quizData.questions.length})
            </h2>
            <button
              onClick={addQuestion}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              Add Question
            </button>
          </div>

          <div className="space-y-8">
            {quizData.questions.map((question, index) => (
              <div
                key={question.id}
                className="border border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-gray-50 to-white"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Question {index + 1}
                  </h3>
                  {quizData.questions.length > 1 && (
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question Text
                    </label>
                    <textarea
                      value={question.questionText}
                      onChange={(e) =>
                        updateQuestion(
                          question.id,
                          "questionText",
                          e.target.value
                        )
                      }
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Enter your question..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correct Answer
                    </label>
                    <input
                      type="text"
                      value={question.correctAnswer}
                      onChange={(e) =>
                        updateQuestion(
                          question.id,
                          "correctAnswer",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl border border-green-200 bg-green-50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter the correct answer..."
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Wrong Answer Options
                      </label>
                      <button
                        onClick={() => generateAIContent(question.id)}
                        disabled={isLoading}
                         className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-200 transform 
                          ${
                            isLoading
                              ? "bg-gray-400 cursor-not-allowed shadow-inner text-white"
                              : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-md hover:shadow-lg hover:scale-105 text-white"
                          }`}
                      >
                         <Wand2 className="h-4 w-4" />
                        {isLoading ? "Generating..." : "Generate with AI"}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {question.options.map((option, optIndex) => (
                        <input
                          key={optIndex}
                          type="text"
                          value={option}
                          onChange={(e) =>
                            updateQuestion(
                              question.id,
                              "options",
                              e.target.value,
                              optIndex
                            )
                          }
                          className="px-4 py-3 rounded-xl border border-red-200 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                          placeholder={`Wrong option ${optIndex + 1}...`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      💡 These are distractors - incorrect but plausible answers
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Hint
                      </label>
                      <span className="text-xs text-purple-600 font-medium">
                        Auto-generated with options
                      </span>
                    </div>
                    <textarea
                      value={question.hint}
                      onChange={(e) =>
                        updateQuestion(question.id, "hint", e.target.value)
                      }
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-yellow-200 bg-yellow-50 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Helpful hint will be generated automatically..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {quizData.questions.length < 5 && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-amber-800 text-sm">
                <strong>Note:</strong> You need at least 5 questions to create a
                quiz. Currently you have {quizData.questions.length}{" "}
                question(s).
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
       

          <button
            onClick={saveQuiz}
            disabled={isLoading}
             className={`flex items-center gap-2 px-8 py-4 text-sm rounded-lg transition-all duration-200 transform 
                          ${
                            isLoading
                              ? "bg-gray-400 cursor-not-allowed shadow-inner text-white"
                              : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-md hover:shadow-lg hover:scale-105 text-white px-8"
                          }`}
          >
            <Save className="h-5 w-5" />
            {isLoading ? "Saving..." : "Save Quiz"}
          </button>

        </div>

        {/* Quiz Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-indigo-100/30">
            <div className="text-2xl font-bold text-indigo-600">
              {quizData.questions.length}
            </div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-indigo-100/30">
            <div className="text-2xl font-bold text-purple-600">
              {quizData.duration}
            </div>
            <div className="text-sm text-gray-600">Minutes</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-indigo-100/30">
            <div className="text-2xl font-bold text-emerald-600">
              {quizData.difficulty || "Not Set"}
            </div>
            <div className="text-sm text-gray-600">Difficulty</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-indigo-100/30">
            <div className="text-2xl font-bold text-orange-600">
              {quizData.category || "Not Set"}
            </div>
            <div className="text-sm text-gray-600">Category</div>
          </div>
        </div>
      </div>
    </div>
  );
}