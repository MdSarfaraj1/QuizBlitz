const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  level:{
    type:Number,
    default:1
  },
  description: String,
  timeLimit: {
    type: Number, // in minutes
    default: 10,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Quiz', quizSchema);
