
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isLoggedIn } = require('../middleware/middleware'); 

// Authentication endpoints
router.post('/register', authController.register);
router.post('/login',authController.login);
router.post('/logout', authController.logout);
router.post('/verify-email', authController.verifyEmail);
router.post('/resend-verification', authController.verifyEmail);
router.get('/getProfile', isLoggedIn(), authController.getProfile);
router.put('/updateProfile', isLoggedIn(), authController.updateProfile);//pending
router.get('/verify-token', authController.verifyAuthToken);

module.exports = router;