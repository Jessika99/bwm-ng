const express = require('express');
const router = express.Router();
const Booking = require("../controllers/booking");
const UserCtrl = require('../controllers/user');

router.post("", UserCtrl.authMiddleware, Booking.createBooking);

router.get("/manage", UserCtrl.authMiddleware, Booking.getUserBookings);

module.exports = router;