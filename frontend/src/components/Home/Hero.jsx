import { ArrowRight } from "lucide-react";
import QuizoftheDay from "./QuizoftheDay";
import { Link, useNavigate } from "react-router-dom";

const Hero= () => {
const navigate=useNavigate();


  return (
    <section className=" flex items-center  mt-20 " id="hero">
      {/* Background Elements */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-blue-300 blur-3xl opacity-30 -z-10"></div>

      {/* main container */}
      <div className="container-padding  mx-auto max-w-7xl">
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Challenge Your Mind with  
              <span className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-quizDashboard-primary"> Quiz
                <span className="text-quizDashboard-accent">Blitz</span>
              </span>
            </h1>
          
            <p className="text-xl text-gray-600 max-w-xl">
              Test your knowledge, compete with friends, and become a quiz master. Multiple categories, instant scoring, and leaderboards make learning fun!
            </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 ">
                <Link to={'/startQuiz'} className="homepage-button " style={{paddingRight:'40px'}}>
                  Start Quiz Now <ArrowRight className="ml-2 h-7 w-5" />
                </Link>
                <button onClick={()=>navigate('/exploreQuizzes')} className="bg-white font-semibold hover:text-white  hover:shadow-lg hover:from-purple-600 bg-gradient-to-r hover:to-pink-600  hover:scale-105 text-myColour border border-myColour rounded-md flex py-2.5 md:px-6 px-3">
                  Explore Quizzes
                </button>
              </div>

              {/* bottom section */}
                <div className="mt-12  pt-4 border-t border-gray-300 flex items-center justify-center lg:justify-start gap-6">
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="font-bold text-2xl text-myColour">10k+</span>
                    <span className="text-sm text-gray-500">Active Users</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="font-bold text-2xl text-myColour">500+</span>
                    <span className="text-sm text-gray-500">Quizzes</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start ml-3">
                    <span className="font-bold text-2xl text-myColour">4.9</span>
                    <span className="text-sm text-gray-500">Rating</span>
                  </div>
              </div>
          </div>

          {/* Quize of the day -right portion */}
              <QuizoftheDay/>
        </div>
      </div>
    </section>
  );
};

export default Hero;