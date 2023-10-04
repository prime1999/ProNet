const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const Post = require("../Models/PostModel");
const Comment = require("../Models/CommentModel");

// --------------------------------- funtion to make a comment ------------------------------ //
const createComment = asyncHandler(async (req, res) => {
	const { content, media, postId } = req.body;
	// check if the user exist
	const userExist = await User.findById(req.user._id);
	// if the user does not exist then
	if (!userExist) {
		throw new Error("User Not Authorised");
	}

	// but if the user exist, then proceed
	// check if the content or media and the is of the post was sent from the frontend
	if ((!content || !media) && !postId) {
		// if it was not sent
		throw new Error("Invalid data");
	}

	// if it was sent, then proceed
	// make a try-catch block
	try {
		// create the data to use to create a comment
		const commentData = {
			author: req.user._id,
			content,
			media,
			post: postId,
		};

		const createdComment = await Comment.create(commentData);

		await Post.findByIdAndUpdate(
			req.body.postId,
			// then update the comments array to push the new comment to be added to the array
			{
				$push: { comments: createdComment._id },
			},
			// set new to true for it to work
			{
				new: true,
			}
		);

		// check if the comment was created
		if (createdComment) {
			// if it was created, then
			res.status(201);
			res.json(createdComment);
		} else {
			// if it was not created, then
			throw new Error("post upload failed");
		}
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

module.exports = { createComment };
