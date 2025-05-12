
import { ArrowRight } from "lucide-react";

const Hero= () => {
  return (
    <section className=" flex items-center  mt-20 " id="hero">
      {/* Background Elements */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-blue-300 blur-3xl opacity-30 -z-10"></div>

      {/* main container */}
      <div className="container-padding  mx-auto max-w-7xl">
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Challenge Your Mind with <span className="text-myColour">QuizBlitz</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-xl">
              Test your knowledge, compete with friends, and become a quiz master. Multiple categories, instant scoring, and leaderboards make learning fun!
            </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 ">
                <button  className="bg-myColour  hover:bg-myColour/90 text-white size-lg rounded-md flex py-2.5 md:px-6 px-3">
                  Start Quiz Now <ArrowRight className="ml-2 h-7 w-5" />
                </button>
                <button className="bg-white hover:bg-myColour/70 hover:text-white text-myColour border border-myColour rounded-md flex py-2.5 md:px-6 px-3">
                  Explore Categories
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
              <div className="relative ">
                <div className="relative z-10 ">
                  <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                    <div className="p-2 bg-myColour/10 rounded-xl mb-3">
                      <h3 className="text-center font-medium text-myColour">Quiz of The Day</h3>
                    </div>
                  <div className="space-y-4">
                    <div className="p-3 border border-gray-200 rounded-lg hover:border-myColour/50 hover:bg-quiz-light/30 cursor-pointer ">
                      <p className="font-medium">Which planet has the most moons?</p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div className="border border-gray-200 rounded p-2 hover:bg-quiz-primary hover:text-white hover:bg-myColour ">Jupiter</div>
                        <div className="border border-gray-200 rounded p-2 hover:bg-quiz-primary hover:text-white  hover:bg-myColour ">Saturn</div>
                        <div className="border border-gray-200 rounded p-2 hover:bg-quiz-primary hover:text-white  hover:bg-myColour ">Uranus</div>
                        <div className="border border-gray-200 rounded p-2 hover:bg-quiz-primary hover:text-white  hover:bg-myColour">Neptune</div>
                      </div>
                    </div>
                    <button className="w-full bg-myColour/90 text-white hover:bg-myColour/70 rounded-lg h-10">Submit Answer</button>
                  </div>
                  </div>
                </div>
                <div className="absolute top-5 -right-5 w-32 h-32 bg-green-300 rounded-full blur-2xl opacity-70 -z-10"></div>
                <div className="absolute bottom-5 -left-5 w-32 h-32 bg-blue-700 rounded-full blur-2xl opacity-70 -z-10"></div>
              </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;