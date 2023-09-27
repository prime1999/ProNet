const express = require("express");
const { protect } = require("../middleware/AuthMiddleware");
const {
	createPost,
	getPost,
	getPosts,
	deletePost,
	getPostFeed,
} = require("../Controlller/PostController");

const postRoute = express.Router();

// Get: to get the a post from a user (getPost)
// Get: to get all the post of a user (getPosts)
// Get: to get post feeds for a user (getPostFeed)
// Post: to create a post (createPost)
// Delete: to delete a post (deletePost)

postRoute.get("/post/:postId", protect, getPost);
postRoute.get("/getPosts/:authorId", protect, getPosts);
postRoute.get("/getFeed", protect, getPostFeed);
postRoute.post("/createPost", protect, createPost);
postRoute.delete("/deletePost/:postId", protect, deletePost);

module.exports = postRoute;
