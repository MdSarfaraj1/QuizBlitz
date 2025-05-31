const mongoose = require('mongoose');
const { create } = require('./Achievement');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures usernames are unique
    trim: true, // Trims any extra whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures emails are unique
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Password length validation
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Role can either be 'user' or 'admin'
    default: 'user', // Default role is 'user'
  },
  quizzesCreated: [{
    type: mongoose.Schema.Types.ObjectId, // References to the quizzes created by the user
    ref: 'Quiz',
  }],
  quizzesTaken: [{
    type: mongoose.Schema.Types.ObjectId, // References to quizzes taken by the user
    ref: 'Quiz', 
  }],
  learnLater:[{
    type:mongoose.Schema.Types.ObjectId,
  ref:'Question'
  }],
  totalScore: {
    type: Number,
    default: 0, 
  },
  achievements: [{
    type: mongoose.Schema.Types.ObjectId, // References to achievements earned by the user
    ref: 'Achievement',
  }],
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  lastQuizOfTheDate:Date,
  quizOfTheDayStreak: {
    type: Number,
    default: 0, // Streak for the Quiz of the Day
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model('User', userSchema);
