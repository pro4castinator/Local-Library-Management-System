const Reservation = require('../models/Reservation');
const Book = require('../models/Book');

const reservationController = {
  async reserveBook(req, res) {
    try {
      const { bookId } = req.body;
      const userId = req.user.userId; // Assuming the user ID is retrieved from the JWT token

      // Check if the book is available for reservation
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      if (!book.available) {
        return res.status(400).json({ message: 'Book is already reserved' });
      }

      // Update book availability status and create a new reservation
      book.available = false;
      await book.save();

      const newReservation = new Reservation({ bookId, userId });
      await newReservation.save();
      res.status(201).json({ message: 'Book reserved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async getUserReservations(req, res) {
    try {
      const userId = req.user.userId; // Assuming the user ID is retrieved from the JWT token
      const userReservations = await Reservation.find({ userId }).populate('bookId');
      res.status(200).json(userReservations);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async cancelReservation(req, res) {
    try {
      const reservationId = req.params.id;
      const reservation = await Reservation.findById(reservationId);
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }

      const book = await Book.findById(reservation.bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      // Update book availability status and delete the reservation
      book.available = true;
      await book.save();
      await Reservation.findByIdAndDelete(reservationId);

      res.status(200).json({ message: 'Reservation canceled successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = reservationController;
