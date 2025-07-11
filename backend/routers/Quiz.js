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
router.get('/userAttemptedQuizzes',isLoggedIn('quizzesTaken'),quizController.getMyAttemptedQuizzes);//done
router.get('/userSavedQuiz', isLoggedIn(), quizController.getUserSavedQuizzes);//done
router.get('/allLearnLaterQuestions',isLoggedIn("learnLater"),quizController.getUserLearnLaterQuestions);//done
router.post('/removeLearnLater/:id', isLoggedIn(), quizController.removeLearnLaterQuestion);
router.post('/saveUnsaveQuiz', isLoggedIn(),quizController.saveUnsaveQuiz);//done
router.get('/userProgress', isLoggedIn('quizzesTaken'), quizController.getUserProgress);//done
router.get('/favoriteCategories',isLoggedIn('favoriteCategories quizzesTaken'), quizController.getUserFavoriteCategories);//done
router.put('/updateFavoriteCategories', isLoggedIn('favoriteCategories'), quizController.updateUserFavoriteCategories);//done
router.get('/userCreatedQuiz',isLoggedIn(), quizController.getMyCreatedQuizzes);

// Quiz creation and management (creator/admin)
router.post('/createQuiz', isLoggedIn(),quizController.createQuiz);//done
router.put('/updateQuiz/:id',isLoggedIn(),  quizController.updateQuiz);
router.delete('/deleteQuiz/:id',isLoggedIn(),quizController.deleteQuiz)

router.get('/quizOfTheDay',quizController.quizOfTheDay)//done
router.get('/getLeaderboard/:id', quizController.getLeaderboard);//done
router.post('/submitQuizRating', quizController.submitQuizRating);//done
module.exports = router;