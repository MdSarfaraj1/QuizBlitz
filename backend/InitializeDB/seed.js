require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../configure/database");
const bcrypt = require('bcryptjs');
// Import seed data
const { initialQuizCategory } = require("./QuizCategory");
const initialQuestions = require("./questions");
const achievementsData = require("./achievements");
const {initialRandomQuizSet} = require("./RandomSets");

// Import Mongoose models
const QuizSets = require("../models/QuizSets");
const Question = require("../models/Questions");
const User = require("../models/User");
const Category = require("../models/Category");
const Achievement = require("../models/Achievement");
const RandomQuizSet = require("../models/RandomQuzeSet");

async function seedDatabase() {
  await connectDB();

  try {
    // Step 1: Clear existing collections
    await QuizSets.deleteMany({});
    await Question.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});
    await Achievement.deleteMany({});
    await RandomQuizSet.deleteMany({});
    console.log("🧹 Cleared existing database collections");

    // Step 2: Create Admin User
     const hashPassword = await bcrypt.hash(process.env.admin_password, 10);
    const admin = await User.create({
      username: 'Admin_BeTheHE',
      email: process.env.admin_email,
      password: hashPassword,
      role: 'admin',
    });
    console.log("👤 Admin user created:", admin.username);

    // Step 3: Insert Categories
    const insertedCategories = await Category.insertMany(initialQuizCategory);
 

    // Step 4: Insert Questions
    const insertedQuestions = await Question.insertMany(initialQuestions);


    // Step 5: Create and insert basic QuizSets
    const quizsets = insertedCategories.slice(0, 5).map((category, index) => ({
      category: category._id,
      description: `Quiz Set ${index + 1}`,
      createdBy: admin._id,
    }));

    const insertedQuizSets = await QuizSets.insertMany(quizsets);
    console.log("🧩 Basic QuizSets inserted:", insertedQuizSets.length);

    // Step 6: Assign questions to each QuizSet by difficulty
    for (let i = 0; i < insertedQuizSets.length; i++) {
      const quizData = insertedQuizSets[i];

      const quizQuestions = insertedQuestions.filter((question, index) => {
        const quizIndex = Math.floor(index / 30); // Group 30 questions per quiz
        return quizIndex === i;
      });

      const easyQuestions = quizQuestions.filter(q => q.level === 'easy').slice(0, 10);
      const mediumQuestions = quizQuestions.filter(q => q.level === 'medium').slice(0, 10);
      const hardQuestions = quizQuestions.filter(q => q.level === 'hard').slice(0, 10);

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
    console.log("📚 QuizSet questions assigned by difficulty");

    // Step 7: Insert Achievements
    await Achievement.insertMany(achievementsData);
    console.log("🏆 Achievements inserted");

    // Step 8: Create and insert Random Quiz Sets
    const randomSetsToInsert = [];

    for (const set of initialRandomQuizSet) {
      // Match category name to its ObjectId
      const matchedCategory = insertedCategories.find(cat => cat.title === set.category);
      if (!matchedCategory) {
        console.warn(`⚠️ Category not found for random set: ${set.title}`);
        continue;
      }

      // Query questions for the matched category and difficulty
      const matchingQuestions = await Question.find({
        category: set.category,
        level: set.difficulty.toLowerCase(),
      }).limit(set.totalQuestions);

      // if (matchingQuestions.length < set.totalQuestions) {
      //   console.warn(`⚠️ Not enough questions for "${set.title}" (needed ${set.totalQuestions}, found ${matchingQuestions.length})`);
      // }

      // Build the quiz set object
      const randomSet = {
        title: set.title,
        description: set.description,
        category: matchedCategory.title,
        difficulty: set.difficulty,
        duration: set.duration,
        questions: matchingQuestions.map(q => q._id),
        totalQuestions: set.length,
        image: set.image,
        color: set.color,
        participants: set.participants,
        rating: set.rating,
        createdBy: admin._id
      };

      randomSetsToInsert.push(randomSet);
    }

    // Insert random quiz sets
    await RandomQuizSet.insertMany(randomSetsToInsert);
    console.log("🎲 Random Quiz Sets inserted:", randomSetsToInsert.length);

  } catch (err) {
    console.error("❌ Error during seeding:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
