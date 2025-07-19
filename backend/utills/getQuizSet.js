const User = require("../models/User");
const QuizSet = require("../models/QuizSet");
const Category = require("../models/Category");
const Question = require("../models/Questions");
const generateQuestions = require("./generateQuestion"); 

module.exports = async function getQuizSet({
  categoryId,
  difficulty,
  numberOfQuestions,
  userId,
  image,
}) {
  const user = await User.findById(userId);

  let allQuizSets = await QuizSet.find({
    category: categoryId,
    difficulty,
  });

  const playedQuizSetIds =
    user?.quizzesTaken.map((q) => q.quizId.toString()) || [];

  let availableQuizSet = allQuizSets.find(
    (set) => !playedQuizSetIds.includes(set._id.toString())
  );

  if (!availableQuizSet) {
    try {
      const { title, description, generatedQuestions } =
        await generateQuestions(categoryId, difficulty, numberOfQuestions);

      const newQuizSet = new QuizSet({
        title,
        description,
        category: categoryId,
        image,
        difficulty,
        duration: Math.ceil(
          numberOfQuestions *
            (difficulty === "easy" ? 0.5 : difficulty === "medium" ? 0.8 : 1)
        ),
        questions: generatedQuestions.map((q) => q._id),
        totalQuestions: generatedQuestions.length,
      });

      await newQuizSet.save();
      availableQuizSet = newQuizSet;
    } catch (err) {
      const category = await Category.findById(categoryId).select("title");
      const fallbackQuestions = await Question.find({
        category: category.title,
      });

      const shuffled = fallbackQuestions.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, numberOfQuestions);

      const fallbackQuizSet = new QuizSet({
        title: ` ${category.title}`,
        description: `Misc questions about ${category.title}`,
        category: categoryId,
        image,
        difficulty,
        duration: Math.ceil(numberOfQuestions * 1),
        questions: selected.map((q) => q._id),
        totalQuestions: selected.length,
      });

      await fallbackQuizSet.save();
      availableQuizSet = fallbackQuizSet;
    }
  }

  const populatedQuiz = await QuizSet.findById(availableQuizSet._id).populate(
    "questions"
  );

  let selectedQuestions = populatedQuiz.questions
    .filter((q) => q.level === difficulty)
    .sort(() => 0.5 - Math.random())
    .slice(0, numberOfQuestions);

  if (selectedQuestions.length < numberOfQuestions) {
    const remaining = numberOfQuestions - selectedQuestions.length;
    const fallbackQuestions = populatedQuiz.questions
      .filter((q) => q.level !== difficulty)
      .sort(() => 0.5 - Math.random())
      .slice(0, remaining);

    selectedQuestions = [...selectedQuestions, ...fallbackQuestions];
  }

  return {
    quizId: populatedQuiz._id,
    questions: selectedQuestions,
    duration: populatedQuiz.duration || 10,
    difficulty,
  };
};
