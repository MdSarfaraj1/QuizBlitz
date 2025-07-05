import { useState } from 'react';
import { Plus, Trash2, Lightbulb, Save, Eye, Clock, BookOpen, Target, Zap } from 'lucide-react';

export default function QuizCreator() {
  const [quizData, setQuizData] = useState({
    title: '',
    category: '',
    difficulty: '',
    timeLimit: 30,
    questions: [
      {
        id: 1,
        questionText: '',
        correctAnswer: '',
        options: ['', '', '', ''],
        hint: ''
      }
    ]
  });

  const categories = [
    'Science & Technology',
    'History',
    'Geography',
    'Literature',
    'Mathematics',
    'Sports',
    'Entertainment',
    'General Knowledge',
    'Art & Culture',
    'Business'
  ];

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
      options: ['', '', '', ''],
      hint: ''
    };
    setQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
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

  const generateHint = (questionId) => {
    // Simulate AI hint generation
    const hints = [
      "Think about what you learned in school about this topic.",
      "Consider the most common or well-known facts about this subject.",
      "Look for keywords in the question that might guide you to the answer.",
      "Try to eliminate the options that seem obviously incorrect first.",
      "Remember the basic principles or fundamental concepts related to this topic."
    ];
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    updateQuestion(questionId, 'hint', randomHint);
  };

  const handleQuizInfoChange = (field, value) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const saveQuiz = () => {
    // Validate quiz
    if (!quizData.title || !quizData.category || !quizData.difficulty) {
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

    if (quizData.questions.length < 5) {
      alert('Please add at least 5 questions to your quiz.');
      return;
    }

    console.log('Quiz saved:', quizData);
    alert('Quiz saved successfully!');
  };

  const previewQuiz = () => {
    console.log('Quiz preview:', quizData);
    alert('Quiz preview will open in a new window.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Quiz Creator
          </h1>
          <p className="text-gray-600">Create engaging quizzes with custom questions and settings</p>
        </div>

        {/* Quiz Information */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-indigo-100/50 mb-8 border border-indigo-100/30">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-indigo-600" />
            Quiz Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title</label>
              <input
                type="text"
                value={quizData.title}
                onChange={(e) => handleQuizInfoChange('title', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter quiz title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={quizData.category}
                onChange={(e) => handleQuizInfoChange('category', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select category...</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {difficulties.map(diff => (
                  <button
                    key={diff.value}
                    onClick={() => handleQuizInfoChange('difficulty', diff.value)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      quizData.difficulty === diff.value
                        ? `bg-gradient-to-r ${diff.color} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                value={quizData.timeLimit}
                onChange={(e) => handleQuizInfoChange('timeLimit', parseInt(e.target.value) || 0)}
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
              <div key={question.id} className="border border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Question {index + 1}</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
                    <textarea
                      value={question.questionText}
                      onChange={(e) => updateQuestion(question.id, 'questionText', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Enter your question..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
                    <input
                      type="text"
                      value={question.correctAnswer}
                      onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-green-200 bg-green-50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter the correct answer..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Answer Options</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {question.options.map((option, optIndex) => (
                        <input
                          key={optIndex}
                          type="text"
                          value={option}
                          onChange={(e) => updateQuestion(question.id, 'options', e.target.value, optIndex)}
                          className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder={`Option ${optIndex + 1}...`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Hint (Optional)</label>
                      <button
                        onClick={() => generateHint(question.id)}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors duration-200"
                      >
                        <Lightbulb className="h-3 w-3" />
                        AI Generate
                      </button>
                    </div>
                    <textarea
                      value={question.hint}
                      onChange={(e) => updateQuestion(question.id, 'hint', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Enter a helpful hint..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {quizData.questions.length < 5 && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-amber-800 text-sm">
                <strong>Note:</strong> You need at least 5 questions to create a quiz. Currently you have {quizData.questions.length} question(s).
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={previewQuiz}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Eye className="h-5 w-5" />
            Preview Quiz
          </button>
          
          <button
            onClick={saveQuiz}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Save className="h-5 w-5" />
            Save Quiz
          </button>
        </div>

        {/* Quiz Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-indigo-100/30">
            <div className="text-2xl font-bold text-indigo-600">{quizData.questions.length}</div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-indigo-100/30">
            <div className="text-2xl font-bold text-purple-600">{quizData.timeLimit}</div>
            <div className="text-sm text-gray-600">Minutes</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-indigo-100/30">
            <div className="text-2xl font-bold text-emerald-600">{quizData.difficulty || 'Not Set'}</div>
            <div className="text-sm text-gray-600">Difficulty</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-indigo-100/30">
            <div className="text-2xl font-bold text-orange-600">{quizData.category || 'Not Set'}</div>
            <div className="text-sm text-gray-600">Category</div>
          </div>
        </div>
      </div>
    </div>
  );
}