const express = require("express");
const { protect } = require("../../middleware/AuthMiddleware");
const {
	createProfileIntro,
	getMyProfileIntro,
	getUserProfileIntro,
	updateUserProfileIntro,
} = require("../../Controlller/profileController/ProfileIntroController");

const ProfileIntroRoute = express.Router();

// POST: to create a user profile intro;
// GET: to get the curent user's profile;
// GET: to get another user's profile
// PATCH: to update a user's profile;

ProfileIntroRoute.get("/getProfile/intro", protect, getMyProfileIntro);
ProfileIntroRoute.get("/getUserProfile/intro", protect, getUserProfileIntro);
ProfileIntroRoute.post("/createProfile/intro", protect, createProfileIntro);
ProfileIntroRoute.patch(
	"/updateProfile/intro",
	protect,
	updateUserProfileIntro
);

module.exports = ProfileIntroRoute;
