const express = require("express");
const { protect } = require("../middleware/AuthMiddleware");
const {
	createProfile,
	getMyProfile,
	getUserProfile,
	updateUserProfile,
} = require("../Controlller/ProfileController");

const ProfileRoute = express.Router();

// POST: to create a user profile;
// GET: to get the curent user's profile;
// GET: to get another user's profile
// PATCH: to update a user's profile;

ProfileRoute.get("/getProfile", protect, getMyProfile);
ProfileRoute.get("/getUserProfile", protect, getUserProfile);
ProfileRoute.post("/createProfile/intro", protect, createProfile);
ProfileRoute.patch("/updateProfile", protect, updateUserProfile);

module.exports = ProfileRoute;
