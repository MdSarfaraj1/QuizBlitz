const mongoose = require('mongoose');

// Define schema for quiz results
const quizResultSchema = new mongoose.Schema({


 
 

   learnLaterQuestions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question', 
      required: true
   }],

});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;
