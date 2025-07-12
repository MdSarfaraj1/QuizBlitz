
const QuizSet = require('../models/QuizSet');
const Question = require('../models/Questions');
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
  }};


exports.startQuiz = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const { difficulty, numberOfQuestions, userId, image } = req.body;

    const user = await User.findById(userId);

    // 1. Fetch all quiz sets for category & difficulty
    let allQuizSets = await QuizSet.find({
      category: categoryId,
      difficulty: difficulty,
    });

    // 2. Filter out already played quiz sets
    const playedQuizSetIds =
      user.quizzesTaken.map((q) => q.quizId.toString()) || [];

    // 3. Find available quiz set
    let availableQuizSet = allQuizSets.find(
      (set) => !playedQuizSetIds.includes(set._id.toString())
    );

    // 4. If no available set, generate a new one
    if (!availableQuizSet) {
      console.log(
        "No available quiz sets or already played — generating new set...",
        image
      );

      try {
        const {
          title,
          description,
          generatedQuestions,
        } = await generateQuestions(categoryId, difficulty, numberOfQuestions);

        if (!generatedQuestions || generatedQuestions.length === 0) {
          throw new Error("AI returned no questions");
        }

        let timeConstant =
          difficulty === "easy" ? 0.5 : difficulty === "medium" ? 0.8 : 1;

        const newQuizSet = new QuizSet({
          title,
          description,
          category: categoryId,
          image,
          difficulty,
          duration: Math.ceil(numberOfQuestions * timeConstant),
          questions: generatedQuestions.map((q) => q._id),
          totalQuestions: generatedQuestions.length,
        });

        await newQuizSet.save();
        availableQuizSet = newQuizSet;
      } catch (err) {
        console.warn("AI generation failed, using DB fallback:", err.message);

        // Fallback logic: pull from existing DB questions
        const category=await Category.findById(categoryId).select("title ");
        const fallbackQuestions = await Question.find({
          category: category.title,
        });

        if (!fallbackQuestions || fallbackQuestions.length === 0) {
          return res
            .status(500)
            .json({ message: "No questions available for fallback." });
        }

        // Shuffle and select
        const shuffled = fallbackQuestions.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, numberOfQuestions);

        const fallbackQuizSet = new QuizSet({
          title: ` ${category}`,
          description: `Some mislenious questions regarding ${category}`,
          category: categoryId,
          image,
          difficulty,
          duration: Math.ceil(numberOfQuestions * 1), // fallback: 1 sec per question
          questions: selected.map((q) => q._id),
          totalQuestions: selected.length,
        });

        await fallbackQuizSet.save();
        availableQuizSet = fallbackQuizSet;
      }
    }

    // 5. Populate questions
    const populatedQuiz = await QuizSet.findById(
      availableQuizSet._id
    ).populate("questions");

    // 6. Shuffle and filter by difficulty
    let selectedQuestions = populatedQuiz.questions
      .filter((q) => q.level === difficulty)
      .sort(() => 0.5 - Math.random())
      .slice(0, numberOfQuestions);

    // 7. If not enough, fill with other levels
    if (selectedQuestions.length < numberOfQuestions) {
      const remaining = numberOfQuestions - selectedQuestions.length;
      const fallbackQuestions = populatedQuiz.questions
        .filter((q) => q.level !== difficulty)
        .sort(() => 0.5 - Math.random())
        .slice(0, remaining);

      selectedQuestions = [...selectedQuestions, ...fallbackQuestions];
    }

    return res.status(200).json({
      quizId: populatedQuiz._id,
      questions: selectedQuestions,
      duration: populatedQuiz.duration || 10, // default to 10 mins
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

    // Step 1: Try to get quiz from database
    const quizSet = await QuizSet.findOne({
      category: categoryId,
      difficulty: difficulty,
      totalQuestions: { $gte: numberOfQuestions },
    }).populate("questions");

    if (quizSet) {
      // Randomly select `numberOfQuestions` from populated quizSet.questions
      const shuffled = quizSet.questions.sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, numberOfQuestions);

      console.log("Guest quiz started successfully from DB.");
      return res.status(200).json({
        questions: selectedQuestions,
        difficulty: quizSet.difficulty,
      });
    }

    // Step 2: Fallback to AI if DB doesn't have a matching quiz
    console.warn("No quiz found in DB, trying AI fallback...");

    try {
      const quizData = await generateQuestions(categoryId, difficulty, numberOfQuestions);

      console.log("Guest quiz started successfully with AI.");
      return res.status(200).json({
        questions: quizData.generatedQuestions,
        difficulty,
      });
    } catch (aiError) {
      console.error("AI generation failed as well:", aiError.message);
      return res.status(500).json({ message: "No quiz available. Both DB and AI failed." });
    }

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
    const quizzes = await QuizSet.find({ createdBy: userId }).populate('questions category'); 
const transformQuizData = quizzes.map((quiz) => {
  return {
    _id: quiz._id.toString(), // convert ObjectId to string
    title: quiz.title,
    description: quiz.description,
    category: {
      _id: quiz.category._id.toString(),
      name: quiz.category.title,
    },
    difficulty: quiz.difficulty,
    duration: quiz.duration,
    totalQuestions: quiz.totalQuestions,
    image: quiz.image,
    color: quiz.color,
    participants: quiz.participants,
    rating: quiz.rating,
    ratingCount: quiz.ratingCount,
    createdAt: quiz.createdAt || new Date().toISOString(), // fallback if not present
    questions: quiz.questions.map((q, index) => ({
      _id: q._id.toString(),
      question: q.questionText,
      type: "multiple-choice", 
      options: q.options,
      correctAnswer: q.options.indexOf(q.correctAnswer), // convert answer to index
    })),
  };
})

    return res.status(200).json({ 
      quizzes: transformQuizData
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
    const { quizData } = req.body;

    const {
      description,
      category,
      categoryId,
      difficulty,
      duration,
      image,
      questions
    } = quizData;

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Questions are required.' });
    }

    const savedQuestionIds = [];

    for (const q of questions) {
      const newQuestion = new Question({
        questionText: q.questionText,
        correctAnswer: q.correctAnswer,
        options: [...q.options, q.correctAnswer].sort(() => Math.random() - 0.5),
        hint: q.hint,
        level: difficulty,
        category: Array.isArray(category) ? category : [category], // ensure it's an array
      });

      const savedQuestion = await newQuestion.save();
      savedQuestionIds.push(savedQuestion._id);
    }

    const newQuiz = new QuizSet({
      title:category,
      description,
      category:categoryId,
      difficulty,
      duration,
      image,
      questions: savedQuestionIds,
      totalQuestions: savedQuestionIds.length,
      createdBy: req.user._id
    });

    const savedQuiz = await newQuiz.save();
   if (categoryId) {
      await Category.findByIdAndUpdate(
        categoryId,
        { $inc: { totalQuizzes: 1 } }, // Increment totalQuizzes by 1
        { new: true } // Return the updated document (optional, but good practice)
      );
    }
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
    const {
      description,
      questions,
      title,
      difficulty,
      duration,
      totalQuestions,
      image
    } = req.body;

    const quiz = await QuizSet.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    if (quiz.createdBy.toString() !== req.user._id.toString())
      return res.status(403).json({ error: 'Unauthorized' });

    // ✅ Basic field updates
    if (description) quiz.description = description;
    if (title) quiz.title = title;
    if (difficulty) quiz.difficulty = difficulty;
    if (duration) quiz.duration = duration;
    if (image) quiz.image = image;

    // ✅ Handle questions: create or update
    const updatedQuestionIds = [];

    for (const q of questions) {
      const questionData = {
        questionText: q.question,
        options: q.options,
        correctAnswer: q.options[q.correctAnswer], // convert index to string value
        level: difficulty,
        category: [title.toLowerCase()],
        createdBy: req.user._id,
        marks: 1,
      };

      if (q._id) {
        // Update existing question
        const updated = await Question.findByIdAndUpdate(q._id, questionData, { new: true });
        if (updated) updatedQuestionIds.push(updated._id);
      } else {
        // Create new question
        const newQuestion = new Question(questionData);
        const saved = await newQuestion.save();
        updatedQuestionIds.push(saved._id);
      }
    }

    quiz.questions = updatedQuestionIds;
    quiz.totalQuestions = updatedQuestionIds.length;

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
 const result = await Category.aggregate([
      { $sample: { size: 1 } },
      { $project: { title: 1, _id: 0 } }
    ]);
    if (cachedQuiz && lastQuizDate === today) {
      return res.json({ quiz: cachedQuiz });
    }
const topic=result[0]?.title || 'Computer Science'
    const aiQuestion = await generateQuizOfTheDay(topic);

   if(aiQuestion){
    cachedQuiz = aiQuestion;
    lastQuizDate = today;
    res.status(200).json({ quiz:aiQuestion });
   }
  // Fallback: get random question from Question collection
    const fallbackQuestion = await Question.aggregate([{ $sample: { size: 1 } }]);

    if (!fallbackQuestion.length) {
      return res.status(500).json({ error: "Currently No question  available." });
    }
 
    // Format to match AI output structure
    const formatted = {
      quizCategory: fallbackQuestion[0].category?.[0] || "General",
      question: fallbackQuestion[0].questionText,
      options: fallbackQuestion[0].options, 
      answer: fallbackQuestion[0].correctAnswer,
      explanation: fallbackQuestion[0].hint || "No explanation available."
    };

    cachedQuiz = formatted;
    lastQuizDate = today;
    return res.status(200).json({ quiz: formatted });
    
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
  question: item.questionId,
  _id: item._id,
}));

    res.status(200).json({questions: questions});
  }catch(err){
    console.log("Error in learnlater Route:",err)
    res.status(500).json({message:"Some problem ocuered in server"})
  }
}
exports.removeLearnLaterQuestion = async (req, res) => {
  try {
    const { id: learnLaterId } = req.params;
    const user = req.user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
console.log("Removing question with ID:", learnLaterId); 
  user.learnLater = user.learnLater.filter((item) => item._id.toString() !== learnLaterId.toString());

console.log("After filtering:", user.learnLater.map(i => i._id.toString()));
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
 
exports.getUserFavoriteCategories = async (req, res) => {
  try {
    // Populate user's favoriteCategories
    const user = await req.user.populate({
      path: 'favoriteCategories',
      select: 'title  totalQuizzes icon',
    });

    const favoriteCategories = user.favoriteCategories || [];

    
    const categoriesWithStats = favoriteCategories.map((cat) => {
      const playedQuizzes = user.quizzesTaken?.filter(
        (quiz) => quiz.category === cat.title
      ).length || 0;

      return {
        _id: cat._id,
        title: cat.title,
        totalQuizzes: cat.totalQuizzes,
        playedQuizzes,
        icon:cat.icon
      };
    });
    res.status(200).json({
      success: true,
      categories: categoriesWithStats,
    });
  } catch (err) {
    console.error('Error in getUserFavoriteCategories:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch favorite categories',
    });
  }
};
exports.updateUserFavoriteCategories = async (req, res) => {
  try {
    const { favoriteCategoryIds } = req.body;
    const user = req.user;

    if (!Array.isArray(favoriteCategoryIds)) {
      return res.status(400).json({
        success: false,
        message: "favoriteCategories must be an array.",
      });
    }

    user.favoriteCategories = favoriteCategoryIds;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Favorite categories updated successfully.",
      favoriteCategoryIds: user.favoriteCategories,
    });
  } catch (error) {
    console.error("Error updating favorite categories:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating favorite categories.",
    });
  }
}
exports.submitQuizRating = async (req, res) => {
  try {
    const { quizId, rating } = req.body;
    if (!quizId || !rating) {
      return res.status(400).json({ message: "Quiz ID and rating are required." });
    }

    const quizSet = await QuizSet.findById(quizId);
    if (!quizSet) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    // Compute new average rating
    const totalRating = quizSet.rating * quizSet.ratingCount;
    const newRatingCount = quizSet.ratingCount + 1;
    const newAverage = (totalRating + rating) / newRatingCount;

    quizSet.rating = newAverage;
    quizSet.ratingCount = newRatingCount;

    await quizSet.save();

    res.status(200).json({
      message: "Rating submitted successfully.",
      averageRating: quizSet.rating,
      totalRatings: quizSet.ratingCount
    });
  } catch (error) {
    console.error("Error submitting quiz rating:", error);
    res.status(500).json({ message: "Failed to submit rating." });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;

    const deletedQuiz = await QuizSet.findOneAndDelete({
      _id: quizId,
      createdBy: req.user._id
    });

    if (!deletedQuiz) {
      return res.status(403).json({ error: "Unauthorized or Quiz not found" });
    }

    res.status(200).json({ message: "Quiz deleted successfully", quiz: deletedQuiz });
  } catch (err) {
    console.error("Delete quiz error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
