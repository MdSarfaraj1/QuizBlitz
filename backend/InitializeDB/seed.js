require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../configure/database");
const bcrypt = require('bcryptjs');
// Import seed data
const { initialQuizCategory } = require("./QuizCategory");
const initialQuestions = require("./questions");
const achievementsData = require("./achievements");
const { initialRandomQuizSet } = require("./RandomSets");

// Import Mongoose models
const QuizSet = require("../models/QuizSet"); // Unified model
const Question = require("../models/Questions");
const User = require("../models/User");
const Category = require("../models/Category");
const Achievement = require("../models/Achievement");

async function seedDatabase() {
  await connectDB();

  try {
    // Step 1: Clear existing collections
    await QuizSet.deleteMany({});
    await Question.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});
    await Achievement.deleteMany({});
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
    console.log("📂 Categories inserted:", insertedCategories.length);

    // Step 4: Insert Questions
    const insertedQuestions = await Question.insertMany(initialQuestions);
    console.log("❓ Questions inserted:", insertedQuestions.length);

    // Step 5: Create QuizSets from RandomSets data
    const quizSetsToInsert = [];

    for (const set of initialRandomQuizSet) {
      // Match category name to its ObjectId
      const matchedCategory = insertedCategories.find(cat => cat.title === set.category);
      if (!matchedCategory) {
        console.warn(`⚠️ Category not found for quiz set: ${set.title}`);
        continue;
      }
      console.log(matchedCategory)

      // Query questions for the matched category and difficulty
      const matchingQuestions = await Question.find({
        category: set.category,
        level: set.difficulty,
      }).limit(set.totalQuestions);

      if (matchingQuestions.length === 0) {
        console.warn(`⚠️ No questions found for "${set.title}" (${set.category}, ${set.difficulty})`);
        continue;
      }

      const quizSet = {
        title: set.title,
        description: set.description,
        category: matchedCategory._id,
        difficulty: set.difficulty,
        duration: set.duration,
        questions: matchingQuestions.map(q => q._id),
        totalQuestions: matchingQuestions.length,
        image: set.image,
        color: set.color,
        participants: set.participants,
        rating: set.rating,
        createdBy: admin._id,
      };

      quizSetsToInsert.push(quizSet);
    }

    // Insert quiz sets
    if (quizSetsToInsert.length > 0) {
      await QuizSet.insertMany(quizSetsToInsert);
      console.log("🎯 QuizSets created:", quizSetsToInsert.length);
    }

    // Step 6: Create additional quiz sets for categories not covered in RandomSets
    const additionalQuizSets = [];
    const coveredCategories = initialRandomQuizSet.map(set => set.category);
    const uncoveredCategories = insertedCategories.filter(cat => !coveredCategories.includes(cat.title));

    for (const category of uncoveredCategories.slice(0, 10)) { // Limit to avoid too many
      const difficulties = ['easy', 'medium', 'hard'];
      
      for (const difficulty of difficulties) {
        const categoryQuestions = await Question.find({
          category: category.title,
          level: difficulty,
        }).limit(15);

        if (categoryQuestions.length >= 5) {
          const additionalSet = {
            title: `${category.title} ${difficulty}`,
            description: `${difficulty} level quiz for ${category.description}`,
            category: category._id,
            difficulty: difficulty,
            duration: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 20 : 25,
            questions: categoryQuestions.map(q => q._id),
            totalQuestions: categoryQuestions.length,
            image: category.icon,
            color: difficulty === 'easy' ? 'from-green-400 to-blue-500' : 
                   difficulty === 'medium' ? 'from-yellow-400 to-orange-500' : 
                   'from-red-500 to-purple-600',
            participants: Math.floor(Math.random() * 800) + 200,
            rating: (Math.random() * 1.5 + 3.5).toFixed(1),
            createdBy: admin._id,
  
          };

          additionalQuizSets.push(additionalSet);
        }
      }
    }

    if (additionalQuizSets.length > 0) {
      await QuizSet.insertMany(additionalQuizSets);
      console.log(" Additional QuizSets created:", additionalQuizSets.length);
    }

    // Step 7: Insert Achievements
    await Achievement.insertMany(achievementsData);
    console.log("Achievements inserted:", achievementsData.length);

    // Step 8: Create some mixed-difficulty challenge sets
    const challengeQuizSets = [];
    const popularCategories = insertedCategories.slice(0, 5);

    for (const category of popularCategories) {
      // Get questions from all difficulties
      const easyQuestions = await Question.find({
        category: category.title,
        level: 'easy'
      }).limit(3);

      const mediumQuestions = await Question.find({
        category: category.title,
        level: 'medium'
      }).limit(4);

      const hardQuestions = await Question.find({
        category: category.title,
        level: 'hard'
      }).limit(3);

      const allQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];

      if (allQuestions.length >= 8) {
        const challengeSet = {
          title: `${category.title} Ultimate Challenge`,
          description: `Mixed difficulty challenge combining all levels of ${category.title}`,
          category: category._id,
          difficulty: 'hard',
          duration: 25,
          questions: allQuestions.map(q => q._id),
          totalQuestions: allQuestions.length,
          image: category.icon,
          color: 'from-purple-600 to-pink-600',
          participants: Math.floor(Math.random() * 400) + 100,
          rating: (Math.random() * 0.8 + 4.2).toFixed(1),
          createdBy: admin._id,
        };

        challengeQuizSets.push(challengeSet);
      }
    }

    if (challengeQuizSets.length > 0) {
      await QuizSet.insertMany(challengeQuizSets);
      console.log(" Challenge QuizSets created:", challengeQuizSets.length);
    }

    console.log("🔄 Updating totalQuizzes for categories...");
    for (const category of insertedCategories) {
      const quizCount = await QuizSet.countDocuments({ category: category._id });
      await Category.updateOne(
        { _id: category._id },
        { $set: { totalQuizzes: quizCount } }
      );
      console.log(`- Category "${category.title}" now has ${quizCount} quizzes.`);
    }
    console.log("✅Database seeding completed successfully!");
    
    // Summary
    const totalQuizSets = await QuizSet.countDocuments();
    console.log(`📊 Total QuizSets in database: ${totalQuizSets}`);

  } catch (err) {
    console.error("❌ Error during seeding:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();