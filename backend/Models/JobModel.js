const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
	{
		user: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		company: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		skills: {
			type: [String],
			required: true,
		},
		jobType: {
			type: [String],
			required: true,
		},
		employmentType: {
			type: [String],
			required: true,
		},
		requirements: {
			type: [String], // An array of job requirements
			required: true,
		},
		salary: {
			type: Number,
		},
	},
	{ timestamps: true }
);

// Define text indexes on 'title', 'description', 'requirements' and 'skills' fields
jobSchema.index({
	title: "text",
	description: "text",
	requirements: "text",
	skills: "text",
});

module.exports = mongoose.model("Job", jobSchema);
