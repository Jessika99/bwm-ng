const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const User = require('../models/user');
const { normalizeErrors } = require("../helpers/mongoose");
const moment = require('moment');

const UserCtrl = require('../controllers/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
	res.json({"test": true});
});

router.get("/manage", UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Rental.where({user: user}).populate('bookings').exec(function(err, foundRentals){
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors) });
    }

    res.json(foundRentals);
  });
});

router.get("/:id", function(req, res) {
  Rental.findById(req.params.id).
    populate('user', 'email -_id').
    populate('bookings', 'startAt endAt -_id').
    exec(function(err, foundRental) {
      if (err) {
      return res.status(422).send({errors: [{title: 'Rental Error', detail: 'Could not find rental'}]});
    }
      res.json(foundRental);
  });
});

router.delete("/:id", UserCtrl.authMiddleware, function(req, res) {
  const user =  res.locals.user;

  Rental.findById(req.params.id)
    .populate('user', '_id')
    .populate({
      path: 'bookings',
      select: 'startAt',
      match: { startAt: {$gt: new Date()}}
    })
    .exec(function(err, rental) {
      if (err) { return res.status(422).send({errors: normalizeErrors(err.errors) });}

      if (user.id !== rental.user.id) {
        return res.status(422).send({errors: [{title: 'Invalid User', detail: "You are not rental owener!!!!"}] });
      }
      
      if (rental.bookings.length > 0) {
        return res.status(422).send({errors: [{title: 'Has Active Bookings', detail: "Cannot delete rental with active bookings. Please contact support for more info"}] });
      }

      rental.remove(function(err) {
        if (err) { return res.status(422).send({errors: normalizeErrors(err.errors) });}

        return res.json({"ok": true})
      })
  });
});

router.post("", UserCtrl.authMiddleware, function(req, res) {
  const { title, city, street, category, image, shared, bedrooms, description, dailyRate } = req.body;

  const rental = new Rental({title, city, street, category, image, bedrooms, description, dailyRate});
  const user = res.locals.user;
  rental.user = user;

  Rental.create(rental, function(err, newRental) {
    if (err) {

      return res.status(422).send({errors: normalizeErrors(err.errors) });
    } 

    User.update({_id: user.id}, { $push: {rentals: newRental}}, function(){});
    return res.status(200).send(newRental);
  });
});


router.get("", function(req, res) {
  const city = req.query.city;
  const query = req.query.city ? {city: city.toLowerCase()} : {};

  Rental.find(query).select('-bookings').exec(function(err, foundRentals) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors) });
    }

    if (city && foundRentals.length === 0) {
      return res.status(422).send({errors: [{title: 'No Rentals found', detail: `There are no rentals for city ${city}`}] });
    }
    
    return res.json(foundRentals);
  });
});

module.exports = router;