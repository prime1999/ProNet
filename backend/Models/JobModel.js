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

module.exports = mongoose.model("Job", jobSchema);
