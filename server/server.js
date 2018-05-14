const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const bodyParser = require('body-parser');

const rentalRoutes = require('./routes/rentals'),
	  userRoutes    = require("./routes/users");

// DB Conection
mongoose.connect(config.DB_URI).then(() => {
	const fakeDb = new FakeDb();
	fakeDb.seedDb();
});

// Express app creation
const app = express();

app.use(bodyParser.json());

// Routing
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
	console.log('Node server running on port ' + PORT);
});