const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const FakeDb = require('./fake-db');
const bodyParser = require('body-parser');
const path = require('path');

const rentalRoutes = require('./routes/rentals'),
	  userRoutes    = require("./routes/users"),
	  bookingRoutes    = require("./routes/bookings");

// DB Conection
mongoose.connect(config.DB_URI).then(() => {
	if (process.env.NODE_ENV !== 'production') {
		const fakeDb = new FakeDb();
		// fakeDb.seedDb();
	}
});

// Express app creation
const app = express();

app.use(bodyParser.json());

// Routing
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

const appPath = path.join(__dirname, '..', 'dist');
app.use(express.static(appPath));

if (process.env.NODE_ENV === 'production') {
		app.get('*', function(req, res) {
		res.sendFile(path.resolve(appPath, 'index.html'));
	});
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
	console.log('Node server running on port ' + PORT);
});