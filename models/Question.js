const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // or 'Admin' if you have that
  },
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    validate: [arrayLimit, '{PATH} must have 4 options'],
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
    default: '',
  },
  level:{
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy',
  },
  marks:Number

});

// Helper to validate 4 options
function arrayLimit(val) {
  return val.length === 4;
}

module.exports = mongoose.model('Question', questionSchema);
