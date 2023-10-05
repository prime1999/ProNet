const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const Post = require("../Models/PostModel");
const Comment = require("../Models/CommentModel");

// --------------------------------- funtion to make a comment ------------------------------ //
const createComment = asyncHandler(async (req, res) => {
	const { content, media, postId, parentCommentId } = req.body;

	try {
		// Check if the user exists
		const userExist = await User.findById(req.user._id);
		// if the user does not exist in the DB then throw an error
		if (!userExist) {
			throw new Error("User Not Authorized");
		}

		// Check if the content or media and postId were sent from the frontend
		if (!content && !media) {
			throw new Error("Invalid data");
		}

		// Create the data to use to create a comment
		const commentData = {
			author: req.user._id,
			content,
			media: media ? media : "",
		};

		// If a parentCommentId is provided, it means this is a reply
		if (parentCommentId) {
			const replyData = { ...commentData, parentId: parentCommentId };
			// Find the parent comment
			const parentComment = await Comment.findById(parentCommentId);
			// check if the parent comment was found
			if (!parentComment) {
				// if it was not then trow an error
				throw new Error("Parent comment not found");
			}
			// Create the reply comment
			const replyComment = await Comment.create(replyData);

			// Add the reply to the parent comment's replies array
			parentComment.replies.push(replyComment._id);

			// Save the parent comment to update the replies array
			await parentComment.save();
			// send the reply to the frontend
			res.status(201).json(replyComment);
		} else {
			// If there is no parentCommentId, it's a top-level comment
			commentData.post = postId; // Set the post property for top-level comments
			// If there is no parentCommentId, it's a top-level comment
			const createdComment = await Comment.create(commentData);
			// Update the comments array of the post to include the new comment
			await Post.findByIdAndUpdate(
				postId,
				{
					$push: { comments: createdComment._id },
				},
				{
					new: true,
				}
			);

			res.status(201).json(createdComment);
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// --------------------------------------- function to get comments on a post -------------------------- //
const getComments = asyncHandler(async (req, res) => {
	// check if the user exist
	const userExist = await User.findById(req.user._id);
	// if the user does not exist then
	if (!userExist) {
		throw new Error("User Not Authorised");
	}
	const { postId } = req.params;

	// make a try-block
	try {
		// finct the comments for the post from the DB
		let postComments = await Comment.find({ post: postId })
			// populate the replies property with the details the frontend will need
			.populate({
				path: "replies",
				select: "author content likes replies media ",
			});
		// further populate the author with the user details except the password and email
		postComments = await User.populate(postComments, {
			path: "replies.author",
			select: "firstName lastName pic",
		});

		// if any comments was found
		if (postComments) {
			// send it to the frontend with the status code of 400
			res.status(200);
			res.json(postComments);
		}
	} catch (error) {
		// if an error occured in the try block, then
		res.status(400);
		// throw the error message
		throw new Error(error.message);
	}
});

module.exports = { createComment, getComments };
