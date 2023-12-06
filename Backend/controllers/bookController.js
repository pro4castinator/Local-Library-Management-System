const Book = require('../models/Book');

const bookController = {
  async getAllBooks(req, res) {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async getBookById(req, res) {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async addBook(req, res) {
    try {
      const { title, author, publicationYear, category, imageUrl, description } = req.body;
      const newBook = new Book({ title, author, publicationYear, category, imageUrl, description });
      await newBook.save();
      res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
  

  async updateBook(req, res) {
    try {
      const bookId = req.params.id;
      const updates = req.body;
      const updatedBook = await Book.findByIdAndUpdate(bookId, updates, { new: true });
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async deleteBook(req, res) {
    try {
      const bookId = req.params.id;
      const deletedBook = await Book.findByIdAndDelete(bookId);
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = bookController;
