const mongoose = require('mongoose');
const COLOR_PALETTE = [
  'from-blue-400 to-purple-500',
  'from-green-400 to-teal-500',
  'from-pink-400 to-rose-500',
  'from-yellow-400 to-orange-500',
  'from-indigo-400 to-blue-500',
  'from-purple-400 to-pink-500',
  'from-teal-400 to-green-500',
  'from-red-400 to-pink-500',
  'from-orange-400 to-red-500',
  'from-cyan-400 to-blue-500',
  'from-lime-400 to-green-500',
  'from-violet-400 to-purple-500',
  'from-emerald-400 to-teal-500',
  'from-sky-400 to-indigo-500',
  'from-amber-400 to-yellow-500',
  'from-slate-400 to-gray-500',
  'from-fuchsia-400 to-pink-500',
  'from-rose-400 to-red-500',
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-indigo-500'
];

function getRandomColor() {
  return COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
}

const QuizSetSchema = new mongoose.Schema({
  title: {type: String, required: true,trim: true},
  description: {type: String,required: true,trim: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category',required: true},
  difficulty: { type: String,required: true,enum: ['easy', 'medium', 'hard'], default: 'medium'  },
  duration: {type: Number,required: true,min: 1 },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question',required: true}],
  totalQuestions: {type: Number,required: true,default: 5},
  image: {type: String, default: '🎯'},
  color: String,
  participants: {type: Number,default: 0, min: 0 },
  rating: {type: Number, default: 0,min: 0,max: 5},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

// Virtual to ensure totalQuestions matches actual questions length
QuizSetSchema.virtual('actualQuestionCount').get(function() {
  return this.questions?.length || 0;
});

// Method to add questions to the quiz set
QuizSetSchema.methods.addQuestions = function(questionIds) {
  if (Array.isArray(questionIds)) {
    this.questions.push(...questionIds);
  } else {
    this.questions.push(questionIds);
  }
  this.totalQuestions = this.questions.length;
  return this;
};

// Method to get random subset of questions
QuizSetSchema.methods.getRandomQuestions = function(count) {
  if (count >= this.questions.length) {
    return this.questions;
  }
  
  const shuffled = [...this.questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Static method to find quiz sets by difficulty and category
QuizSetSchema.statics.findByDifficultyAndCategory = function(difficulty, categoryId) {
  return this.find({ 
    difficulty: difficulty, 
    category: categoryId,
  }).populate('category ');
};

  // Auto-assign color if not provided
QuizSetSchema.pre('save', function(next) {
  if (!this.color || this.color.trim() === '') {
    this.color = getRandomColor(this.category);
  } 
  next();
});
// Index for better performance
QuizSetSchema.index({ category: 1, difficulty: 1 });
QuizSetSchema.index({ createdBy: 1 });
QuizSetSchema.index({ participants: -1 });
QuizSetSchema.index({ rating: -1 });
QuizSetSchema.index({ isActive: 1 }); 

module.exports = mongoose.model('QuizSet', QuizSetSchema);