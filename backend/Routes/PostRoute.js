const express = require("express");
const { protect } = require("../middleware/AuthMiddleware");
const {
	createPost,
	getPost,
	getPosts,
	deletePost,
} = require("../Controlller/PostController");

const postRoute = express.Router();

// Get: to get the a post from a user (getPost)
// Get: to get all the post of a user (getPosts)
// Post: to create a post (createPost)
// D elete: to delete a post (deletePost)

postRoute.get("/post/:postId", protect, getPost);
postRoute.get("/getPosts/:authorId", protect, getPosts);
postRoute.post("/createPost", protect, createPost);
postRoute.delete("/deletePost/:postId", protect, deletePost);

module.exports = postRoute;
