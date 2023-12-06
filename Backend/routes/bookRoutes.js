const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// Protected routes (requires authentication)

router.post('/', bookController.addBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
