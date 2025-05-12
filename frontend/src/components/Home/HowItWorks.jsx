import { Check } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose a Category",
    description: "Select from multiple quiz categories that interest you, from science to pop culture.",
  },
  {
    number: "02",
    title: "Answer Questions",
    description: "Face challenging questions with multiple choice options and test your knowledge.",
  },
  {
    number: "03",
    title: "Get Instant Results",
    description: "See your score immediately and review correct answers to learn more.",
  },
  {
    number: "04",
    title: "Compete & Share",
    description: "Challenge friends, compare scores on leaderboards, and share your achievements.",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding" id="how-it-works">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How QuizBlitz Works</h2>
          <p className="text-gray-600">
            Getting started is easy! Follow these simple steps to begin your quiz journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative p-6"
            >
              <div className="mb-4">
                <span className="text-5xl font-bold text-myColour/20">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 right-0 w-1/2 h-0.5 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-myColour/10 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6">Why Users Love QuizBlitz</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-myColour/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={16} className="text-myColour" />
              </div>
              <p className="ml-3 text-gray-700">User-friendly interface designed for all ages</p>
            </div>
            <div className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-myColour/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={16} className="text-myColour" />
              </div>
              <p className="ml-3 text-gray-700">Regular updates with new quiz content</p>
            </div>
            <div className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-myColour/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={16} className="text-myColour" />
              </div>
              <p className="ml-3 text-gray-700">Works across all devices seamlessly</p>
            </div>
            <div className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-myColour/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={16} className="text-myColour" />
              </div>
              <p className="ml-3 text-gray-700">Community-driven question submissions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;