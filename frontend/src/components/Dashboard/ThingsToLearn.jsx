import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";
import { 
  BookOpen, 
  Brain, 
  MessageCircle, 
  X, 
  Send, 
  Trash2, 
  Loader2,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

const ThingsToLearn = ({ className }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [explanations, setExplanations] = useState({});
  const [followUpMessages, setFollowUpMessages] = useState({});
  const [followUpInput, setFollowUpInput] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  // Mock data - replace with actual API call
  const mockQuestions = [
    {
      id: 1,
      question: "What is the greenhouse effect and how does it contribute to global warming?",
      category: "Science",
      difficulty: "Medium",
      dateAdded: "2025-05-28",
      quizTitle: "Environmental Science Quiz"
    },
    {
      id: 2,
      question: "Explain the difference between mitosis and meiosis.",
      category: "Biology",
      difficulty: "Hard",
      dateAdded: "2025-05-27",
      quizTitle: "Cell Biology Fundamentals"
    },
    {
      id: 3,
      question: "What were the main causes of World War I?",
      category: "History",
      difficulty: "Medium",
      dateAdded: "2025-05-26",
      quizTitle: "20th Century History"
    },
    {
      id: 4,
      question: "How do neural networks learn and adapt?",
      category: "Technology",
      difficulty: "Hard",
      dateAdded: "2025-05-25",
      quizTitle: "AI and Machine Learning Basics"
    }
  ];

  // Simulate fetching data from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        // const response = await fetch('/api/things-to-learn');
        // const data = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setQuestions(mockQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Generate AI explanation
  const generateExplanation = async (questionId, questionText) => {
    setLoadingStates(prev => ({ ...prev, [questionId]: true }));
    
    try {
      // Simulate AI API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI response - replace with actual AI API call
      const mockExplanation = `This is a comprehensive explanation for: "${questionText}"\n\nKey points:\n• Detailed analysis of the concept\n• Important background information\n• Real-world applications and examples\n• Common misconceptions to avoid\n\nThis explanation covers the fundamental aspects you need to understand.`;
      
      setExplanations(prev => ({
        ...prev,
        [questionId]: mockExplanation
      }));
      
      // Initialize follow-up messages array
      setFollowUpMessages(prev => ({
        ...prev,
        [questionId]: []
      }));
      
    } catch (error) {
      console.error('Error generating explanation:', error);
      setExplanations(prev => ({
        ...prev,
        [questionId]: 'Sorry, there was an error generating the explanation. Please try again.'
      }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [questionId]: false }));
    }
  };

  // Handle follow-up question
  const handleFollowUp = async (questionId) => {
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
      // Simulate AI response delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse = {
        type: 'ai',
        content: `Great follow-up question! Here's more detail about "${message}": This builds upon the previous explanation and provides additional context that should help clarify your understanding.`,
        timestamp: new Date()
      };

      setFollowUpMessages(prev => ({
        ...prev,
        [questionId]: [...prev[questionId], aiResponse]
      }));
    } catch (error) {
      console.error('Error handling follow-up:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [`followup-${questionId}`]: false }));
    }
  };

  // Remove question from list
  const removeQuestion = async (questionId) => {
    try {
      // Replace with actual API call
      // await fetch(`/api/things-to-learn/${questionId}`, { method: 'DELETE' });
      
      setQuestions(prev => prev.filter(q => q.id !== questionId));
      
      // Clean up related states
      setExplanations(prev => {
        const newState = { ...prev };
        delete newState[questionId];
        return newState;
      });
      setFollowUpMessages(prev => {
        const newState = { ...prev };
        delete newState[questionId];
        return newState;
      });
      setFollowUpInput(prev => {
        const newState = { ...prev };
        delete newState[questionId];
        return newState;
      });
    } catch (error) {
      console.error('Error removing question:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Science': 'bg-blue-100 text-blue-800',
      'Biology': 'bg-green-100 text-green-800',
      'History': 'bg-amber-100 text-amber-800',
      'Technology': 'bg-purple-100 text-purple-800',
      'Mathematics': 'bg-red-100 text-red-800',
      'Literature': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
            <BookOpen className="h-6 w-6 mr-2 text-purple-600" />
            Things to Learn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <span className="ml-2 text-gray-600">Loading your learning list...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3 border-b">
        <CardTitle className="flex items-center justify-between text-2xl font-bold text-gray-800">
          <div className="flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-purple-600" />
            Things to Learn
          </div>
          <span className="text-sm font-normal text-gray-500 bg-purple-100 px-3 py-1 rounded-full">
            {questions.length} questions
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        {questions.length === 0 ? (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No questions to learn yet!</p>
            <p className="text-sm text-gray-500 mt-2">
              Mark questions during quizzes to add them here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((item, index) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {item.question}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                        {item.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      From: {item.quizTitle} • Added: {new Date(item.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeQuestion(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Remove from list"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => generateExplanation(item.id, item.question)}
                    disabled={loadingStates[item.id]}
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loadingStates[item.id] ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} className="mr-2" />
                        Explain
                      </>
                    )}
                  </button>
                  
                  {explanations[item.id] && (
                    <button
                      onClick={() => setExpandedQuestion(expandedQuestion === item.id ? null : item.id)}
                      className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {expandedQuestion === item.id ? (
                        <>
                          <ChevronUp size={16} className="mr-2" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} className="mr-2" />
                          Show Details
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Expanded Content */}
                {expandedQuestion === item.id && explanations[item.id] && (
                  <div className="border-t pt-4 space-y-4">
                    {/* AI Explanation */}
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                      <div className="flex items-center mb-2">
                        <Brain className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-semibold text-blue-800">AI Explanation</span>
                      </div>
                      <div className="text-gray-700 whitespace-pre-line">
                        {explanations[item.id]}
                      </div>
                    </div>

                    {/* Follow-up Messages */}
                    {followUpMessages[item.id] && followUpMessages[item.id].length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <MessageCircle size={16} className="mr-2" />
                          Follow-up Discussion
                        </h4>
                        {followUpMessages[item.id].map((message, msgIndex) => (
                          <div
                            key={msgIndex}
                            className={`p-3 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-purple-100 ml-8 text-purple-800'
                                : 'bg-gray-100 mr-8 text-gray-800'
                            }`}
                          >
                            <div className="text-sm font-medium mb-1">
                              {message.type === 'user' ? 'You:' : 'AI:'}
                            </div>
                            <div>{message.content}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Follow-up Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ask a follow-up question..."
                        value={followUpInput[item.id] || ''}
                        onChange={(e) => setFollowUpInput(prev => ({
                          ...prev,
                          [item.id]: e.target.value
                        }))}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleFollowUp(item.id);
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => handleFollowUp(item.id)}
                        disabled={loadingStates[`followup-${item.id}`] || !followUpInput[item.id]?.trim()}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {loadingStates[`followup-${item.id}`] ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Send size={16} />
                        )}
                      </button>
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