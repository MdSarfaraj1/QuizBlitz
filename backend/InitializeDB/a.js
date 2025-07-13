const mongoose = require('mongoose');
const Question = require('../models/Questions'); 

// 🔁 Replace with your MongoDB connection string
const MONGO_URI = 'mongodb:';

async function removeDuplicateCorrectAnswers() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const questions = await Question.find({});

  for (const question of questions) {
    const { options, correctAnswer } = question;

    const updatedOptions = [];
    let found = false;

    for (const opt of options) {
      if (opt === correctAnswer) {
        if (!found) {
          updatedOptions.push(opt);
          found = true;
        }
      } else {
        updatedOptions.push(opt);
      }
    }

    if (options.length !== updatedOptions.length) {
      question.options = updatedOptions;
      await question.save();
      console.log(` Updated question: ${question._id}`);
    }
  }

  console.log(' Done!');
  mongoose.disconnect();
}

removeDuplicateCorrectAnswers().catch(err => {
  console.error('❌ Error:', err);
  mongoose.disconnect();
});
