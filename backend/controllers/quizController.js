const Quiz = require("../models/Quiz");
const User = require('../models/User');
const QuizResult = require('../models/QuizResult'); 

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

exports.getRandomQuizSets=async (req,res)=>{ 
  try{
       const randomSets= await Quiz.find({},{questions:0})
         res.status(200).json({
            randomSets:randomSets
        })
  }catch(e){
        console.log("SOme error occured while fetchin the sets",e)
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


exports.startQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the quiz by ID and ensure it's published
    const quiz = await Quiz.findById(id)
    .populate('questions.easy')
    .populate('questions.medium')
    .populate('questions.hard');

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ quiz: quiz });

  } catch (error) {
    console.error('Error starting quiz:', error);
    res.status(500).json({ message: 'Failed to start quiz' });
  }
};

exports.getMyCreatedQuizzes = async (req, res) => {
  try {
    const userId = req.user._id; 
    
  
    const user = await User.findById(userId).populate('quizzesCreated');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ 
      success: true,
      quizzes: user.quizzesCreated 
    });
  } catch (error) {
    console.error('Error fetching created quizzes:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error fetching created quizzes', 
      error: error.message 
    });
  }
};


exports.getMyAttemptedQuizzes = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('quizzesTaken');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const quizResults = await QuizResult.find({ userId: userId })
      .populate('quizId');  // Populate the quiz details (e.g., quiz name, description)

    // Attach the results to each quiz
    const quizzesWithResults = user.quizzesTaken.map(quiz => {
      const result = quizResults.find(result => result.quizId._id.toString() === quiz._id.toString());
      return {
        quiz,
        result: result || null  // Include quiz result if available
      };
    });

    return res.status(200).json({ 
      success: true,
      quizzes: quizzesWithResults  // Return quizzes along with their results
    });
  } catch (error) {
    console.error('Error fetching attempted quizzes:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error fetching attempted quizzes', 
      error: error.message 
    });
  }
};

exports.submitQuiz= async (req, res) => {
  const {  quizId, level, score, wrongAnswers, timeTaken } = req.body;
  const userId = req.user._id;

  try {
    // Create a new quiz result document
    const newQuizResult = new QuizResult({
      userId, 
      quizId,
      quizLevel: level,
      score,
      wrongAnswers,
      timeTaken
    });

    // Save the quiz result to the database
    await newQuizResult.save();

    res.status(200).json({ message: 'Quiz results submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz results', error });
  }
};


exports.unsaveQuiz = async (req, res) => {
  try {
    const user = req.user;  
    const { quizId } = req.body;  
    if (!quizId) {
      return res.status(400).json({ success: false, message: 'Quiz ID is required' });
    }

    // Check if the quiz is in the user's saved quizzes
    if (!user.savedQuizzes.includes(quizId)) {
      return res.status(400).json({ success: false, message: 'Quiz is not in saved quizzes' });
    }

    // Remove the quiz from the saved quizzes
    user.savedQuizzes = user.savedQuizzes.filter(savedQuizId => savedQuizId.toString() !== quizId.toString());

  
    await QuizResult.deleteOne({ userId: user._id, quizId: quizId });

  
    await user.save();

    return res.status(200).json({ success: true, message: 'Quiz unsaved and result deleted successfully' });
  } catch (error) {
    console.error('Error unsaving quiz:', error);
    return res.status(500).json({
      success: false,
      message: 'Error unsaving quiz and deleting result',
      error: error.message
    });
  }
};



exports.createQuiz = async (req, res) => {
  try {
    const { category, description, questions, } = req.body;

    if (!questions) {
      return res.status(400).json({ error: 'Questions are required.' });
    }

    // Initialize an object to hold question IDs by level
    const questionIds = {
      easy: [],
      medium: [],
      hard: [],
    };

    // Save each question and push its ID to the correct level
    for (const q of questions) {
      const newQuestion = new Question({
        ...q,
        level: q.level, // assuming level is in each question object
        createdBy: req.user._id,
      });
      const savedQuestion = await newQuestion.save();
      questionIds[q.level].push(savedQuestion._id);
    }

    // Create the quiz
    const newQuiz = new Quiz({
      category,
      description,
      createdBy: req.user._id,
      questions: questionIds,
    });

    const savedQuiz = await newQuiz.save();

    res.status(201).json({
      message: 'Quiz created successfully',
      quiz: savedQuiz
    });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const { description, questions } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Check if the quiz belongs to the logged-in user
    if (quiz.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized: You do not own this quiz' });
    }

    // Update fields
    if (description) quiz.description = description;
    if (questions) {
      const questionIds = {
        easy: [],
        medium: [],
        hard: [],
      };

      for (const q of questions) {
        const newQuestion = new Question({
          ...q,
          level: q.level,
          createdBy: req.user._id,
        });
        const savedQuestion = await newQuestion.save();
        questionIds[q.level].push(savedQuestion._id);
      }

      quiz.questions = questionIds;
    }

    const updatedQuiz = await quiz.save();

    res.status(200).json({
      message: 'Quiz updated successfully',
      quiz: updatedQuiz
    });
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

