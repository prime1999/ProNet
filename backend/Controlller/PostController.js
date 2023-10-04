const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const Post = require("../Models/PostModel");
const IntroSchema = require("../Models/profileModels/IntroModel");
const Comment = require("../Models/CommentModel");

// ----------------------------------- function to create a post ----------------------------------- //
const createPost = asyncHandler(async (req, res) => {
	const { content, media } = req.body;

	// check if the user exist
	const userExist = await User.findById(req.user._id);
	// if the user does not exist then
	if (!userExist) {
		throw new Error("User Not Authorised");
	}

	// but if the user exist, then proceed

	// check if the content was sent from the frontend
	if (!content && !media) {
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
			media: JSON.parse(media),
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
const getPost = asyncHandler(async (req, res) => {
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
			.populate("likes", "-password")
			.populate("comments");

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
const getPosts = asyncHandler(async (req, res) => {
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
			.populate("comments")
			.populate("likes", "-password")
			.populate({
				path: "author",
				select: "firstName lastName pic email",
			});

		// // fiil the user details of the comment ection
		posts = await User.populate(posts, {
			path: "comments.author",
			select: "firstName lastName pic email",
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

// --------------------------------- function to get posts for a user's feed ------------------------- //
const getPostFeed = asyncHandler(async (req, res) => {
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
		// find the profile of the current user
		let userProfile = await IntroSchema.find({ user: req.user._id });
		// check if the user's profile exist
		if (!userProfile) {
			// if it doesn't then, throw an error
			throw new Error("User not Authorised");
		}
		// find the posts to send to the user's feed based on the user's:
		let feeds = await Post.find(
			{
				$text: {
					// headLine and skills by search for the keywords in the headlIne and skills write ups
					$search: `${userProfile.headLine} ${userProfile[0].skills.join(" ")}`, // Concatenate and search user's "headLine" and skills
				},
			},
			// show the posts in order of there score(how musch they match the user's profile)
			{ score: { $meta: "textScore" } }
		);

		// init an empty array and store it in a variable
		const postFeeds = [];
		// loop through the gotten feeds using the for of loop
		for (const feed of feeds) {
			// make a try-catch block
			try {
				// get the profile of each feed author(post creator)
				const feedProfile = await IntroSchema.find({
					// by checking the user field is equal to the author's id in a string format
					user: feed.author.toString(),
				});
				// init a feedPosts variable
				let feedPosts = null;
				// check if a profile for the author of the current feed author was found
				if (feedProfile.length > 0) {
					// if it was then add the headLine from the profile to the feeds and store it in a variable
					//const postFeed = { ...feed, headLine: feedProfile[0].headLine };
					// then store the _doc and the headLine in the feedPosts variable initialized earlier
					feedPosts = {
						details: feed,
						name: `${feedProfile[0].firstName} ${feedProfile[0].lastName}`,
						pic: feedProfile[0].pic,
						headLine: feedProfile[0].headLine,
					};
					// if the user's profie was not found then,
				} else {
					// store the current feed and a headLine of an empty string in the feedPosts variable
					feedPosts = {
						details: feed,
						name: "App Tester",
						pic: "",
						headLine: "Software Developer",
					};
				}
				// add each feedPosts to the postFeeds array
				postFeeds.push(feedPosts);
			} catch (error) {
				// if an error occursed
				throw new Error(error.message);
			}
		}

		// return the feeds with the status code of 200
		res.status(200);
		// if the feeds exist i.e there is a post that matches the user's profie, then
		if (postFeeds != []) {
			// send the feeds to the frontend
			res.json(postFeeds);
			// but there is not a post that matches the user's profile then
		}
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

// ---------------------------- function to delete a user's post --------------------------------- //
const deletePost = asyncHandler(async (req, res) => {
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

module.exports = { createPost, getPost, getPosts, getPostFeed, deletePost };
