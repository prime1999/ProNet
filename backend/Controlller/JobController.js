const asyncHandler = require("express-async-handler");
const IntroSchema = require("../Models/profileModels/IntroModel");
const User = require("../Models/UserModel");
const Job = require("../Models/JobModel");

// ---------------------------------------- function to post a job ---------------------------------- //
const postJob = asyncHandler(async (req, res) => {
	// check if the user posting the job is authorised
	const userExist = await User.findById(req.user._id);

	// if the user is not authorised, then
	if (!userExist) {
		throw new Error("user not authorised");
	}
	// if the user is authorised,then
	// make a try-catch block
	try {
		// get the job details from the request body
		const {
			title,
			company,
			location,
			description,
			skills,
			requirements,
			salary,
		} = req.body;
		// create the new job posting data
		const newJob = new Job({
			user: req.user._id,
			title,
			company,
			location,
			description,
			skills,
			requirements,
			salary,
		});

		// create the new job posting
		const job = await Job.create(newJob);
		// if the job was not created, then
		if (!job) {
			// trow an error
			throw new Error("Job not posted");
		}
		// if the job was created then,
		res.status(201).json(job);
	} catch (error) {
		// catch any error that occured in the try block
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------------- function to get jobs based on the user's profile --------------------- //
const recommendJobs = asyncHandler(async (req, res) => {
	// get the user exist
	const userExist = await User.findById(req.user._id);
	// check if the user exist
	if (!userExist) {
		// if the user doesn't exist
		throw new Error("User Not Authorised");
	}

	// if user exist
	// make a try-block
	try {
		// find the profile of the current user
		let userProfile = await IntroSchema.find({ user: req.user._id });
		// check if the user's profile exist
		if (!userProfile) {
			// if it doesn't then, throw an error
			throw new Error("User not Authorised");
		}
		// recommend jobs for users based on there profile
		let jobs = await Job.find(
			{
				$text: {
					// headLine and skills by search for the keywords in the headlIne and skills write ups
					$search: `${userProfile.headLine} ${userProfile[0].skills.join(" ")}`, // Concatenate and search user's "headLine" and skills
				},
			},
			// show the jobs in order of there score(how much they match the user's profile)
			{ score: { $meta: "textScore" } }
		);
		res.status(200).json(jobs);
	} catch (error) {
		// if an error occured in the try block, then throw an error
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------------------ function to get all job postings of a user ---------------------- //
const getUsersJobPostings = asyncHandler(async (req, res) => {
	// get the user exist
	const userExist = await User.findById(req.user._id);
	// check if the user exist
	if (!userExist) {
		// if the user doesn't exist
		throw new Error("User Not Authorised");
	}
	// if user exist
	// make a try-block

	try {
		// find the jobs based on your user's id
		const jobs = await Job.find({ user: req.params.userId });
		if (jobs) {
			res.status(200).json(jobs);
		} else {
			throw new Error("No jobs postings by this user");
		}
	} catch (error) {
		// if an error ocurred in the try block then,
		res.status(400);
		throw new Error(error.message);
	}
});

// -------------------------------- function to get the current user's job postings --------------------------- //
const getCurrentUserJobPostings = asyncHandler(async (req, res) => {
	// get the user exist
	const userExist = await User.findById(req.user._id);
	// check if the user exist
	if (!userExist) {
		// if the user doesn't exist
		throw new Error("User Not Authorised");
	}
	// if user exist
	// make a try-block

	try {
		// get the current user's job postings using the user's id
		const jobs = await Job.find({ user: req.user._id });
		if (jobs) {
			res.status(200).json(jobs);
		} else {
			throw new Error("No Job Postings by User");
		}
	} catch (error) {
		// if an error ocurred in the try block then,
		res.status(400);
		throw new Error(error.message);
	}
});

// -------------------------------- function to delete a job posting ------------------------------ //
const deleteJobPosting = asyncHandler(async (req, res) => {
	// get the user exist
	const userExist = await User.findById(req.user._id);
	// check if the user exist
	if (!userExist) {
		// if the user doesn't exist
		throw new Error("User Not Authorised");
	}
	// if user exist
	// make a try-block

	try {
		// check if the user is the creator of the job posting
		const checkJob = await Job.findOne({
			_id: req.params.jobId,
			user: req.user._id.toString(),
		});
		if (checkJob) {
			const deleteJob = await Job.findByIdAndDelete(req.params.jobId);
			res.status(200).json(deleteJob);
		} else {
			// throw error if the user is not the creator of the job posting
			throw new Error("User not Authorised");
		}
	} catch (error) {
		// if an error ocurred in the try block then,
		res.status(400);
		throw new Error(error.message);
	}
});

// -------------------------------------- function to update a job posting ---------------------------- //
const updateJobPosting = asyncHandler(async (req, res) => {
	// get the user exist
	const userExist = await User.findById(req.user._id);
	// check if the user exist
	if (!userExist) {
		// if the user doesn't exist
		throw new Error("User Not Authorised");
	}
	// if user exist
	// make a try-block
	try {
		// check if the user is the creator of the job posting
		const checkJob = await Job.findOne({
			_id: req.params.jobId,
			user: req.user._id.toString(),
		});
		if (checkJob) {
			const updateJob = await Job.findOneAndUpdate(
				{ _id: req.params.jobId },
				{ ...req.body }
			);
			res.status(200).json(updateJob);
		} else {
			// throw error if the user is not the creator of the job posting
			throw new Error("User not Authorised");
		}
	} catch (error) {
		// if an error ocurred in the try block then,
		res.status(400);
		throw new Error(error.message);
	}
});

module.exports = {
	postJob,
	recommendJobs,
	getUsersJobPostings,
	getCurrentUserJobPostings,
	deleteJobPosting,
	updateJobPosting,
};
