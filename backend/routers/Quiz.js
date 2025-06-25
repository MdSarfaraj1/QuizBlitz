// quiz.routes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { isLoggedIn } = require('../middleware/middleware');

// Public quiz endpoints
router.get('/allCategories', quizController.getCategories);//done
router.get('/getQuizSets',quizController.getQuizSets)//done
router.get('/startPredefinedQuiz/:id',quizController.startPredefinedQuiz)//done
router.post('/startQuiz/:id', quizController.startQuiz);//done
router.post('/startQuiz/guest/:id', quizController.startGuestQuiz);//done
router.post('/submitQuizResult',isLoggedIn(),quizController.submitQuizResult); //done
 
// //endpoints , used by user to deal with quiz
// router.get('/userCreatedQuiz',isLoggedIn, quizController.getMyCreatedQuizzes);
router.get('/userAttemptedQuizzes',isLoggedIn('quizzesTaken'),quizController.getMyAttemptedQuizzes);//done
 router.get('/userSavedQuiz', isLoggedIn(), quizController.getUserSavedQuizzes);//done
// router.get('/learnLater/:id',quizController.learnLater)
router.post('/saveUnsaveQuiz', isLoggedIn(),quizController.saveUnsaveQuiz);//done

// Quiz creation and management (creator/admin)
router.post('/create', isLoggedIn,quizController.createQuiz);
router.put('/update/:id',  quizController.updateQuiz);

router.get('/quizOfTheDay',quizController.quizOfTheDay)//done
router.get('/getLeaderboard/:id', quizController.getLeaderboard);//done
module.exports = router;