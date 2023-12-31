require("dotenv").config();
const mongoose = require("mongoose");
const colors = require("colors");
const User = require("./Models/UserModel.js");
const connectDb = require("./config/db.js");

connectDb();

// // function to populate your DB with initial data
// const importData = async () => {
// 	// make a try-catch block
// 	try {
// 		// delete all the data under the selected collection
// 		await Product.deleteMany();
// 		await User.deleteMany();
// 		//  populate the users collection with initail data
// 		const createdUsers = await User.insertMany(users);
// 		// get the id of the first user which is the admin user
// 		const adminUser = createdUsers[0]._id;

// 		// loop through the initial data from the products and make the admin user the user who created
// 		const sampleProducts = products.map((product) => {
// 			return { ...product, user: adminUser };
// 		});
// 		// populate the product collection with the products initial data (sampleProducts)
// 		await Product.insertMany(sampleProducts);

// 		console.log(`Data imported:`.green.inverse);
// 		// exit the process
// 		process.exit();
// 	} catch (error) {
// 		// if an error occured in the try block then
// 		console.log(`${error}`.red.inverse);
// 		process.exit(1);
// 	}
// };

// function to delete all the data of selected collections in the DB
const destroyData = async () => {
	// make a try-catch block
	try {
		// delete all the data under the selected collection
		await User.deleteMany();

		console.log(`Data destroyed:`.red.inverse);
		// exit the process
		process.exit();
	} catch (error) {
		// if an error occured in the try block then
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
};

// when calling the functions in the panel, check if there is a second argument of "-d".
if (process.argv[2] === "-d") {
	// if there is then
	destroyData();
} else {
	// if there isn't then
	importData();
}
