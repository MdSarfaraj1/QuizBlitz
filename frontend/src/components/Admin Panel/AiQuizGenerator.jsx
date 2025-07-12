import React, { useState } from "react";
import {
  Brain,
  Download,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { sendGeminiRequest } from "../../Utills/getResponseFromAI"; 
import axios from "axios"; 
import { Toast } from "../UI/toast";

const AIQuizGenerator = ({ categories = [] }) => {
  console.log(categories);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [showGeneratedQuiz, setShowGeneratedQuiz] = useState(false);
  const [isLoading,setIsLoading]=useState(false)
     const [toast, setToastMessage] = useState("");

  const difficultyOptions = [
    { value: "easy", label: "Easy", color: "bg-green-100 text-green-800" },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-100 text-yellow-800",
    },
    { value: "hard", label: "Hard", color: "bg-red-100 text-red-800" },
  ]; 

  const categorySuggestions = Array.isArray(categories) ? categories : [];

  const generateQuiz = async () => {
    if (!category.trim()) {
      alert("Please enter a category for the quiz");
      return;
    }

    setIsGenerating(true);
    setGeneratedQuiz(null);
    setShowGeneratedQuiz(false);

const systemPrompt = `You are an intelligent quiz generator AI. Your task is to create a structured quiz in raw JSON format only — no code blocks or extra text.

The output JSON must include:
- title: A short title based on the topic
- description: A brief description of what type of questions are included
- questions: An array of question objects

Each question object must include:
- question: A clear, concise question string
- options: An array of exactly 4 possible answers
- correctAnswer: The index (0–3) of the correct option
- explanation: A short explanation for the correct answer

Return only valid JSON. Do not include any Markdown, comments, or extra text.`;

    const userPrompt = `Generate a quiz on the topic "${category}" with ${questionCount} questions of  ${difficulty} difficulty `;

    try {
      const geminiResponse = await sendGeminiRequest(systemPrompt, userPrompt);
      console.log(geminiResponse)
let cleanedResponse = geminiResponse
  .replace(/^```(?:json)?\s*/i, '') // Remove ```json
  .replace(/```$/, '')              // Remove ending ```
  .replace(/`/g, '')                // Remove all backticks
  .trim();

const parsedQuiz = JSON.parse(cleanedResponse);
console.log("generated quize:",parsedQuiz)
      setGeneratedQuiz(parsedQuiz);
      setShowGeneratedQuiz(true);
    } catch (err) {
      console.error("Failed to generate quiz:", err);
      alert("Failed to generate quiz. Please try again.");
    }

    setIsGenerating(false);
  };


  // Save quiz to backend

const saveQuiz = async () => {
  setIsLoading(true)
  if (!generatedQuiz) return;
const selectedCategory = categorySuggestions.find(cat => cat.name === category);

 let timeConstant=difficulty === 'easy' ? 0.5 : difficulty === 'medium' ? 0.8 : 1;
  const duration = Math.ceil(questionCount * timeConstant)

  // Prepare questions for backend
  const questions = generatedQuiz.questions.map((q) => ({
    questionText: q.question,
    correctAnswer: q.options[q.correctAnswer], 
    options: q.options,                        
    hint: q.explanation,
  }));

  const quizData = {
    description: generatedQuiz.description,
    category: selectedCategory.name,
    categoryId: selectedCategory.id ,
    difficulty:difficulty ,
    duration,
    image:selectedCategory.icon,
    questions,
  };

  try {
    const response = await axios.post( `${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/createQuiz`, { quizData }, { withCredentials: true });
    if(response.status===201){
      setToastMessage({message:"Quiz Added Succesfully"})
    }
  } catch (error) {
    console.error('Error saving quiz:', error);

    setToastMessage({message:"Failed to save the quiz",type:'failure'})
    
  }finally{
        setIsLoading(false)
  }
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
            list="category-list"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. JavaScript, Python"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <datalist id="category-list">
            {/* Dynamically map the categories prop */}
            {categorySuggestions.map((cat) => (
              <option key={cat.id} value={cat.name} />
            ))}
          </datalist>
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
            {difficultyOptions.map((option) => (
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
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num} Questions
              </option>
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
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  difficultyOptions.find(
                    (d) => d.value === generatedQuiz.difficulty
                  )?.color
                }`}
              >
                {generatedQuiz.difficulty}
              </span>

              <button
                onClick={saveQuiz}
                disabled={isLoading}
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4 mr-1" />
                {isLoading ?"Saving...":"Save To DB"}
                
              </button>
            </div>
          </div>
          {/* Show description below the title */}
          <div className="mb-6">
            <p className="text-base text-gray-700">
              <span className="font-semibold">Description:</span>
              {generatedQuiz.description}
            </p>
          </div>

          {showGeneratedQuiz && (
            <div className="space-y-6">
              {generatedQuiz.questions.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {qIndex + 1}. {question.question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {question.options.map((option, oIndex) => (
                      <div
                        key={oIndex}
                        className={`p-3 rounded-lg border ${
                          oIndex === question.correctAnswer
                            ? "bg-green-50 border-green-200 text-green-800"
                            : "bg-white border-gray-200 text-gray-700"
                        }`}
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + oIndex)}.
                        </span>
                        {option}
                        {oIndex === question.correctAnswer && (
                          <span className="ml-2 text-green-600 font-semibold">
                            ✓
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-blue-800 mb-1">
                      Hint:
                    </p>

                    <p className="text-blue-700">{question.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

export default AIQuizGenerator;
