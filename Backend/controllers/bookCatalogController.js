const Book = require('../models/Book');

const bookCatalogController = {
  async getAllBooks(req, res) {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async searchBooks(req, res) {
    try {
      const { query } = req.query;
      const books = await Book.find({
        $or: [
          { title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
          { author: { $regex: query, $options: 'i' } }, // Case-insensitive author search
        ],
      });
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async filterBooks(req, res) {
    try {
      const { author, year } = req.query;
      const filters = {};
      if (author) filters.author = author;
      if (year) filters.publicationYear = year;

      const books = await Book.find(filters);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = bookCatalogController;
