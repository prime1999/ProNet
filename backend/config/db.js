const mongoose = require("mongoose");

const connectDb = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`connected to ${conn.connection.host}`.blue.underline);
	} catch (error) {
		console.log(`${error.message}`.red.underline);
		process.exit();
	}
};

module.exports = connectDb;
