const QuizSets = require("../models/QuizSets");
const RandomQuizSet=require("../models/RandomQuzeSet")
const Question = require("../models/Questions");
const User = require('../models/User');
const QuizResult = require('../models/QuizResult'); 
const Category=require('../models/Category')
const { generateQuizOfTheDay }= require('../utills/getQuizOfTheDay');
const RandomQuzeSet = require("../models/RandomQuzeSet");
let cachedQuiz = null;
let lastQuizDate = null;

exports.getCategories=async (req,res)=>{
    try{
      
        const category=await Category.find({});
        console.log("Fetching quiz categories",category);
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
       const randomSets= await RandomQuizSet.find({},{questions:0})
         res.status(200).json({
            quiz:randomSets
        })
  }catch(e){
        console.log("SOme error occured while fetchin the sets",e)
        res.status(500).json({ message: "Failed to fetch category" });
    }
   
}

exports.startRandomQuizSet = async (req, res) => {
  try {
   
    const { id } = req.params
    const quizzes = await RandomQuzeSet.findById(id).populate('questions')
    if (quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found for this id" });
    }

   res.status(200).json({ questions: quizzes.questions,id:id});
  } catch (e) {
    console.log("Error occurred while fetching quizzes:", e);
    res.status(500).json({ message: "Failed to fetch quizzes of this category" });
  }
};


exports.startQuiz = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const { difficulty, numberOfQuestions } = req.body;
console.log("starting quiz")
    const validDifficulties = ['easy', 'medium', 'hard'];
    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({ message: 'Invalid difficulty level' });
    }
    // Fetch quiz set by category and populate all difficulty levels
    const quizSet = await QuizSets.findOne({ category: categoryId })
      .populate('questions.easy')
      .populate('questions.medium')
      .populate('questions.hard');
    if (!quizSet) {
      return res.status(404).json({ message: 'Quiz not found for this category' }); 
    }

    // Decide which questions to use
    let combinedQuestions = [];

    if (numberOfQuestions <= 10) {
      combinedQuestions = quizSet.questions[difficulty] || [];
    } else {
      if (difficulty === 'easy') {
        combinedQuestions = [
          ...quizSet.questions.easy,
          ...quizSet.questions.medium
        ];
      } else {
        combinedQuestions = [
          ...quizSet.questions.medium,
          ...quizSet.questions.hard
        ];
      }
    }

    // Shuffle and limit to requested number
    combinedQuestions = combinedQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, numberOfQuestions);
console.log("Starting quiz with questions:", combinedQuestions);
    res.status(200).json({ questions: combinedQuestions,quizId: quizSet._id, difficulty });

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

exports.submitQuizResult= async (req, res) => {
  console.log("Submitting quiz result:", req.body.quizResult);
  const { quizId,
      scoreObtained,
      totalScore,
      correctAnswers,
      wrongAnswers,
      learnLaterQuestions,
      timeTaken } = req.body.quizResult;
  const userId = req.user._id;

  try {
    // Create a new quiz result document
    const newQuizResult = new QuizResult({
      userId, 
      quizId,
      scoreObtained,
      totalScore,
      correctAnswers,
      wrongAnswers,
      learnLaterQuestions,
      submissionDate: new Date(),
      timeTaken,
    });
    // Check if the user has already submitted a result for this quiz
   let quizResult = await QuizResult.findOne({ userId, quizId });

    if (quizResult) {
      // Update existing result
      quizResult.scoreObtained = scoreObtained;
      quizResult.totalScore = totalScore;
      quizResult.correctAnswers = correctAnswers;
      quizResult.wrongAnswers = wrongAnswers;
      quizResult.learnLaterQuestions = learnLaterQuestions;
      quizResult.timeTaken = timeTaken;
      quizResult.submissionDate = new Date();
    } else {
      // Create new quiz result
      quizResult = new QuizResult({
        userId,
        quizId,
        scoreObtained,
        totalScore,
        correctAnswers,
        wrongAnswers,
        learnLaterQuestions,
        submissionDate: new Date(),
        timeTaken,
      });
    }
        // Save the quiz result (either new or updated)
    let outcome=await quizResult.save();
    console.log("Quiz result saved:", outcome);
    // Update the user's quizzes taken
    const user = await User.findById(userId);
    if (!user.quizzesTaken.includes(quizId)) {
      user.quizzesTaken.push(quizId);
    }
    // Update the user's score
    user.totalScore += scoreObtained;
    await user.save();

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
    const newQuiz = new QuizSets({
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
    const quiz = await QuizSets.findById(quizId);
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


exports.quizOfTheDay= async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    if (cachedQuiz && lastQuizDate === today) {
      return res.json({ quiz: cachedQuiz });
    }

    const question = await generateQuizOfTheDay();

    cachedQuiz = question;
    lastQuizDate = today;
    res.status(200).json({ quiz:question });
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ error: "Failed to generate quiz question." });
  }
};
