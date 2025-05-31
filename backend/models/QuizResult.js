const mongoose = require('mongoose');

// Define schema for quiz results
const quizResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz', 
    required: true
  },
  scoreObtained: {
    type: Number,
    required: true
  },
  correctAnswers: Number,
  wrongAnswers: {
    type: Number,
    required: true
  },
  timeTaken: {
    type: Number, 
    required: true
  },
  submissionDate: {
    type: Date,
    default: Date.now
  },
   learnLaterQuestions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question', 
      required: true
   }],

});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;
