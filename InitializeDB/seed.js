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
    //insert the quize
    const quiz = await Quiz.create(quizzes);
    //add quize id to each 30 question 
    const questionsWithQuizIds =initialQuestions.map((question, index) => {
      const quizIndex = Math.floor(index / 30); // For every 30 questions
    
  
        return {
          ...question,
          quizId: quiz[quizIndex]._id
        };

    }) 
    
    // insert the questions 
    const questions = await Question.insertMany(questionsWithQuizIds);
   
    console.log(" Seeded database successfully");
  } catch (err) {
    console.error(" Error seeding:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
