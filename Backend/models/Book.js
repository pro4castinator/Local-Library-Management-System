const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  available: { type: Boolean, default: true },
  category: { type: String, required: true }, // Category is required
  imageUrl: { type: String, required: true }, // Image URL is required
  description: { type: String, required: true }, // Description is required
  // Add more fields as needed
});

module.exports = mongoose.model('Book', bookSchema);
