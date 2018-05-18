const express = require('express');
const router = express.Router();
const Booking = require("../controllers/booking");
const UserCtrl = require('../controllers/user');

router.post("", UserCtrl.authMiddleware, Booking.createBooking);

module.exports = router;