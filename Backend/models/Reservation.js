const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reservedAt: { type: Date, default: Date.now },
  // Add more fields as needed
});

module.exports = mongoose.model('Reservation', reservationSchema);
