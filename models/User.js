const mongoose = require('mongoose');

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
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please provide a valid email address'], // Email format validation
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
});

module.exports = mongoose.model('User', userSchema);
