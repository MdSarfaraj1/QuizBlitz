
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isLoggedIn } = require('../middleware/middleware'); 
const multer  = require('multer');
const {storage}=require("../utills/cloudinaryConfig");
        //const upload = multer({ dest: 'uploads/' }) // will store data in 
        //Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
        //NOTE: Multer will not process any form which is not multipart (multipart/form-data).
const upload = multer({storage});
// Authentication endpoints
router.post('/register', authController.register);
router.post('/login',authController.login);
router.post('/logout', authController.logout);
//google login signup
router.post('/google-login',authController.googleLogin);
router.post('/google-signup', authController.googleSignup);

router.post('/verify-email', authController.verifyEmail);
router.post('/resend-verification', authController.verifyEmail);
router.get('/getProfile', isLoggedIn(), authController.getProfile);
router.put('/updateProfile', isLoggedIn(),upload.single('avatar'), authController.updateProfile);
router.get('/getNotifications', isLoggedIn('notifications'), authController.getNotificationStatus);
router.post('/updateNotifications', isLoggedIn(), authController.updateNotificationStatus);
router.put('/updatePassword', isLoggedIn(), authController.updatePassword);
router.get('/verify-token', authController.verifyAuthToken);
router.delete('/deleteAccount', isLoggedIn(), authController.deleteAccount);

module.exports = router;