const Rental = require('./models/rental');
const User = require('./models/user');
const Booking = require('./models/booking');
const fakeDbData = require('./data.json');

class FakeDb {

	constructor() {
		// const dataObj = JSON.parse(fakeDbData);
		// console.log(dataObj);

		this.rentals = fakeDbData.rentals;

		this.users = fakeDbData.users;
	}

	pushDataToDb() {
		const user = new User(this.users[0]);
		const user2 = new User(this.users[1]);

		this.rentals.forEach((rental) => {
			const newRental = new Rental(rental);
			newRental.user = user;

			user.rentals.push(newRental);
			newRental.save();
		});

		user.save();
		user2.save();
	}

	async cleanDb() {
		await User.remove({});
		await Rental.remove({});
		await Booking.remove({});
	}

	async seedDb() {
		await this.cleanDb();
		this.pushDataToDb();
	}
}

module.exports = FakeDb;