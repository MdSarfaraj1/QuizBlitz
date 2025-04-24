require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../configure/database");
const{ initialQuizCategory}=require("./QuizCategory")
const initialQuestions = require("./questions");
console.log(process.env.admin_email)
// import your models
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const User = require("../models/User");

async function seedDatabase() {
  await connectDB();

  try {
    //  Clear old data first
    await Quiz.deleteMany({});
    await Question.deleteMany({});
    await User.deleteMany({});

    //insert new data
    const newAdmin = await User.create({
      username: 'Admin_BeTheHE',
      email: process.env.admin_email,
      password: process.env.admin_password,
      role: 'admin',
    });
    //add admin id to quiz 
    const quizzes = initialQuizCategory.map(quiz => ({...quiz,createdBy: newAdmin._id}));
    const insertedQuizzes = await Quiz.insertMany(quizzes);
    const questions = await Question.insertMany(initialQuestions);

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
      await Quiz.updateOne(
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
   
    console.log(" Seeded database successfully");
  } catch (err) {
    console.error(" Error seeding:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
