// AIQuizGenerator.jsx
import React, { useState } from 'react';
import { Brain, Download, Copy, Check } from 'lucide-react'; // Remove ChevronDown, ChevronRight as they are handled by parent

const AIQuizGenerator = () => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [showGeneratedQuiz, setShowGeneratedQuiz] = useState(false); // Still manage internal display of quiz content
  const [copiedIndex, setCopiedIndex] = useState(null);

  const difficultyOptions = [
    { value: 'easy', label: 'Easy', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'hard', label: 'Hard', color: 'bg-red-100 text-red-800' }
  ];

  const generateQuiz = async () => {
    if (!category.trim()) {
      alert('Please enter a category for the quiz');
      return;
    }

    setIsGenerating(true);
    setGeneratedQuiz(null);
    setShowGeneratedQuiz(false); // Collapse previous quiz when generating new one

    // Simulate API call with temporary data
    setTimeout(() => {
      const sampleQuizzes = {
        'javascript': {
          title: "JavaScript Fundamentals Quiz",
          category: "JavaScript",
          difficulty: difficulty,
          questions: [
            {
              question: "What is the correct way to declare a variable in JavaScript?",
              options: ["var myVar = 5;", "variable myVar = 5;", "v myVar = 5;", "declare myVar = 5;"],
              correctAnswer: 0,
              explanation: "The 'var' keyword is used to declare variables in JavaScript."
            },
            {
              question: "Which method is used to add an element to the end of an array?",
              options: ["push()", "pop()", "shift()", "unshift()"],
              correctAnswer: 0,
              explanation: "The push() method adds one or more elements to the end of an array."
            },
            {
              question: "What does '===' operator do in JavaScript?",
              options: ["Assigns a value", "Compares value only", "Compares both value and type", "Declares a variable"],
              correctAnswer: 2,
              explanation: "The '===' operator compares both value and type, making it a strict equality operator."
            }
          ]
        },
        'history': {
          title: "World History Quiz",
          category: "History",
          difficulty: difficulty,
          questions: [
            {
              question: "In which year did World War II end?",
              options: ["1944", "1945", "1946", "1947"],
              correctAnswer: 1,
              explanation: "World War II ended in 1945 with the surrender of Japan in September."
            },
            {
              question: "Who was the first President of the United States?",
              options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
              correctAnswer: 2,
              explanation: "George Washington was the first President of the United States, serving from 1789 to 1797."
            },
            {
              question: "Which ancient wonder of the world was located in Alexandria?",
              options: ["Colossus of Rhodes", "Lighthouse of Alexandria", "Hanging Gardens", "Statue of Zeus"],
              correctAnswer: 1,
              explanation: "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World."
            }
          ]
        },
        'science': {
          title: "General Science Quiz",
          category: "Science",
          difficulty: difficulty,
          questions: [
            {
              question: "What is the chemical symbol for gold?",
              options: ["Go", "Gd", "Au", "Ag"],
              correctAnswer: 2,
              explanation: "Au is the chemical symbol for gold, derived from the Latin word 'aurum'."
            },
            {
              question: "How many bones are in the adult human body?",
              options: ["206", "208", "210", "212"],
              correctAnswer: 0,
              explanation: "An adult human body has 206 bones."
            },
            {
              question: "What is the speed of light in vacuum?",
              options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "298,792,458 m/s"],
              correctAnswer: 0,
              explanation: "The speed of light in vacuum is exactly 299,792,458 meters per second."
            }
          ]
        }
      };

      // Find the most relevant quiz based on category
      let selectedQuiz = null;
      const categoryLower = category.toLowerCase();

      if (categoryLower.includes('javascript') || categoryLower.includes('js') || categoryLower.includes('programming')) {
        selectedQuiz = sampleQuizzes.javascript;
      } else if (categoryLower.includes('history') || categoryLower.includes('war') || categoryLower.includes('ancient')) {
        selectedQuiz = sampleQuizzes.history;
      } else if (categoryLower.includes('science') || categoryLower.includes('biology') || categoryLower.includes('chemistry') || categoryLower.includes('physics')) {
        selectedQuiz = sampleQuizzes.science;
      } else {
        // Default to a generic quiz with the entered category
        selectedQuiz = {
          title: `${category} Quiz`,
          category: category,
          difficulty: difficulty,
          questions: [
            {
              question: `What is a fundamental concept in ${category}?`,
              options: ["Option A", "Option B", "Option C", "Option D"],
              correctAnswer: 0,
              explanation: `This is a basic concept related to ${category}.`
            },
            {
              question: `Which of the following is most important in ${category}?`,
              options: ["First principle", "Second principle", "Third principle", "Fourth principle"],
              correctAnswer: 1,
              explanation: `The second principle is crucial for understanding ${category}.`
            }
          ]
        };
      }

      // Adjust number of questions based on user selection
      const questionsToShow = selectedQuiz.questions.slice(0, questionCount);

      const finalQuiz = {
        ...selectedQuiz,
        questions: questionsToShow
      };

      setGeneratedQuiz(finalQuiz);
      setShowGeneratedQuiz(true); // Show the generated quiz
      setIsGenerating(false);
    }, 2000); // Simulate 2-second API call
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const exportQuiz = () => {
    if (!generatedQuiz) return;

    const dataStr = JSON.stringify(generatedQuiz, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${generatedQuiz.title.replace(/\s+/g, '_')}_quiz.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category/Topic
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., World History, JavaScript, Biology"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Difficulty Level
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {difficultyOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Questions
          </label>
          <select
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {[3, 5, 10, 15, 20].map(num => (
              <option key={num} value={num}>{num} Questions</option>
            ))}
          </select>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          onClick={generateQuiz}
          disabled={isGenerating || !category.trim()}
          className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Generating Quiz...
            </>
          ) : (
            <>
              <Brain className="w-5 h-5 mr-2" />
              Generate Quiz ✨
            </>
          )}
        </button>
      </div>

      {/* Generated Quiz Display */}
      {generatedQuiz && (
        <div className="mt-8 border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowGeneratedQuiz(!showGeneratedQuiz)}
              className="flex items-center text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors"
            >
              {showGeneratedQuiz ? (
                <ChevronDown className="w-5 h-5 mr-2" />
              ) : (
                <ChevronRight className="w-5 h-5 mr-2" />
              )}
              Generated Quiz: {generatedQuiz.title}
            </button>

            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                difficultyOptions.find(d => d.value === generatedQuiz.difficulty)?.color
              }`}>
                {generatedQuiz.difficulty}
              </span>
              <button
                onClick={exportQuiz}
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Download className="w-4 h-4 mr-1" />
                Export
              </button>
            </div>
          </div>

          {showGeneratedQuiz && (
            <div className="space-y-6">
              {generatedQuiz.questions.map((question, qIndex) => (
                <div key={qIndex} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {qIndex + 1}. {question.question}
                    </h3>
                    <button
                      onClick={() => copyToClipboard(question.question, `q${qIndex}`)}
                      className="flex items-center text-gray-500 hover:text-gray-700 transition-colors ml-4"
                    >
                      {copiedIndex === `q${qIndex}` ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {question.options.map((option, oIndex) => (
                      <div
                        key={oIndex}
                        className={`p-3 rounded-lg border ${
                          oIndex === question.correctAnswer
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-white border-gray-200 text-gray-700'
                        }`}
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + oIndex)}.
                        </span>
                        {option}
                        {oIndex === question.correctAnswer && (
                          <span className="ml-2 text-green-600 font-semibold">✓</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-blue-800 mb-1">Explanation:</p>
                    <p className="text-blue-700">{question.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIQuizGenerator;