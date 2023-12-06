const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Ensure dotenv for environment variables


const app = express();
const PORT = process.env.PORT || 5000;
const secretKey = process.env.SECRET_KEY;

const corsOptions = {
  origin: true
}


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const bookCatalogRoutes = require('./routes/bookCatalogRoutes');

// Use the defined routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/user/profile', userProfileRoutes);
app.use('/api/books/catalog', bookCatalogRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
