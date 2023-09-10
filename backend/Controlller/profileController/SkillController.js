const asyncHandler = require("express-async-handler");
const User = require("../../Models/UserModel");
const Skill = require("../../Models/profileModels/SkillProfileModel");

// --------------------------------- function to create a user's skill profile ------------------------- //
const createSkillProfile = asyncHandler(async (req, res) => {
	// check if the user exists in the database
	const userExist = await User.findById(req.user._id);

	// if the user does not exist, then
	if (!userExist) {
		// throw an error
		throw new Error("User not Authorised");
	}

	// if the user exist then
	// get the details of the user's headline, education and the user's location from the request body
	let { skills } = req.body;
	// make a try-catch block
	try {
		// Check and parse jobTitles
		if (skills && typeof skills === "string") {
			skills = JSON.parse(skills);
		} else {
			skills = []; // Default value if it's not a valid JSON string
		}

		// check if the details sent from the frontend is an array
		if (!Array.isArray(skills)) {
			// if any of them is not an array then
			throw new Error("Invalid data type");
		}

		// create the profile data
		const skillsData = {
			user: req.user._id,
			skills,
		};

		// create the profile based on te data provided
		const createdSkillProfile = await Skill.create(skillsData);

		// check if the profie was created
		if (createdSkillProfile) {
			// send it to the frontend
			res.status(201);
			res.json(createdSkillProfile);
		}
	} catch (error) {
		// if there was an error in the try block, then
		res.status(500);
		throw new Error(error.message);
	}
});

// ------------------------------- function skill profile of the current user --------------------------- //
const getMySkillProfile = asyncHandler(async (req, res) => {
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
		// get the skill profile of the current user
		const mySkillProfile = await Skill.find({ user: req.user._id });
		// check if the user has a skill profile
		if (mySkillProfile) {
			// if the user has a skill profile send it to the frontend
			res.status(200);
			res.json(mySkillProfile);
		}
	} catch (error) {
		// if there is an error in the try block, then
		res.status(500);
		throw new Error(error.message);
	}
});

// ------------------------------- function to get skill profile of another user --------------------------- //
const getUserSkillProfile = asyncHandler(async (req, res) => {
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
		const userskillProfile = await Skill.find({
			_id: req.body.profileId,
		});
		// check if the user has a skill profile
		if (userskillProfile) {
			// if the user has a skill profile send it to the frontend
			res.status(200);
			res.json(userskillProfile);
		}
	} catch (error) {
		// if there is an error in the try block, then
		res.status(500);
		throw new Error(error.message);
	}
});

// ------------------------------------ function to update the user's profile intro ----------------------------- //
const updateUserSKillProfile = asyncHandler(async (req, res) => {
	// get the updates object froom the request body
	const { SkillUpdates } = req.body;
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
		// find the user's skill profile
		const userSkillProfile = await Skill.findOne({ user: req.user._id });

		// check if the user's skill profile was found
		if (!userSkillProfile) {
			// if it was not found
			throw new Error("User profile not found");
		}

		// if it was found, then proceed
		// update the user's skill profile found
		await updateSkillProfiile(userSkillProfile, SkillUpdates);

		// save the updated skill profile to the database
		await saveSkillProfile(userSkillProfile);

		// send the updated skill profile to the frontend
		res.status(201);
		res.json(userSkillProfile);
	} catch (error) {
		console.log(error);
		// if there was an error in the try block
		throw new Error(error.message);
	}
});

// function to update the skill profile
const updateSkillProfiile = async (userSkillProfile, SkillUpdates) => {
	if (SkillUpdates.skills !== undefined) {
		userSkillProfile.skills = JSON.parse(SkillUpdates.skills);
	}
};

// function to save the user skill Profile to the database
const saveSkillProfile = async (userSkillProfile) => {
	await userSkillProfile.save();
};

module.exports = {
	createSkillProfile,
	getMySkillProfile,
	getUserSkillProfile,
	updateUserSKillProfile,
};
