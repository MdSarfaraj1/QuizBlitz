const express = require('express');
const router = express.Router();
const adminControlller = require('../controllers/adminController');
const { isLoggedIn } = require('../middleware/middleware');
// Admin endpoints
router.get('/getAllUsersAndCategories', isLoggedIn(), adminControlller.getAllUsersAndCategories); // Get all users
router.put('/updateUserByAdmin/:userId', isLoggedIn(), adminControlller.updateUserByAdmin); // Update user role
router.delete('/deleteUserByAdmin/:userId', isLoggedIn(), adminControlller.deleteUserByAdmin); // Delete user
router.post('/addNewUser', isLoggedIn(), adminControlller.addNewUser); // Add new user
router.get('/addNewCattegory', isLoggedIn(), adminControlller.addNewCategory); // Add new category
router.put('/updateCategory', isLoggedIn(), adminControlller.updateCategory); // Update category
router.delete('/deleteCategory', isLoggedIn(), adminControlller.deleteCategory); // Delete category
router.post('/sendNotification', isLoggedIn(), adminControlller.sendNotification); // Send notification
module.exports = router;