const Quiz = require("../models/Quiz");
exports.getCategories=async (req,res)=>{
    try{
        const category=await Quiz.distinct('category');
        res.status(200).json({
            categories:category
        })

    }catch(e){
        console.log("SOme error occured while fetchin the quiz categories",e)
        res.status(500).json({ message: "Failed to fetch category" });
    }
}


exports.getAllQuizzesOfACategory = async (req, res) => {
  try {
   
    const { category } = req.body.category;
    const quizzes = await Quiz.find({ category: category });

    if (quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found for this category" });
    }

    res.status(200).json({
      message: `Quizzes in the ${category} category`,
      quizzes: quizzes,
    });
  } catch (e) {
    console.log("Error occurred while fetching quizzes:", e);
    res.status(500).json({ message: "Failed to fetch quizzes of this category" });
  }
};

const Quiz = require('../models/Quiz');

exports.startQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the quiz by ID and ensure it's published
    const quiz = await Quiz.findById(id).populate('questions');

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (!quiz.published) {
      return res.status(403).json({ message: 'Quiz is not published yet' });
    }

    res.status(200).json({ quiz: quiz });

  } catch (error) {
    console.error('Error starting quiz:', error);
    res.status(500).json({ message: 'Failed to start quiz' });
  }
};
