// quiz.routes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { isLoggedIn } = require('../middleware/middleware');

// Public quiz endpoints
router.get('/allCategories', quizController.getCategories);//done
router.get('/category/allQuizzes',quizController.getAllQuizzesOfACategory)
router.get('/getRandomQuizSets',quizController.getRandomQuizSets)
router.post('/startQuiz/:id', quizController.startQuiz);//done
router.post('/submitQuiz',quizController.submitQuiz); 

 
// //endpoints , used by user to deal with quiz
// router.get('/userCreatedQuiz',isLoggedIn, quizController.getMyCreatedQuizzes);
router.get('/userAttempedQuiz',isLoggedIn,quizController.getMyAttemptedQuizzes);
// router.get('/userSavedQuiz', isLoggedIn, quizController.getMySavedQuizzes);
// router.get('/learnLater/:id',quizController.learnLater)
router.delete('/unsave', isLoggedIn,quizController.unsaveQuiz);

// Quiz creation and management (creator/admin)
router.post('/create', isLoggedIn,quizController.createQuiz);
router.put('/update/:id',  quizController.updateQuiz);

router.get('/quizOfTheDay',quizController.quizOfTheDay)

module.exports = router;