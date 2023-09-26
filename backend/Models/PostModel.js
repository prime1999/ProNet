const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Assuming you have a User model
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		media: {
			type: String, // You can use a String to store the URL of the uploaded media
		},
		tags: [
			{
				type: String,
			},
		],
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
	},
	{ timestamps: true }
);

// Define text indexes on 'content' and 'tags' fields
postSchema.index({ content: "text", tags: "text" });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
