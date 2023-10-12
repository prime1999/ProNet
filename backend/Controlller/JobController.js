const asyncHandler = require("express-async-handler");
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
		const { title, company, location, description, requirements, salary } =
			req.body;
		// create the new job posting data
		const newJob = new Job({
			user: req.user._id,
			title,
			company,
			location,
			description,
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

module.exports = { postJob };
