const asyncHander = require("express-async-handler");
const User = require("../Models/UserModel");
const Post = require("../Models/PostModel");
const Comment = require("../Models/CommentModel");

// ----------------------------------- function to create a post ----------------------------------- //
const createPost = asyncHander(async (req, res) => {
	const { content, media } = req.body;

	// check if the user exist
	const userExist = await User.findById(req.user._id);
	// if the user does not exist then
	if (!userExist) {
		throw new Error("User Not Authorised");
	}

	// but if the user exist, then proceed

	// check if the content was sent from the frontend
	if (!content) {
		// if it was not sent
		throw new Error("Invalid post data");
	}

	// if it was sent, then proceed
	// make a try-catch block
	try {
		// create the data to use to create a post
		const postData = {
			author: req.user._id,
			content,
			media,
		};

		// create the post
		const createdPost = await Post.create(postData);
		// check if the post was created
		if (createdPost) {
			// if it was created, then
			res.json(201);
			res.json(createdPost);
		} else {
			// if it was not created, then
			res.send("post upload failed");
		}
	} catch (error) {
		// if there was an error in the try block, then
		res.json(500);
		throw new Error(error);
	}
});

// ---------------------------- function to get a post --------------------------------- //
const getPost = asyncHander(async (req, res) => {
	// get the user exist
	const userExist = await User.findById(req.user._id);
	// check if the user exist
	if (!userExist) {
		// if the user doesn't exist
		throw new Error("User Not Authorised");
	}
	// if the user exist, then
	// make a try-catch block
	try {
		// find the post based of its id in the request params
		let post = await Post.findById(req.params.postId)
			// fill the likes array with the users that liked the post
			.populate("likes", "-password");

		// fiil the user details of the comment ection
		post = await User.populate(post, {
			path: "comments.author",
			select: "name, pic, email",
		});
		// if the post was found then send it to the frontend
		if (post) {
			res.status(201);
			res.json(post);
		}
	} catch (error) {
		// if there was an error in the try block then
		res.status(500);
		throw new Error(error.message);
	}
});

// ---------------------------- function to get all of a user's post --------------------------------- //
const getPosts = asyncHander(async (req, res) => {
	// get the user exist
	const userExist = await User.findById(req.user._id);
	// check if the user exist
	if (!userExist) {
		// if the user doesn't exist
		throw new Error("User Not Authorised");
	}
	// if the user exist, then
	// make a try-catch block
	try {
		// find the post based of its id in the request params
		let posts = await Post.find({ author: req.params.authorId })
			// fill the likes array with the users that liked the posts
			.populate("likes", "-password");

		// fiil the user details of the comment ection
		posts = await User.populate(posts, {
			path: "comments.author",
			select: "name, pic, email",
		});
		// if the posts was found then send it to the frontend
		if (posts) {
			res.status(201);
			res.json(posts);
		}
	} catch (error) {
		// if there was an error in the try block then
		res.status(500);
		throw new Error(error.message);
	}
});

// ---------------------------- function to delete a user's post --------------------------------- //
const deletePost = asyncHander(async (req, res) => {
	// get the user exist
	const userExist = await User.findById(req.user._id);
	// check if the user exist
	if (!userExist) {
		// if the user doesn't exist
		throw new Error("User Not Authorised");
	}
	// if the user exist, then
	// make a try-catch block
	try {
		// find the post based of its id in the request params
		let post = await Post.findOneAndDelete({
			_id: req.params.postId,
			author: req.user._id,
		});
		// send the deleted post
		res.status(201);
		res.json(post);
	} catch (error) {
		// if there was an error in the try block then
		res.status(500);
		throw new Error(error.message);
	}
});

module.exports = { createPost, getPost, getPosts, deletePost };
