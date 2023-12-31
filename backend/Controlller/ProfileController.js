const asyncHandler = require("express-async-handler");
const Profile = require("../Models/ProfileModel");
const User = require("../Models/UserModel");

// --------------------------------- function to create a user's profile ------------------------- //
const createProfile = asyncHandler(async (req, res) => {
	// check if the user exists in the database
	const userExist = await User.findById(req.user._id);
	console.log(req.user._id);

	// if the user does not exist, then
	if (!userExist) {
		// throw an error
		throw new Error("User not Authorised");
	}

	// if the user exist then
	// make a try-catch block
	try {
		// create the profile data
		const profileData = {
			user: req.user._id,
			headLine: "",
			summary: "",
			education: [],
			experience: [],
			skills: [],
			connection: [],
			contactInfo: {
				email: "test@test.com",
			},
			location: {},
			interest: [],
			openToWork: false,
			reference: [],
		};

		// create the profile based on te data provided
		const createdProfile = await Profile.create(profileData);

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
const getMyProfile = asyncHandler(async (req, res) => {
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
		const myProfile = await Profile.find({ user: req.user._id });
		// check if the user has a profile
		if (myProfile) {
			// if the user has a profile send it to the frontend
			res.status(200);
			res.json(myProfile);
		}
	} catch (error) {
		// if there is an error in the try block, then
		res.status(500);
		throw new Error(error.message);
	}
});

// ------------------------------- function profile of another user --------------------------- //
const getUserProfile = asyncHandler(async (req, res) => {
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
		const userProfile = await Profile.find({ _id: req.body.profileId });
		// check if the user has a profile
		if (userProfile) {
			// if the user has a profile send it to the frontend
			res.status(200);
			res.json(userProfile);
		}
	} catch (error) {
		// if there is an error in the try block, then
		res.status(500);
		throw new Error(error.message);
	}
});

// ------------------------------------ function to update the user's profile ----------------------------- //
const updateUserProfile = asyncHandler(async (req, res) => {
	// get the updates object froom the request body
	const { updates } = req.body;
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
		const userProfile = await Profile.findOne({ user: req.user._id });

		// check if the user's profile was found
		if (!userProfile) {
			// if it was not found
			throw new Error("User profile not found");
		}

		// if it was found, then proceed
		// update the user's profile found
		await updateProfiile(userProfile, updates);

		// save the updated profile to the database
		await saveProfile(userProfile);

		// send the updated profile to the frontend
		res.status(201);
		res.json(userProfile);
	} catch (error) {
		console.log(error);
		// if there was an error in the try block
		throw new Error(error.message);
	}
});

// function to update the profile
const updateProfiile = (userProfile, updates) => {
	if (updates.headLine) {
		userProfile.headLine = updates.headLine;
	}
	if (updates.summary) {
		userProfile.summary = updates.summary;
	}
	if (updates.backgroundPhoto !== undefined) {
		userProfile.backgroundPhoto = updates.backgroundPhoto;
	}
	if (updates.experience !== undefined) {
		userProfile.experience = updates.experience;
	}
	if (updates.education !== undefined) {
		userProfile.education = updates.education;
	}
	if (updates.skills !== undefined) {
		userProfile.skills = updates.skills;
	}
	if (updates.connection !== undefined) {
		userProfile.connection = updates.connection;
	}
	if (updates.contactInfo !== undefined) {
		userProfile.contactInfo = updates.contactInfo;
	}
	if (updates.location !== undefined) {
		userProfile.location = updates.location;
	}
	if (updates.interest !== undefined) {
		userProfile.interest = updates.interest;
	}
	if (updates.openToWork !== undefined) {
		userProfile.openToWork = updates.openToWork;
	}
	if (updates.reference !== undefined) {
		userProfile.reference = updates.reference;
	}
};

// function to save the userProfile to the database
const saveProfile = async (userProfile) => {
	await userProfile.save();
};

module.exports = {
	createProfile,
	getMyProfile,
	getUserProfile,
	updateUserProfile,
};
