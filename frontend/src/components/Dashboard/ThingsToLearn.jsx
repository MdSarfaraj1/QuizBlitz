import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { 
  BookOpen, 
  Brain, 
  MessageCircle, 
  Send, 
  Trash2, 
  Loader2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  List,
  Clock,
  Target
} from 'lucide-react';
import axios from 'axios';
import { sendGeminiRequest } from '../../Utills/getResponseFromAI';

const ThingsToLearn = ({ className }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [explanations, setExplanations] = useState({});
  const [followUpMessages, setFollowUpMessages] = useState({});
  const [followUpInput, setFollowUpInput] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/allLearnLaterQuestions`,{withCredentials: true}); 
        console.log("response is:", response.data);
        if(response.status === 200 && response.data.questions.length > 0)
        {
            setQuestions(response.data.questions)
            setLoading(false);
        }
        console.log("working")
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);


const generateExplanation = async (questionText, correctAnswer, questionId) => {
  setLoadingStates(prev => ({ ...prev, [questionId]: true }));

  try {
    const explanation = await sendGeminiRequest(
      "You are a helpful AI that explains quiz questions for students.",
      `Explain why the answer "${correctAnswer}" is correct for this question:\n\n${questionText}`
    );

    setExplanations(prev => ({ ...prev, [questionId]: explanation }));
    setFollowUpMessages(prev => ({ ...prev, [questionId]: [] }));
  } catch (e) {
    console.error(e);
    setExplanations(prev => ({ ...prev, [questionId]: "Something went wrong." }));
  } finally {
    setLoadingStates(prev => ({ ...prev, [questionId]: false }));
  }
};

const handleFollowUp = async ( questionText, correctAnswer,questionId) => {
  const message = followUpInput[questionId]?.trim();
  if (!message) return;

  const userMessage = { type: 'user', content: message, timestamp: new Date() };
  setFollowUpMessages(prev => ({
    ...prev,
    [questionId]: [...(prev[questionId] || []), userMessage]
  }));
  setFollowUpInput(prev => ({ ...prev, [questionId]: '' }));
  setLoadingStates(prev => ({ ...prev, [`followup-${questionId}`]: true }));

  try {
    // Optional: Include past messages as a threaded summary
    const pastMessages = followUpMessages[questionId]
      ?.map(msg => `${msg.type === 'user' ? 'Student' : 'AI'}: ${msg.content}`)
      .join('\n') || '';

    const prompt = `You are a helpful AI tutor.Here is the original multiple-choice quiz question:"${questionText}"The correct answer is: "${correctAnswer}"${pastMessages ? `Previous conversation:\n${pastMessages}` : ''}The student now asked: "${message}"Please respond clearly and helpfully. If the student's question is not related to the original quiz question or its explanation, politely decline to answer and say something like: 
    "I'm here to help with this specific quiz question. Let's stay focused on that."`.trim();

  const aiReply = await sendGeminiRequest(
      "You're a helpful AI tutor that answers student queries clearly.",
      prompt
    );

    setFollowUpMessages(prev => ({
      ...prev,
      [questionId]: [...prev[questionId], { type: 'ai', content: aiReply, timestamp: new Date() }]
    }));
  } catch (error) {
    console.error("Gemini follow-up error:", error);
  } finally {
    setLoadingStates(prev => ({ ...prev, [`followup-${questionId}`]: false }));
  }
};


  // Remove question from list
  const removeQuestion = async (learnLaterId) => {
    try {
       console.log("Removing question with ID:", learnLaterId);
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/removeLearnLater/${learnLaterId}`, {}, { withCredentials: true });
      if (response.status === 200) {
      setQuestions(prev => prev.filter(q => q._id !== learnLaterId));
      // Clean up related states
      // setExplanations(prev => {
      //   const newState = { ...prev };
      //   delete newState[questionId];
      //   return newState;
      // });
      // setFollowUpMessages(prev => {
      //   const newState = { ...prev };
      //   delete newState[questionId];
      //   return newState;
      // });
      // setFollowUpInput(prev => {
      //   const newState = { ...prev };
      //   delete newState[questionId];
      //   return newState;
      // });
    } 
  }catch (error) {
      console.error('Error removing question:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  function getCategoryColor() {
      const colors = [
    'bg-blue-100 text-blue-700 border-blue-200',
    'bg-green-100 text-green-700 border-green-200',
    'bg-amber-100 text-amber-700 border-amber-200',
      'bg-purple-100 text-purple-700 border-purple-200',
       'bg-red-100 text-red-700 border-red-200',
      'bg-pink-100 text-pink-700 border-pink-200'
      ];
  return colors[Math.floor(Math.random() * colors.length)];
}
  const getDifficultyIcon = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return <Target className="h-3 w-3" />;
      case 'medium': return <Clock className="h-3 w-3" />;
      case 'hard': return <Brain className="h-3 w-3" />;
      default: return <Target className="h-3 w-3" />;
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
            <BookOpen className="h-6 w-6 mr-3 text-purple-600" />
            Things to Learn
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-purple-600 mb-4" />
            <span className="text-gray-600 font-medium">Loading your learning queue...</span>
            <span className="text-sm text-gray-500 mt-2">Preparing personalized content</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-100">
        <CardTitle className="flex items-center justify-between text-2xl font-bold text-gray-800">
          <div className="flex items-center">
            <BookOpen className="h-6 w-6 mr-3 text-purple-600" />
            Things to Learn
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-normal text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
              {questions.length} questions
            </span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {questions.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Brain className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No questions to learn yet!
            </h3>
            <p className="text-gray-600 mb-2">
              Mark questions during quizzes to add them here.
            </p>
            <p className="text-sm text-gray-500">
              Build your personalized learning queue by saving challenging
              questions.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((item, index) => (
              <div
                key={item.question._id}
                className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:border-purple-200"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 150}ms both`,
                }}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-3 leading-relaxed">
                      {item.question.questionText}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                          item.category
                        )}`}
                      >
                        {item.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getDifficultyColor(
                          item.question.level
                        )}`}
                      >
                        {getDifficultyIcon(item.question.level)}
                        {item.question.level}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeQuestion(item._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    title="Remove from learning queue"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Multiple Choice Options Preview */}
                <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <List className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Answer Options:
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {item.question.options &&
                      item.question.options.map((option, idx) => (
                        <div
                          key={idx}
                          className={`text-sm text-gray-600 px-3 py-2 rounded border ${
                            item.question.correctAnswer && option === item.question.correctAnswer
                              ? "bg-green-200 border-green-300 text-green-800"
                              : "bg-white"
                          }`}
                        >
                          <span className="font-medium text-gray-800">
                            {String.fromCharCode(65 + idx)}.
                          </span>{" "}
                          {option}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() =>
                      generateExplanation( item.question.questionText, item.question.correctAnswer,item.question._id)
                    }
                    disabled={loadingStates[item.question._id]}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm"
                  >
                    {loadingStates[item.question._id] ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} className="mr-2" />
                        Get Explanation
                      </>
                    )}
                  </button>

                  {explanations[item.question._id] && (
                    <button
                      onClick={() =>
                        setExpandedQuestion(
                          expandedQuestion === item.question._id ? null : item.question._id
                        )
                      }
                      className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      {expandedQuestion === item.question._id ? (
                        <>
                          <ChevronUp size={18} className="mr-2" />
                          Hide Explanation
                        </>
                      ) : (
                        <>
                          <ChevronDown size={18} className="mr-2" />
                          Show Explanation
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Expanded Content */}
                {expandedQuestion === item.question._id && explanations[item.question._id] && (
                  <div className="border-t border-gray-100 pt-6 space-y-6">
                    {/* AI Explanation */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                      <div className="flex items-center mb-4">
                        <Brain className="h-6 w-6 text-blue-600 mr-3" />
                        <span className="font-bold text-blue-800 text-lg">
                          AI Learning Assistant
                        </span>
                      </div>
                      <div className="text-gray-800 whitespace-pre-line leading-relaxed">
                        {explanations[item.question._id]}
                      </div>
                    </div>

                    {/* Follow-up Messages */}
                    {followUpMessages[item.question._id] &&
                      followUpMessages[item.question._id].length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-bold text-gray-800 flex items-center text-lg">
                            <MessageCircle
                              size={20}
                              className="mr-3 text-purple-600"
                            />
                            Discussion Thread
                          </h4>
                          <div className="space-y-3">
                            {followUpMessages[item.question._id].map(
                              (message, msgIndex) => (
                                <div
                                  key={msgIndex}
                                  className={`p-4 rounded-xl ${
                                    message.type === "user"
                                      ? "bg-purple-100 ml-8 border-l-4 border-purple-500"
                                      : "bg-gray-100 mr-8 border-l-4 border-blue-500"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold">
                                      {message.type === "user"
                                        ? "👤 You:"
                                        : "🤖 AI Assistant:"}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {message.timestamp.toLocaleTimeString()}
                                    </span>
                                  </div>
                                  <div className="text-gray-800">
                                    {message.content}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Follow-up Input */}
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Ask a follow-up question or request clarification..."
                          value={followUpInput[item.question._id] || ""}
                          onChange={(e) =>
                            setFollowUpInput((prev) => ({
                              ...prev,
                              [item.question._id]: e.target.value,
                            }))
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleFollowUp( item.question.questionText, item.question.correctAnswer,item.question._id);
                            }
                          }}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        />
                        <button
                          onClick={() => handleFollowUp( item.question.questionText, item.question.correctAnswer,item.question._id)}
                          disabled={
                            loadingStates[`followup-${item.question._id}`] ||
                            !followUpInput[item.question._id]?.trim()
                          }
                          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
                        >
                          {loadingStates[`followup-${item.question._id}`] ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Send size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ThingsToLearn;