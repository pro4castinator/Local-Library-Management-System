const express = require('express');
const router = express.Router();
const bookCatalogController = require('../controllers/bookCatalogController');

router.get('/', bookCatalogController.getAllBooks);
router.get('/search', bookCatalogController.searchBooks);
router.get('/filter', bookCatalogController.filterBooks);

module.exports = router;
