
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Authentication endpoints
router.post('/register', authController.register);
router.post('/login',authController.login);
router.post('/logout', authController.logout);
router.post('/verify-email', authController.verifyEmail);
router.post('/resend-verification', authController.verifyEmail);
router.get('/getProfile',  authController.getProfile);
router.put('/updateProfile',  authController.updateProfile);

module.exports = router;