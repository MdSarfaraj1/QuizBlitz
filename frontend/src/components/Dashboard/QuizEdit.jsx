import React from "react";
import { Save, X, Info, BookOpen, Plus, Trash2 } from "lucide-react";

const QuizEdit = ({
  editForm,
  setEditForm,
  handleSaveEdit,
  setCurrentView,
}) => {
  const addQuestion = () => {
    const newQuestion = {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    };
    setEditForm({
      ...editForm,
      questions: [ newQuestion, ...(editForm.questions || [])],
    });
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...editForm.questions];
    updatedQuestions[index][field] = value;
    setEditForm({ ...editForm, questions: updatedQuestions });
  };

  const updateQuestionOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...editForm.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setEditForm({ ...editForm, questions: updatedQuestions });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...editForm.questions];
    updatedQuestions.splice(index, 1);
    setEditForm({ ...editForm, questions: updatedQuestions });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 font-sans antialiased">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
      <div className="sticky top-0 z-10 bg-white flex items-center justify-between mb-8 border-b pb-6 border-blue-600  px-2 pt-4">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
            Edit Quiz <span className="text-blue-500 text-4xl">✨</span>
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentView("list")}
              className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 font-medium border border-gray-200"
            >
              <X size={18} />
              <span className="hidden sm:inline">Cancel</span>
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 font-medium shadow-md"
            >
              <Save size={18} />
              <span className="hidden sm:inline">Save Changes</span>
            </button>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-10">
          {/* Quiz Details */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Info size={24} className="text-blue-500" /> Quiz Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quiz Title
                </label>
                <input
                  type="text"
                  value={editForm.title || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={editForm.duration || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      duration: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              {/* Difficulty */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={editForm.difficulty || "medium"}
                  onChange={(e) =>
                    setEditForm({ ...editForm, difficulty: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            {/* Description */}
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={editForm.description || ""}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Questions Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <BookOpen size={24} className="text-green-500" /> Quiz Questions
                <span className="text-gray-500 text-xl font-normal">
                  ({editForm.questions?.length || 0})
                </span>
              </h3>
              <button
                type="button"
                onClick={addQuestion}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 font-medium shadow-md"
              >
                <Plus size={18} />
                Add Question
              </button>
            </div>

            <div className="space-y-6">
              {editForm.questions?.map((question, index) => (
                <div
                  key={index}
                  className="relative border border-gray-200 rounded-xl p-6 bg-gray-50 shadow-sm"
                >
                  {/* Delete Question Button */}
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition"
                    title="Delete this question"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Question Text */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Question {index + 1}
                    </label>
                    <textarea
                      value={question.question}
                      onChange={(e) =>
                        updateQuestion(index, "question", e.target.value)
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Enter your question..."
                    />
                  </div>

                  {/* Options */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Options (select the correct one)
                    </label>
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-200"
                      >
                        <input
                          type="radio"
                          name={`correct-answer-${index}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() =>
                            updateQuestion(index, "correctAnswer", optionIndex)
                          }
                          className="h-5 w-5 text-blue-600 cursor-pointer"
                        />
                        <span className="font-bold text-gray-700">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            updateQuestionOption(
                              index,
                              optionIndex,
                              e.target.value
                            )
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder={`Option ${String.fromCharCode(
                            65 + optionIndex
                          )}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizEdit;
