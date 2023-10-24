const express = require("express");
const { protect } = require("../middleware/AuthMiddleware");
const {
	postJob,
	recommendJobs,
	getUsersJobPostings,
	getCurrentUserJobPostings,
	deleteJobPosting,
	updateJobPosting,
	searchJobPosting,
} = require("../Controlller/JobController");

const jobRoute = express.Router();

// Get: to get all the job postings of a user (getUsersJobsPostings)
// Get: to get all the job postings of the current user (getCurentUserJobsPostings)
// Get: to get job feeds for a user (recommendJobs)
// Get: search for job posting based on a keyword (searchJobPosting)
// Post: to create a post (postJob)
// patch: to edit on a job posting (updateJobPosting)
// Delete: to delete a job post (deleteJobPost)

jobRoute.post("/postJob", protect, postJob);
jobRoute.get("/recommendJobs", protect, recommendJobs);
jobRoute.get("/getUsersJobPostings/:userId", protect, getUsersJobPostings);
jobRoute.get("/getUserJobPostings", protect, getCurrentUserJobPostings);
jobRoute.get("/searchJobs", protect, searchJobPosting);
jobRoute.patch("/updateJobPosting/:jobId", protect, updateJobPosting);
jobRoute.delete("/deleteJobPosting/:jobId", protect, deleteJobPosting);

module.exports = jobRoute;
