import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate=useNavigate();
  return (
    <section className="pb-20">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-myColour/90 to-purple-600 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of quiz enthusiasts and start challenging yourself today.
              Explore diverse categories, compete with friends, and learn while having fun!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={()=>navigate('/startQuiz')} className="bg-white font-medium hover:text-myColour/80 text-myColour size-lg rounded-md flex py-2.5 md:px-6 px-3">
                  Start Quiz Now <ArrowRight className="ml-2 h-7 w-5" />
                </button>
             <button onClick={()=>navigate('/exploreQuizzes')} className="bg-white hover:bg-quizDashboard-accent/95 hover:text-white text-myColour border border-myColour rounded-md flex py-2.5 md:px-6 px-3">
                  Explore Categories
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
