const QuizSet = require("../models/QuizSet");
const User = require('../models/User');
const Category=require('../models/Category')
const { generateQuizOfTheDay }= require('../utills/getQuizOfTheDay');
const {generateQuestions} = require('../utills/generateQuestion'); 
const{ formatQuizProgressData} = require("../utills/formatProgressData");
let cachedQuiz = null;
let lastQuizDate = null;

exports.getCategories=async (req,res)=>{
    try{
      
        const category=await Category.find({});
        res.status(200).json({
            categories:category
        })

    }catch(e){
        console.log("SOme error occured while fetchin the quiz categories",e)
        res.status(500).json({ message: "Failed to fetch category" });
    }
}

exports.getQuizSets = async (req, res) => {
  const { userId } = req.query;
console.log("Fetching quiz sets for userId:", userId);
  try {
    let user = null;
    let savedQuizIds = [];

    // If userId is passed, fetch user and saved quiz IDs
    if (userId && userId !== "undefined") {
      user = await User.findById(userId).select('savedQuizzes');
      if (user && user.savedQuizzes) {
        savedQuizIds = user.savedQuizzes;
      }
      console.log("User found:", userId, "Saved quizzes:", savedQuizIds);
    }

    // Fetch random quiz sets without questions
    const randomSets = await QuizSet.find({}, { questions: 0 }).populate('category');

    // Return combined response
    res.status(200).json({
      quiz: randomSets,
      quizIds: savedQuizIds,
    });
  } catch (e) {
    console.log("Some error occurred while fetching the sets", e);
    res.status(500).json({ message: "Failed to fetch quiz sets" });
  }
};

exports.startPredefinedQuiz = async (req, res) => {
  try {
   
    const quizId = req.params.id
  const quizzes = await QuizSet.findById(quizId).populate('questions').populate('category');


    if (quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found for this id" });
    }
   res.status(200).json({ questions: quizzes.questions,Id:quizId,category:quizzes.category.title,difficulty:quizzes.difficulty});
  } catch (e) {
    console.log("Error occurred while fetching quizzes:", e);
    res.status(500).json({ message: "Failed to fetch quizzes of this category" });
  }
};

