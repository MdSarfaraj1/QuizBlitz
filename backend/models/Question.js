const mongoose = require('mongoose');
const MimeNode = require('nodemailer/lib/mime-node');

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
   minLength: 2,
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


module.exports = mongoose.model('Question', questionSchema);
