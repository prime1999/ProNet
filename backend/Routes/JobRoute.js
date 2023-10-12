const express = require("express");
const { protect } = require("../middleware/AuthMiddleware");
const {
	postJob,
	recommendJobs,
	getUsersJobPostings,
} = require("../Controlller/JobController");

const jobRoute = express.Router();

// Get: to get all the job postings of a user (getJobs)
// Get: to get job feeds for a user (recommendJobs)
// Post: to create a post (postJob)
// patch: to edit on a job posting (updateJob)
// Delete: to delete a job post (deleteJObPost)

jobRoute.post("/postJob", protect, postJob);
jobRoute.get("/recommendJobs", protect, recommendJobs);
jobRoute.get("/getUsersJobPostings/:userId", protect, getUsersJobPostings);

module.exports = jobRoute;