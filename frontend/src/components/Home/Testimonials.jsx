import { useState } from "react";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";


const testimonials = [
  {
    content: "QuizBlitz helped me prepare for my exams while making learning fun. The variety of topics and competitive aspect kept me engaged for hours!",
    author: "Md Sarfaraj",
    role: "College Student",
    avatar: "MS",
    bgColor: "bg-blue-400",
  },
  {
    content: "I use QuizBlitz with my students to make review sessions more interactive. They love competing and it increases knowledge retention dramatically.",
    author: "Pritam Ghosh",
    role: "College Teacher",
    avatar: "PG",
    bgColor: "bg-green-400",
  },
  {
    content: "QuizBlitz helped me prepare for my exams while making learning fun. The variety of topics and competitive aspect kept me engaged for hours!",
    author: "Sreya Sarkar",
    role: "College Student",
    avatar: "SS",
    bgColor: "bg-yellow-400",
  },
];

const Testimonials= () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <section className="section-padding bg-gray-50" id="testimonials">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600">
            Discover how QuizBlitz is changing the way people learn and have fun.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="mb-6 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full flex items-center justify-center text-myColour">
                <MessageCircle size={32} />
              </div>
            </div>
            
            <blockquote className="text-center">
              <p className="text-xl md:text-2xl text-gray-800 mb-6 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </p>
              <footer className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${testimonials[currentIndex].bgColor} flex items-center justify-center text-white font-medium mb-3`}>
                  {testimonials[currentIndex].avatar}
                </div>
                <div>
                  <cite className="font-medium text-lg not-italic">
                    {testimonials[currentIndex].author}
                  </cite>
                  <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                </div>
              </footer>
            </blockquote>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="rounded-full h-10 w-10 flex items-center shadow-xl justify-center hover:bg-myColour"
            >
              <ArrowLeft size={18} />
            </button>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? "w-8 bg-myColour" : "w-2 bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
            <button onClick={nextTestimonial} className="rounded-full h-10 w-10 shadow-xl flex items-center justify-center hover:bg-myColour"><ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;