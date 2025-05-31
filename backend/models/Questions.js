const mongoose = require('mongoose');
const Category = require('./Category');

const questionSchema = new mongoose.Schema({
category: {
    type: [String], 
    required: true
},
  questionText:{
    type: String,
    required: true
  },
    options: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    hint: {
        type: String,
        default: 'No hint available for this question'
    },
    level: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    marks: {
        type: Number,
        default: 1
    },
 
   
});

module.exports = mongoose.model('Question', questionSchema);
