// quiz.routes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Public quiz endpoints
router.get('/allCategories', quizController.getCategories);
router.get('/category/allQuizzes',quizController.getAllQuizzesOfACategory)
router.get('start-quiz/:id', quizController.startQuiz);

//endpoints , used by user to deal with quiz
router.get('/userCreatedQuiz', quizController.getMyCreatedQuizzes);
router.get('/userAttempedQuiz',quizController.getMyAttemptedQuizzes);
router.get('/userSavedQuiz',  quizController.getMySavedQuizzes);
router.post('/saveQuiz/:id',quizController.saveQuiz); //submit quiz
router.delete('/:id/unsave', quizController.unsaveQuiz);

// Quiz creation and management (creator/admin)
router.post('/', quizController.createQuiz);
router.put('/:id',  quizController.updateQuiz);
router.delete('/:id', quizController.deleteQuiz);

module.exports = router;