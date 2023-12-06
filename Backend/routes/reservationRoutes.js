const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authenticateToken = require('../middleware/authenticateToken');

router.use(authenticateToken);
router.post('/reserve', reservationController.reserveBook);
router.get('/user', reservationController.getUserReservations);
router.delete('/:id', reservationController.cancelReservation);

module.exports = router;
