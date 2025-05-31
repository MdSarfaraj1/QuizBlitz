require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../configure/database");
const{ initialQuizCategory}=require("./QuizCategory")
const initialQuestions = require("./questions");
const achievementsData = require("./achievements");
// import your models
const QuizSets = require("../models/QuizSets");
const Question = require("../models/Question");
const User = require("../models/User");
const Category = require("../models/Category");
const Achievement = require("../models/Achievement");

async function seedDatabase() {
  await connectDB();

  try {
    //  Clear old data first
    await QuizSets.deleteMany({});
    await Question.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});
    await Achievement.deleteMany({});

    //insert new data
    const newAdmin = await User.create({
      username: 'Admin_BeTheHE',
      email: process.env.admin_email,
      password: process.env.admin_password,
      role: 'admin',
    });
    //add admin id to quiz 
    const categories=await Category.insertMany(initialQuizCategory)
    console.log("Categories seeded:", categories);
     const questions = await Question.insertMany(initialQuestions);
   const quizsets = categories.slice(0, 5).map((category, index) => ({
  category: category._id,
  description: `Quiz Set ${index + 1}`, // You can customize description
  createdBy: newAdmin._id,
}));

// Step 3: Insert quiz sets
const insertedQuizzes = await QuizSets.insertMany(quizsets);
   

    //  assign questions to each quiz's levels
    for (let i = 0; i <5; i++) {
      const quizData = insertedQuizzes[i];
      const quizQuestions = questions.filter((question, index) => {
        const quizIndex = Math.floor(index / 30); // Every 30 questions belong to a different quiz
        return quizIndex === i; 
      });
  
      // Separate 10 questions for each level (easy, medium, hard)
      const easyQuestions = quizQuestions.filter(q => q.level === 'easy').slice(0, 10);
      const mediumQuestions = quizQuestions.filter(q => q.level === 'medium').slice(0, 10);
      const hardQuestions = quizQuestions.filter(q => q.level === 'hard').slice(0, 10);
  
      // Update the quiz with questions for each level
      await QuizSets.updateOne(
        { _id: quizData._id },
        {
          $push: {
            'questions.easy': { $each: easyQuestions.map(q => q._id) },
            'questions.medium': { $each: mediumQuestions.map(q => q._id) },
            'questions.hard': { $each: hardQuestions.map(q => q._id) },
          },
        }
      );
    }
    await Achievement.insertMany(achievementsData);
    console.log(" Seeded database successfully");
  } catch (err) {
    console.error(" Error seeding:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
