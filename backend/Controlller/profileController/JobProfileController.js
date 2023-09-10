const asyncHandler = require("express-async-handler");
const User = require("../../Models/UserModel");
const JobPreference = require("../../Models/profileModels/JobPreferenceModel");

// --------------------------------- function to create a user's job profile ------------------------- //
const createJobProfile = asyncHandler(async (req, res) => {
	// check if the user exists in the database
	const userExist = await User.findById(req.user._id);

	// if the user does not exist, then
	if (!userExist) {
		// throw an error
		throw new Error("User not Authorised");
	}

	// if the user exist then
	// get the details of the user's headline, education and the user's location from the request body
	let { jobTitles, jobTypes, jobLocations, locationTypes, employmentTypes } =
		req.body;
	// Check and parse jobTitles

	if (jobTitles && typeof jobTitles === "string") {
		jobTitles = JSON.parse(jobTitles);
	} else {
		jobTitles = []; // Default value if it's not a valid JSON string
	}

	if (jobLocations && typeof jobLocations === "string") {
		jobLocations = JSON.parse(jobLocations);
	}

	if (jobTypes && typeof jobTypes === "string") {
		jobTypes = JSON.parse(jobTypes);
	} else {
		jobTypes = []; // Default value if it's not a valid JSON string
	}

	if (locationTypes && typeof locationTypes === "string") {
		locationTypes = JSON.parse(locationTypes);
	} else {
		locationTypes = []; // Default value if it's not a valid JSON string
	}

	if (employmentTypes && typeof employmentTypes === "string") {
		employmentTypes = JSON.parse(employmentTypes);
	} else {
		employmentTypes = []; // Default value if it's not a valid JSON string
	}

	// check if the details sent from the frontend is an array
	if (
		!Array.isArray(jobTitles) ||
		!Array.isArray(jobTypes) ||
		!Array.isArray(jobLocations) ||
		!Array.isArray(locationTypes) ||
		!Array.isArray(employmentTypes)
	) {
		// if any of them is not an array then
		throw new Error("Invalid data type");
	}

	// but if they are all arrays then proceed
	// make a try-catch block
	try {
		// create the profile data
		const jobProfileData = {
			user: req.user._id,
			jobTitles,
			jobTypes,
			jobLocations,
			locationTypes,
			employmentTypes,
		};

		// create the job profile based on te data provided
		const createdJobProfile = await JobPreference.create(jobProfileData);

		// check if the job profie was created
		if (createdJobProfile) {
			// send it to the frontend
			res.status(201);
			res.json(createdJobProfile);
		}
	} catch (error) {
		console.log(error);
		// if there was an error in the try block, then
		res.status(500);
		throw new Error(error.message);
	}
});

// ------------------------------- function job profile of the current user --------------------------- //
const getMyJobProfile = asyncHandler(async (req, res) => {
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
		// get the job profile of the current user
		const myJobProfile = await JobPreference.find({ user: req.user._id });
		// check if the user has a job profile
		if (myJobProfile) {
			// if the user has a job profile send it to the frontend
			res.status(200);
			res.json(myJobProfile);
		}
	} catch (error) {
		// if there is an error in the try block, then
		res.status(500);
		throw new Error(error.message);
	}
});

// ------------------------------- function job profile of another user --------------------------- //
const getUserJobProfile = asyncHandler(async (req, res) => {
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
		// get the job profile of the another user
		const userJobProfile = await JobPreference.find({
			_id: req.body.profileId,
		});
		// check if the user has a job profile
		if (userJobProfile) {
			// if the user has a job profile send it to the frontend
			res.status(200);
			res.json(userJobProfile);
		}
	} catch (error) {
		// if there is an error in the try block, then
		res.status(500);
		throw new Error(error.message);
	}
});

// ------------------------------------ function to update the user's job profile ----------------------------- //
const updateJobProfile = asyncHandler(async (req, res) => {
	// get the updates object froom the request body
	const { jobUpdates } = req.body;
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
		// find the user's job profile
		const userJobProfile = await JobPreference.findOne({ user: req.user._id });

		// check if the user's job profile was found
		if (!userJobProfile) {
			// if it was not found
			throw new Error("User profile not found");
		}

		// if it was found, then proceed
		// update the user's job profile found
		await updateJobInfo(userJobProfile, jobUpdates);

		// save the updated job profile to the database
		await saveJobProfile(userJobProfile);

		// send the updated job profile to the frontend
		res.status(201);
		res.json(userJobProfile);
	} catch (error) {
		// if there was an error in the try block
		throw new Error(error.message);
	}
});

// function to update the job profile
const updateJobInfo = async (userJobProfile, jobUpdates) => {
	if (jobUpdates.jobTitles) {
		userJobProfile.jobTitles = JSON.parse(jobUpdates.jobTitles);
	}

	if (jobUpdates.jobTypes) {
		userJobProfile.jobTypes = JSON.parse(jobUpdates.jobTypes);
	}

	if (jobUpdates.jobLocations) {
		userJobProfile.jobLocations = JSON.parse(jobUpdates.jobLocations);
	}

	if (jobUpdates.locationTypes) {
		userJobProfile.locationTypes = JSON.parse(jobUpdates.locationTypes);
	}

	if (jobUpdates.employmentTypes) {
		userJobProfile.employmentTypes = JSON.parse(jobUpdates.employmentTypes);
	}
};

// function to save the user job Profile to the database
const saveJobProfile = async (userJobProfile) => {
	await userJobProfile.save();
};

module.exports = {
	createJobProfile,
	getUserJobProfile,
	getMyJobProfile,
	updateJobProfile,
};
