const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
	},
	backgroundPhoto: {
		type: String,
		default:
			"https://img.freepik.com/free-vector/digital-earth-with-particles-background_1017-31179.jpg?w=900&t=st=1693844717~exp=1693845317~hmac=943c7e0092239d7e29761512fd8502336752edecce6d9ea163ef13ff3c9f7aa9",
	},
	profilePhoto: {
		type: String,
		default:
			"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
	},
	headLine: {
		type: String,
		required: true,
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
		type: Array,
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
			ref: Post,
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

module.exports = mongoose.model("Profile", ProfileSchema);
