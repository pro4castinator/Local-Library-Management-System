const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:id/profile', authenticateToken, userController.getUserProfile);

// Admin routes
router.get('/', authenticateToken, userController.getAllUsers); // Fetch all users (admin access)
router.put('/:id', authenticateToken, userController.updateUser); // Update user details (admin access)
router.delete('/:id', authenticateToken, userController.deleteUser); // Delete a user (admin access)

module.exports = router;
