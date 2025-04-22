require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../configure/database");
const initialQuizCategory=require("./QuizCategory")
const initialQuestions = require("./questions");

// import your models
const Quiz = require("./models/Quiz");
const Question = require("./models/Question");
const User = require("./models/User");

async function seedDatabase() {
  await connectDB();

  try {
    //  Clear old data first
    await Quiz.deleteMany({});
    await Question.deleteMany({});
    await User.deleteMany({});

    //insert new data
    const quiz = await Quiz.create(initialQuizCategory);
    const questions = await Question.insertMany(initialQuestions);
     const newAdmin = await User.create({
    username: 'BeTheHE',
    email: 'mahammadsarfaraj6@gmail.com',
    password: 'hashedPassword',
    role: 'admin',
  });
    console.log(" Seeded database successfully");
  } catch (err) {
    console.error(" Error seeding:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
