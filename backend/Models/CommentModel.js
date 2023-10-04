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
		required: true,
	},
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
