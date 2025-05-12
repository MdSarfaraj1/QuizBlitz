import { Award, Users, Trophy,Settings } from "lucide-react";

const features = [
  {
    title: "Multiple Quiz Categories",
    description: "Explore diverse topics from science and history to pop culture and sports. Find quizzes that match your interests.",
    icon: Settings,
  },
  {
    title: "Instant Scoring",
    description: "Get immediate feedback on your answers and see your score in real-time. No waiting for results.",
    icon: Award,
  },
  {
    title: "Global Leaderboards",
    description: "Compete with quiz enthusiasts worldwide and see where you rank. Climb the leaderboard with every correct answer.",
    icon: Trophy,
  },
  {
    title: "Multiplayer Mode",
    description: "Challenge friends to quiz battles and see who has the most knowledge. Make learning a social experience.",
    icon: Users,
  },
];

const Features = () => {
  return (
    <section className=" mt-14 pt-8 bg-gray-50" id="features">
      <div className=" max-w-7xl mx-auto py-7">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Features That Make Quiz Fun</h2>
          <p className="text-gray-600">
            Discover why thousands of users choose QuizBlitz for testing their knowledge and learning new things.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="hover:shadow-xl  hover:scale-105  transition-shadow  duration-700 bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="h-12 w-12 rounded-lg bg-myColour/20 flex items-center justify-center text-myColour mb-4">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;