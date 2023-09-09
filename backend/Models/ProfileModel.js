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

// ---------------------------------------- the profile schema starts here ----------------------------- //

const ProfileSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	backgroundPhoto: {
		type: String,
		default:
			"https://img.freepik.com/free-vector/3d-earth-graphic-symbolizing-global-trade-illustration_456031-131.jpg?w=826&t=st=1694248755~exp=1694249355~hmac=4e4ff0c40603f49763f2c4dc3d5b78664aa2de39464ad31532a620cd78055a07",
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
