const express = require("express");
const { protect } = require("../middleware/AuthMiddleware");
const { createComment } = require("../Controlller/CommentController");

const commentRoute = express.Router();

// Get: to get the comments from a post (getComments)
// Post: to create a post (createComment)
// Delete: to delete a Comment (deleteComment)

// commentRoute.get("/getComments", protect, getcomments);
commentRoute.post("/createComment", protect, createComment);
// commentRoute.delete("/deleteComment/:commentId", protect, deleteComment);

module.exports = commentRoute;
