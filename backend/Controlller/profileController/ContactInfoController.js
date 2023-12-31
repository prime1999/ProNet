const asyncHandler = require("express-async-handler");
const User = require("../../Models/UserModel");
const ContactSchema = require("../../Models/profileModels/ContactInfo");

// --------------------------------- function to create a user's contact profile ------------------------- //
const createContactProfile = asyncHandler(async (req, res) => {
	// check if the user exists in the database
	const userExist = await User.findById(req.user._id);

	// if the user does not exist, then
	if (!userExist) {
		// throw an error
		throw new Error("User not Authorised");
	}

	// if the user exist then
	// get the details of the user's headline, education and the user's location fro the request body
	const { address, birthDay, website } = req.body;
	// make a try-catch block
	try {
		// create the profile data
		const contactInfo = {
			user: req.user._id,
			email: req.user.email,
			phoneNumber: req.user.phoneNumber,
			Address: address,
			BirthDay: birthDay,
			Website: website,
		};

		// create the profile based on te data provided
		const createdContactProfile = await ContactSchema.create(contactInfo);

		// check if the profie was created
		if (createdContactProfile) {
			// send it to the frontend
			res.status(201);
			res.json(createdContactProfile);
		}
	} catch (error) {
		// if there was an error in the try block, then
		res.status(500);
		throw new Error(error.message);
	}
});

// ------------------------------- function conatct profile of the current user --------------------------- //
const getMyContactProfile = asyncHandler(async (req, res) => {
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
		const myContactProfile = await ContactSchema.find({
			user: req.user._id,
		});
		// check if the user has a profile
		if (myContactProfile) {
			// if the user has a profile send it to the frontend
			res.status(200);
			res.json(myContactProfile);
		}
	} catch (error) {
		// if there is an error in the try block, then
		res.status(500);
		throw new Error(error.message);
	}
});

// ------------------------------- function contact profile of another user --------------------------- //
const getUserContactProfile = asyncHandler(async (req, res) => {
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
		const userContactProfile = await ContactSchema.find({
			_id: req.body.profileId,
		});
		// check if the user has a profile
		if (userContactProfile) {
			// if the user has a profile send it to the frontend
			res.status(200);
			res.json(userContactProfile);
		}
	} catch (error) {
		// if there is an error in the try block, then
		res.status(500);
		throw new Error(error.message);
	}
});

// ------------------------------------ function to update the user's contact profile ----------------------------- //
const updateUserContactProfile = asyncHandler(async (req, res) => {
	// get the updates object froom the request body
	const { contactUpdates } = req.body;
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
		const userContactProfile = await ContactSchema.findOne({
			user: req.user._id,
		});

		// check if the user's profile was found
		if (!userContactProfile) {
			// create the profile data
			const contactInfo = {
				user: req.user._id,
				email: req.user.email,
				phoneNumber: req.user.phoneNumber,
				Address: contactUpdates.address ? contactUpdates.address : "",
				BirthDay: contactUpdates.birthday ? contactUpdates.birthday : "",
				Website: contactUpdates.website ? contactUpdates.website : "",
			};

			// create the profile based on te data provided
			const createdContactProfile = await ContactSchema.create(contactInfo);
			// check if the profie was created
			if (createdContactProfile) {
				// send it to the frontend
				res.status(201);
				res.json(createdContactProfile);
			}
		}

		// if it was found, then proceed
		// update the user's profile found
		await updateContactProfile(userContactProfile, contactUpdates);

		// save the updated profile to the database
		await saveContactProfile(userContactProfile);

		// send the updated profile to the frontend
		res.status(201);
		res.json(userContactProfile);
	} catch (error) {
		console.log(error);
		// if there was an error in the try block
		throw new Error(error.message);
	}
});

// function to update the contact profile
const updateContactProfile = async (userContactProfile, contactUpdates) => {
	if (contactUpdates.phoneNumber) {
		userContactProfile.phoneNumber = contactUpdates.phoneNumber;
		// update the phone number in the users collection
		await User.findOneAndUpdate(
			{ _id: userContactProfile.user },
			{ phoneNumber: contactUpdates.phoneNumber }
		);
	}

	if (contactUpdates.Address !== undefined) {
		userContactProfile.Address = contactUpdates.Address;
	}

	if (contactUpdates.BirthDay !== undefined) {
		userContactProfile.BirthDay = contactUpdates.BirthDay;
	}

	if (contactUpdates.Website !== undefined) {
		userContactProfile.Website = contactUpdates.Website;
	}
};

// function to save the userProfile to the database
const saveContactProfile = async (userContactProfile) => {
	await userContactProfile.save();
};

module.exports = {
	createContactProfile,
	getMyContactProfile,
	getUserContactProfile,
	updateUserContactProfile,
};
