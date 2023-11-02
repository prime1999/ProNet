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
	const userExist = await User.findById(req.user._id);

	if (!userExist) {
		throw new Error("User Not Authorised");
	}

	try {
		let userProfile = await IntroSchema.find({ user: req.user._id });

		if (!userProfile) {
			throw new Error("User not Authorised");
		}

		let feeds = await Post.find(
			{
				$text: {
					$search: `${userProfile.headLine} ${userProfile[0].skills.join(" ")}`,
				},
			},
			{ score: { $meta: "textScore" } }
		);

		// Sort the feeds based on a unique identifier, e.g., a timestamp or an incrementing ID
		feeds = feeds.sort((a, b) => a.timestamp - b.timestamp);

		const postFeeds = [];

		for (const feed of feeds) {
			try {
				const feedProfile = await IntroSchema.find({
					user: feed.author.toString(),
				});

				let feedPosts = null;

				if (feedProfile.length > 0) {
					feedPosts = {
						details: feed,
						name: `${feedProfile[0].firstName} ${feedProfile[0].lastName}`,
						pic: feedProfile[0].pic,
						headLine: feedProfile[0].headLine,
					};
				} else {
					feedPosts = {
						details: feed,
						name: "App Tester",
						pic: "",
						headLine: "Software Developer",
					};
				}

				postFeeds.push(feedPosts);
			} catch (error) {
				throw new Error(error.message);
			}
		}

		res.status(200);
		if (postFeeds.length > 0) {
			res.json(postFeeds);
		}
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

// --------------------------------- function to like or unlike a post ------------------------------ //
const reactToAPost = asyncHandler(async (req, res) => {
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
		// the details from the request body
		const { postId } = req.body;
		// find the post based on the post Id
		const post = await Post.findById(postId);
		// check if the post was found
		if (!post) {
			// if it was not found, then
			throw new Error("Post not found");
		}
		// if it was
		// check it the user has already reacted to the post
		const hasReacted = post.likes.includes(req.user._id);
		// if user has reacted to the post then,
		if (hasReacted) {
			// make the user unLike the post
			let unLike = await Post.findByIdAndUpdate(
				postId,
				// then update the likes array to pull the user to be removed from the array
				{
					$pull: { likes: req.user._id },
				},
				// set new to true for it to work
				{ new: true }
			);

			res.status(200);
			res.json(unLike);
		} else {
			// if user is yet to react to the post
			let like = await Post.findByIdAndUpdate(
				postId,
				// then update the likes array to push the user to be added from the array
				{
					$push: { likes: req.user._id },
				},
				// set new to true for it to work
				{ new: true }
			);
			res.status(200);
			res.json(like);
		}
	} catch (error) {
		// if an error occured in the try block, then
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

module.exports = {
	createPost,
	getPost,
	getPosts,
	getPostFeed,
	reactToAPost,
	deletePost,
};
