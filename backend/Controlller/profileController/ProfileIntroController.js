const asyncHandler = require("express-async-handler");
const User = require("../../Models/UserModel");
const IntroSchema = require("../../Models/profileModels/IntroModel");

// --------------------------------- function to create a user's intro profile ------------------------- //
const createProfileIntro = asyncHandler(async (req, res) => {
	// check if the user exists in the database
	const userExist = await User.findById(req.user._id);

	// if the user does not exist, then
	if (!userExist) {
		// throw an error
		throw new Error("User not Authorised");
	}

	// if the user exist then
	// get the details of the user's headline, education and the user's location fro the request body
	const { headLine, education, location } = req.body;
	// make a try-catch block
	try {
		// create the profile data
		const profileData = {
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			headLine,
			education,
			location,
		};

		// create the profile based on te data provided
		const createdProfile = await IntroSchema.create(profileData);

		// check if the profie was created
		if (createdProfile) {
			// send it to the frontend
			res.status(201);
			res.json(createdProfile);
		}
	} catch (error) {
		// if there was an error in the try block, then
		res.status(500);
		throw new Error(error.message);
	}
});
module.exports = { createProfileIntro };
