import axios from 'axios';
import { useState ,useEffect} from 'react';
import { useAuth } from '../../Context/UserContextProvider';
import {useNavigate} from 'react-router-dom'
export default function QuizoftheDay() {
    const { userId } = useAuth();
    const [quizData, setQuizData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isQuizDataPresent,setPresent]=useState(false)
    const navigate=useNavigate()

useEffect(() => {
    const getQuizOfTheDay = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/Quiz/quizOfTheDay`,{withCredentials: true});
          console.log("Quiz of the day response:", response.data);
           if (response.data && response.status==200) {
             setQuizData(response.data.quiz)
             setPresent(true)
            }
            else
            setPresent(false)
            
              
             
        } catch (error) {
            console.error("Error fetching quiz of the day:", error);
        }
    }
    getQuizOfTheDay();
},[]);

const handleSubmit = () => {
    if (!selectedAnswer) {
        return alert("Please select an answer before submitting.");
    }
    setSubmitted(true);
    const isCorrect = selectedAnswer === quizData.answer; // Assume `answer` is available
    if (userId) {
        axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/Acheivements/quiz-of-the-day/update-streak`, {
            userId,
            isCorrect
        }, { withCredentials: true })
        .then(response => { 
            console.log("Quiz submitted successfully:", response.data);
        })
        .catch(error => {
            console.error("Error submitting quiz:", error);
        });
    }
}


 if (!isQuizDataPresent) return (
  <div className="flex items-center justify-center h-64">
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 bg-orange-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-4 h-4 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-4 h-4 bg-orange-700  rounded-full animate-bounce"></div>
      <span className="ml-4 text-[#f11f1f] font-medium animate-pulse">Loading Quiz Of The Day.....</span>
    </div>
  </div>
);

    return (
      <div className="relative">
        <div className="relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
            <div className="p-2 flex justify-between bg-myColour/10 rounded-xl mb-3">
              <h3 className="text-center text-2xl font-semibold text-myColour">
                Quiz of The Day
              </h3>

              <p className="text-center text-sm text-gray-500 mt-1">
                {quizData.quizCategory}
              </p>
            </div>

            <div className="space-y-4 changable">
              {!submitted ? (
                <div className="p-3 border border-gray-200 rounded-lg hover:border-myColour/50 hover:bg-quiz-light/30 cursor-pointer">
                  <p className="font-semibold text-lg text-gray-800 mb-4">
                    {quizData.question}
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    {quizData.options.map((option) => (
                      <div
                        key={option}
                        className={`border rounded p-2 cursor-pointer
                                                ${
                                                  selectedAnswer === option
                                                    ? "bg-myColour/10 border-myColour shadow-md"
                                                    : "border-gray-200"
                                                }
                                                 hover:bg-quizDashboard-accent/50 hover:border-orange-700`}
                        onClick={() => setSelectedAnswer(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              ) : selectedAnswer === quizData.answer ? (
                <div className="text-center">
                  <h4 className="text-xl font-semibold text-green-600">
                    🎉 Correct! Great job!
                  </h4>
                  <p className="mt-2 text-gray-700 italic">
                    You’re reaching for the stars — know your true potential!
                  </p>
                 
                  <div className="mt-4 flex justify-center gap-4">
                     {
                    userId?<button onClick={()=>navigate('/startQuiz')} className="homepage-button">Play More</button>:<> <button onClick={()=>navigate('/login')}  className="homepage-button">Login </button>
                    <button onClick={()=>navigate('/signup')} className="homepage-button">Register </button></>
                  }
                   
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h4 className="text-xl font-semibold text-red-600">
                    ❌ Incorrect
                  </h4>
                  <p className="mt-2 text-gray-700">
                    The correct answer is <strong>{quizData.answer}</strong>.
                    <br />
                    {quizData.explanation}
                  </p>
                  <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300" onClick={()=>userId?navigate('/dashboard'): navigate('/signup')}>
                    {userId?"Go to Dashboard":"Continue Learning"}
                  </button>
                </div>
              )}

              {!submitted && (
                <button
                  className="w-full bg-myColour/90 text-white hover:bg-myColour/70 rounded-lg h-10"
                  onClick={handleSubmit}
                >
                  Submit Answer
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Blurry background circles */}
        <div className="absolute top-5 -right-5 w-32 h-32 bg-green-300 rounded-full blur-2xl opacity-70 -z-10"></div>
        <div className="absolute bottom-5 -left-5 w-32 h-32 bg-blue-700 rounded-full blur-2xl opacity-70 -z-10"></div>
      </div>
    );
}
