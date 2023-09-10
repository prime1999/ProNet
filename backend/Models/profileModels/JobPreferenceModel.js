const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobPrefernceSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	jobTitles: [{ type: String }],
	jobTypes: [{ type: String }],
	jobLocations: [{ type: String }],
	locationTypes: [{ type: String }],
	employmentTypes: [{ type: String }],
});

// Set default values for specific fields
JobPrefernceSchema.defaults = {
	jobTitles: ["Software Engineer"],
	jobTypes: ["Full-time"],
	jobLocations: ["Remote"],
	locationTypes: ["Remote"],
	employmentTypes: ["Full-time"],
};

module.exports = mongoose.model("JobPreference", JobPrefernceSchema);
