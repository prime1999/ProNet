const express = require("express");
const { protect } = require("../middleware/AuthMiddleware");
const {
	postJob,
	recommendJobs,
	getUsersJobPostings,
	getCurrentUserJobPostings,
	deleteJobPosting,
	updateJobPosting,
} = require("../Controlller/JobController");

const jobRoute = express.Router();

// Get: to get all the job postings of a user (getUsersJobsPostings)
// Get: to get all the job postings of the current user (getCuurentUserJobsPostings)
// Get: to get job feeds for a user (recommendJobs)
// Post: to create a post (postJob)
// patch: to edit on a job posting (updateJobPosting)
// Delete: to delete a job post (deleteJobPost)

jobRoute.post("/postJob", protect, postJob);
jobRoute.get("/recommendJobs", protect, recommendJobs);
jobRoute.get("/getUsersJobPostings/:userId", protect, getUsersJobPostings);
jobRoute.get("/getUserJobPostings", protect, getCurrentUserJobPostings);
jobRoute.patch("/updateJobPosting/:jobId", protect, updateJobPosting);
jobRoute.delete("/deleteJobPosting/:jobId", protect, deleteJobPosting);

module.exports = jobRoute;
