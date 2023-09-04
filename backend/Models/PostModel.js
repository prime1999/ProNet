const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment", // Reference to the Comment model
		},
	],
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Assuming you want to track users who liked the post
		},
	],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
