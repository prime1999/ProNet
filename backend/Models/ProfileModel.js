const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// ------------------------------------ the contact-info schema starts here ----------------------- //
const ContactInfoSchema = new Schema(
	{
		email: {
			type: String,
		},
		phoneNumber: {
			type: String,
		},
		address: {
			type: String,
		},
		website: {
			type: String,
		},
	},
	{ timestamps: true }
);

// ------------------------------------ the contact-info schema ends here ---------------------------- //

// ---------------------------------------- the location schema starts here ----------------------------- //

const LocationSchema = new Schema(
	{
		Country: {
			type: String,
		},
		City: {
			type: String,
		},
	},
	{ timestamps: true }
);

// ---------------------------------------- the location schema ends here ----------------------------- //

// ---------------------------------------- the profile schema starts here ----------------------------- //

const ProfileSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	backgroundPhoto: {
		type: String,
		default:
			"https://img.freepik.com/free-vector/digital-earth-with-particles-background_1017-31179.jpg?w=900&t=st=1693844717~exp=1693845317~hmac=943c7e0092239d7e29761512fd8502336752edecce6d9ea163ef13ff3c9f7aa9",
	},
	headLine: {
		type: String,
	},
	summary: {
		type: String,
	},
	experience: {
		type: Array,
	},
	education: {
		type: Array,
	},
	skills: {
		type: Array,
	},
	connection: {
		type: Array,
	},
	contactInfo: {
		type: ContactInfoSchema,
		strict: "throw",
	},
	location: {
		type: LocationSchema,
		strict: "throw",
	},
	interest: {
		type: Array,
	},
	openToWork: {
		type: Boolean,
		default: false,
	},
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		},
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
	reference: {
		type: Array,
	},
});

// ------------------------------------------ the profile schema ends here -------------------------------- //

module.exports = mongoose.model("Profile", ProfileSchema);
