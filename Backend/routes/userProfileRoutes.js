const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const authenticateToken = require('../middleware/authenticateToken');

router.use(authenticateToken);
router.get('/', userProfileController.getUserProfile);
router.put('/', userProfileController.updateUserProfile);

module.exports = router;
