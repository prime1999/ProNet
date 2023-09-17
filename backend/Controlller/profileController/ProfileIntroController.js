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
	// get the details of the user's headline, education and the user's location from the request body
	const { headLine, education, location, summary } = req.body;
	// make a try-catch block
	try {
		// create the profile data
		const profileData = {
			user: req.user._id,
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			headLine,
			summary,
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

// ------------------------------- function profile of the current user --------------------------- //
const getMyProfileIntro = asyncHandler(async (req, res) => {
	// check if the user exists in the database
	const userExist = await User.findById(req.user._id);

	// if the user does not exist, then
	if (!userExist) {
		// throw an error
		throw new Error("User not Authorised");
	}

	// if the user exist then
	// make a try-catch block
	try {
		// get the profile of the current user
		const myProfileIntro = await IntroSchema.find({ user: req.user._id });
		// check if the user has a profile
		if (myProfileIntro) {
			// if the user has a profile send it to the frontend
			res.status(200);
			res.json(myProfileIntro);
		}
	} catch (error) {
		// if there is an error in the try block, then
		res.status(500);
		throw new Error(error.message);
	}
});

// ------------------------------- function profile of another user --------------------------- //
const getUserProfileIntro = asyncHandler(async (req, res) => {
	// check if the user exists in the database
	const userExist = await User.findById(req.user._id);

	// if the user does not exist, then
	if (!userExist) {
		// throw an error
		throw new Error("User not Authorised");
	}

	// if the user exist then
	// make a try-catch block
	try {
		// get the profile of the current user
		const userProfileIntro = await IntroSchema.find({
			_id: req.body.profileId,
		});
		// check if the user has a profile
		if (userProfileIntro) {
			// if the user has a profile send it to the frontend
			res.status(200);
			res.json(userProfileIntro);
		}
	} catch (error) {
		// if there is an error in the try block, then
		res.status(500);
		throw new Error(error.message);
	}
});

// ------------------------------------ function to update the user's profile intro ----------------------------- //
const updateUserProfileIntro = asyncHandler(async (req, res) => {
	// get the updates object froom the request body
	const { introUpdates } = req.body;
	// check if the user exists in the database
	const userExist = await User.findById(req.user._id);

	// if the user does not exist, then
	if (!userExist) {
		// throw an error
		throw new Error("User not Authorised");
	}

	// if the user exist then
	// make a try-catch block
	try {
		// find the user's profile
		const userProfileIntro = await IntroSchema.findOne({ user: req.user._id });

		// check if the user's profile was found
		if (!userProfileIntro) {
			// if it was not found
			throw new Error("User profile not found");
		}

		// if it was found, then proceed
		// update the user's profile found
		await updateProfiileIntro(userProfileIntro, introUpdates);

		// save the updated profile to the database
		await saveProfileIntro(userProfileIntro);

		// send the updated profile to the frontend
		res.status(201);
		res.json(userProfileIntro);
	} catch (error) {
		console.log(error);
		// if there was an error in the try block
		throw new Error(error.message);
	}
});

// function to update the profile intro
const updateProfiileIntro = async (userProfileIntro, introUpdates) => {
	// console.log(req.user._id);
	if (introUpdates.firstName) {
		userProfileIntro.firstName = introUpdates.firstName;
		// update the first name in the users collection
		await User.findOneAndUpdate(
			{ _id: userProfileIntro.user },
			{ firstName: introUpdates.firstName }
		);
	}

	if (introUpdates.lastName) {
		userProfileIntro.lastName = introUpdates.lastName;
		// update the last name in the users collection
		await User.findOneAndUpdate(
			{ _id: userProfileIntro.user },
			{ lastName: introUpdates.lastName }
		);
	}

	if (introUpdates.pic) {
		userProfileIntro.pic = introUpdates.pic;
	}

	if (introUpdates.headLine) {
		userProfileIntro.headLine = introUpdates.headLine;
	}
	if (introUpdates.summary) {
		userProfileIntro.summary = introUpdates.summary;
	}

	if (introUpdates.backgroundPhoto !== undefined) {
		userProfileIntro.backgroundPhoto = introUpdates.backgroundPhoto;
	}

	if (introUpdates.education !== undefined) {
		userProfileIntro.education = introUpdates.education;
	}

	if (introUpdates.location !== undefined) {
		userProfileIntro.location = introUpdates.location;
	}
};

// function to save the userProfile to the database
const saveProfileIntro = async (userProfileIntro) => {
	await userProfileIntro.save();
};

module.exports = {
	createProfileIntro,
	getMyProfileIntro,
	getUserProfileIntro,
	updateUserProfileIntro,
};
