require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const QuizSet = require('../models/QuizSet');
// const Question = require('../models/Questions'); 



// async function removeDuplicateCorrectAnswers() {


//   const questions = await Question.find({});

//   for (const question of questions) {
//     const { options, correctAnswer } = question;

//     const updatedOptions = [];
//     let found = false;

//     for (const opt of options) {
//       if (opt === correctAnswer) {
//         if (!found) {
//           updatedOptions.push(opt);
//           found = true;
//         }
//       } else {
//         updatedOptions.push(opt);
//       }
//     }

//     if (options.length !== updatedOptions.length) {
//       question.options = updatedOptions;
//       await question.save();
//       console.log(` Updated question: ${question._id}`);
//     }
//   }

//   console.log(' Done!');
//   mongoose.disconnect();
// }

// removeDuplicateCorrectAnswers().catch(err => {
//   console.error('❌ Error:', err);
//   mongoose.disconnect();
// });


const updateTotalQuizzes = async () => {
  try {
    // Fetch all categories
    await mongoose.connect(process.env.mongo_atlas_url);
  console.log('✅ Connected to MongoDB');
    const categories = await Category.find();

    for (const category of categories) {
      // Count how many quiz sets have this category's _id
      const count = await QuizSet.countDocuments({ category: category._id });

      // Update the category with the count
      await Category.updateOne(
        { _id: category._id },
        { $set: { totalQuizzes: count } }
      );

      console.log(`Updated ${category.name} with totalQuizzes = ${count}`);
    }

    console.log('✅ All categories updated!');
  } catch (err) {
    console.error('❌ Error updating totalQuizzes:', err);
  }
};

updateTotalQuizzes();
