const mongoose = require('mongoose');

const QuizSetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  duration: {
    type: Number,
    required: true // in minutes
  },
  questions:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Question',
    required:true
  }],
  totalQuestions:{
    type:Number,
    required:true,
    default:10
  },
  image: {
    type: String,
    default: '🎯'
  },
  color: {
    type: String,
    default: 'from-blue-400 to-purple-500'
  },
  participants: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
 
});



module.exports = mongoose.model('RandomQuizSet', QuizSetSchema);