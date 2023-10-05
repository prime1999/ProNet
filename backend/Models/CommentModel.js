const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User", // Assuming you have a User model
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	media: {
		type: String,
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post", // Reference to the Post model
	},
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Reference to the User model for liking users
		},
	],
	replies: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment", // Reference to the Comment model for nested comments
		},
	], // Array of nested comments (replies)
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
