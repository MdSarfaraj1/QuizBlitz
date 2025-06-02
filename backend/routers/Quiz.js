// quiz.routes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { isLoggedIn } = require('../middleware/middleware');

// Public quiz endpoints
router.get('/allCategories', quizController.getCategories);//done
router.get('/getRandomQuizSets',quizController.getRandomQuizSets)//done
router.get('/startRandomQuiz/:id',quizController.startRandomQuizSet)//done
router.post('/startQuiz/:id', quizController.startQuiz);//done
router.post('/submitQuizResult',isLoggedIn(),quizController.submitQuizResult); //done
 
// //endpoints , used by user to deal with quiz
// router.get('/userCreatedQuiz',isLoggedIn, quizController.getMyCreatedQuizzes);
router.get('/userAttemptedQuizzes',isLoggedIn('quizzesTaken'),quizController.getMyAttemptedQuizzes);//done
// router.get('/userSavedQuiz', isLoggedIn, quizController.getMySavedQuizzes);
// router.get('/learnLater/:id',quizController.learnLater)
router.delete('/unsave', isLoggedIn,quizController.unsaveQuiz);

// Quiz creation and management (creator/admin)
router.post('/create', isLoggedIn,quizController.createQuiz);
router.put('/update/:id',  quizController.updateQuiz);

router.get('/quizOfTheDay',quizController.quizOfTheDay)//done
router.get('/getLeaderboard/:id', quizController.getLeaderboard);//done
module.exports = router;