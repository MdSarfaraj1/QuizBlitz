const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  description: String,
  questions: {
    easy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      }
    ],
    medium: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      }
    ],
    hard: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      }
    ]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Quiz', quizSchema);