exports.startQuiz = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const { difficulty, numberOfQuestions, userId,image } = req.body;
    const user = await User.findById(userId);
    // 1. Fetch all quiz sets for category
    let allQuizSets = await QuizSet.find({
      category: categoryId,
      difficulty: difficulty,
    });
    // 2. Filter out quiz sets already played by user
    const playedQuizSetIds =
      user.quizzesTaken.map((q) => q.quizId.toString()) || [];
    let availableQuizSet = allQuizSets.find(
      (set) => !playedQuizSetIds.includes(set._id.toString())
    );
    // 3. If no available set, generate new quiz set
    if (!availableQuizSet) {
      console.log(
        "No available quiz sets or already played — generating new set...",image
      );

     const { title, description,  generatedQuestions } = await generateQuestions(
        categoryId,
        difficulty,
        numberOfQuestions
      );
      let timeConstant=difficulty === 'easy' ? 0.5 : difficulty === 'medium' ? 0.8 : 1; // seconds per question
      const newQuizSet = new QuizSet({
        title: title,
        description: description,
        category: categoryId,
        image:image,
        difficulty: difficulty,
        duration: Math.ceil(numberOfQuestions * timeConstant), // e.g., 30 secs/question
        questions: generatedQuestions.map((q) => q._id),
        totalQuestions: generatedQuestions.length,
      });

      await newQuizSet.save();
      availableQuizSet = newQuizSet;
    }

    // 4. Populate questions
    const populatedQuiz = await QuizSet.findById(availableQuizSet._id).populate(
      "questions"
    );

    // 5. Filter and shuffle
    let selectedQuestions = populatedQuiz.questions
      .filter((q) => q.level === difficulty)
      .sort(() => 0.5 - Math.random())
      .slice(0, numberOfQuestions);

    // If not enough, fill with other levels
    if (selectedQuestions.length < numberOfQuestions) {
      const remaining = numberOfQuestions - selectedQuestions.length;
      const fallbackQuestions = populatedQuiz.questions
        .filter((q) => q.level !== difficulty)
        .sort(() => 0.5 - Math.random())
        .slice(0, remaining);

      selectedQuestions = [...selectedQuestions, ...fallbackQuestions];
    }
    console.log("sending quiz details to start",populatedQuiz)
    return res.status(200).json({
      quizId: populatedQuiz._id,
      questions: selectedQuestions,
      duration: populatedQuiz.duration||10, // default to 10 minutes if not set
      difficulty,
    });
  } catch (error) {
    console.error("Error starting quiz:", error);
    return res.status(500).json({ message: "Failed to start quiz" });
  }
};
exports.startGuestQuiz = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const { difficulty, numberOfQuestions } = req.body;
      let generatedQuestions = await generateQuestions(
        categoryId,
        difficulty,
        numberOfQuestions
      );
  
    console.log("Guest quiz started successfully.");

    return res.status(200).json({
      questions: generatedQuestions,
      difficulty,
    });
  } catch (error) {
    console.error("Error starting guest quiz:", error);
    return res.status(500).json({ message: "Failed to start guest quiz" });
  }
};
exports.getUserSavedQuizzes= async (req, res) => {
  try {
const user = await User.findById(req.user.id)
  .select('savedQuizzes')
  .populate({
    path: 'savedQuizzes',
    populate: {
      path: 'category',
      select: 'title'
    }
  });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    const savedQuizzes = user.savedQuizzes.map(quiz => {
      return {
        id: quiz._id,
        title: quiz.title,
        description: quiz.description,
        difficulty: quiz.difficulty,
        questions: quiz.totalQuestions,
        duration: quiz.duration,
        participants: quiz.participants || 0, 
      };
    });
    res.status(200).json({
      savedQuizzes:savedQuizzes
    });

  } catch (error) {
    console.error('Error fetching saved quizzes:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching saved quizzes' 
    });
  }
}
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
    const user = req.user;
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Sort quizzesTaken by submissionDate in descending order and take the first 4
    const attemptedQuizzes = user.quizzesTaken
      .sort((a, b) => b.submissionDate - a.submissionDate)
      .slice(0, 4);
    return res.status(200).json({ 
      success: true,
      quizzes: attemptedQuizzes 
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

exports.submitQuizResult = async (req, res) => {
  const {
    quizId,
    userScore,
    totalScore,
    correctAnswers,
    wrongAnswers,
    learnLaterQuestions,
    timeTaken,
    difficulty,
    category
  } = req.body.quizResult;
  const user = req.user;
  try {
    const existingQuiz = user.quizzesTaken.find(
    (quiz) => quiz.quizId.toString() === quizId.toString() && quiz.difficulty === difficulty
    );

    if (existingQuiz) {
      // Adjust the user's total score (remove old score, add new one)
      user.totalScore -= existingQuiz.userScore;
      user.totalScore += userScore;

      // Update the existing quiz result
      existingQuiz.userScore = userScore;
      existingQuiz.maxQuizScore = totalScore;
      existingQuiz.submissionDate = new Date();
      existingQuiz.correctAnswers = correctAnswers;
      existingQuiz.wrongAnswers = wrongAnswers;
      existingQuiz.learnLater = learnLaterQuestions || [];
      existingQuiz.timeTaken = timeTaken;
    } else {
      // New quiz submission
      const newQuizResult = {
        quizId,
        userScore,
        maxQuizScore: totalScore,
        submissionDate: new Date(),
        correctAnswers,
        wrongAnswers,
        timeTaken,
        difficulty:difficulty,
        category
      };
      user.quizzesTaken.push(newQuizResult);
      user.totalScore += userScore;
      user.learnLater = user.learnLater || [];
      user.learnLater = user.learnLater.concat(learnLaterQuestions.filter(q => !user.learnLater.includes(q.questionId)));
    }

    await user.save();
    res.status(200).json({ message: 'Quiz results submitted successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error submitting quiz results', error });
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
    const newQuiz = new QuizSet({
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
    const quiz = await QuizSet.findById(quizId);
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
   if(!question)
    res.status(500).json({ error: "Failed to generate quiz question." });
    cachedQuiz = question;
    lastQuizDate = today;
    res.status(200).json({ quiz:question });
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ error: "Failed to generate quiz question." });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const {id:userId} = req.params; 
    console.log("Fetching leaderboard for userId:",userId );
    const allUsers = await User.find({}, { _id: 1 })
      .sort({ totalScore: -1 });// sorted based on totalscore

    // Step 2: Create a map of userId to rank
    const userRankMap = new Map();  // necessary to store userId and their rank
    allUsers.forEach((user, index) => {
      userRankMap.set(user._id.toString(), index + 1);
    });

    // Step 3: Fetch top 20 users with their info
    const leaderboard = await User.find({}, {
      username: 1,
      totalScore: 1,
      quizzesTaken: 1,
      avatar: 1,
      achievements: 1
    })
      .sort({ totalScore: -1 })
      .limit(20);

    const formattedLeaderboard = leaderboard.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      totalScore: user.totalScore,
      quizzesTaken: user.quizzesTaken.length,
      avatar: user.avatar,
      achievements: user.achievements.length
    }));

    // Step 4: Get specific user's rank if userId is present
    let userRank = null;
    if (userId && userRankMap.has(userId)) {
      const targetUser = await User.findById(userId, {
        username: 1,
        totalScore: 1,
        quizzesTaken: 1,
        avatar: 1,
        achievements: 1
      });

      userRank = {
        rank: userRankMap.get(userId),
        username: targetUser.username,
        totalScore: targetUser.totalScore,
        quizzesTaken: targetUser.quizzesTaken.length,
        avatar: targetUser.avatar,
        achievements: targetUser.achievements.length
      };
    }

    res.status(200).json({
      leaderboard: formattedLeaderboard,
      userRank: userRank // will be null if no userId or user not found
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard',
      error: error.message
    });
  }
};



