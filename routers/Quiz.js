// quiz.routes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { isLoggedIn } = require('../middleware/middleware');

// Public quiz endpoints
router.get('/allCategories', quizController.getCategories);
router.get('/category/allQuizzes',quizController.getAllQuizzesOfACategory)
router.get('start-quiz/:id', quizController.startQuiz);

//endpoints , used by user to deal with quiz
router.get('/userCreatedQuiz',isLoggedIn, quizController.getMyCreatedQuizzes);
router.get('/userAttempedQuiz',isLoggedIn,quizController.getMyAttemptedQuizzes);
router.get('/userSavedQuiz', isLoggedIn, quizController.getMySavedQuizzes);
router.post('/submitQuiz',quizController.submitQuiz); //auto save
router.delete('/unsave', isLoggedIn,quizController.unsaveQuiz);

// Quiz creation and management (creator/admin)
router.post('/create', isLoggedIn,quizController.createQuiz);
router.put('/update/:id',  quizController.updateQuiz);


module.exports = router;