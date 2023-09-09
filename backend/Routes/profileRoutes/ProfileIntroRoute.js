const express = require("express");
const { protect } = require("../../middleware/AuthMiddleware");
const {
	createProfileIntro,
} = require("../../Controlller/profileController/ProfileIntroController");

const ProfileIntroRoute = express.Router();

// POST: to create a user profile intro;
// GET: to get the curent user's profile;
// GET: to get another user's profile
// PATCH: to update a user's profile;

// ProfileRoute.get("/getProfile", protect, getMyProfile);
// ProfileRoute.get("/getUserProfile", protect, getUserProfile);
ProfileIntroRoute.post("/createProfileIntro", protect, createProfileIntro);
// ProfileRoute.patch("/updateProfile", protect, updateUserProfile);

module.exports = ProfileIntroRoute;