exports.saveUnsaveQuiz = async (req, res) => {
  try {
    const { quizIds } = req.body;
    const userId = req.user.id;
    if (!Array.isArray(quizIds)) {
      return res.status(400).json({
        success: false,
        message: "quizIds must be an array.",
      });
    }


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.savedQuizzes = quizIds;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Saved quizzes updated.",
      savedQuizzes: user.savedQuizzes,
    });
  } catch (error) {
    console.error("Error updating saved quizzes:", error);
    res.status(500).json({
      success: false,
      message: "Server error while saving quizzes.",
    });
  }
};

exports.getUserLearnLaterQuestions = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
await req.user.populate('learnLater.questionId');
const questions = req.user.learnLater.map(item => ({
  category: item.category,
  question: item.questionId
}));

    res.status(200).json({questions: questions});
  }catch(err){
    console.log("Error in learnlater Route:",err)
    res.status(500).json({message:"Some problem ocuered in server"})
  }
}
exports.removeLearnLaterQuestion = async (req, res) => {
  try {
    const { id: questionId } = req.params;
    const user = req.user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
console.log("Removing question with ID:", user.learnLater);
    user.learnLater = user.learnLater.filter((item) => item.questionId.toString() !== questionId);
console.log("Updated learn later list:", user.learnLater);
    await user.save();
   
    res.status(200).json({ message: "Question removed from learn later" });
  } catch (error) {
    console.error("Error removing learn later question:", error);
    res.status(500).json({ message: "Failed to remove learn later question" });
  }
};
exports.getUserProgress = async (req, res) => {
  try {
    const user = req.user; 
 const totalCategories=await Category.countDocuments()
    if (!user || !user.quizzesTaken) {
      return res.status(404).json({ message: 'User or quiz data not found.' });
    }

    const progressData = formatQuizProgressData(user.quizzesTaken);
          console.log("Dashboard data:", progressData);
  res.status(200).json({progressData:progressData,totalCategories:totalCategories})
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};