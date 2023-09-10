const express = require("express");
const { protect } = require("../../middleware/AuthMiddleware");
const {
	createProfileIntro,
	getMyProfileIntro,
	getUserProfileIntro,
	updateUserProfileIntro,
} = require("../../Controlller/profileController/ProfileIntroController");
const {
	createContactProfile,
	getMyContactProfile,
	getUserContactProfile,
	updateUserContactProfile,
} = require("../../Controlller/profileController/COntactInfoController");

const ProfileRoute = express.Router();

// routes for the user's profile intro
// POST: to create a user profile intro;
// GET: to get the curent user's profile;
// GET: to get another user's profile
// PATCH: to update a user's profile;

ProfileRoute.get("/getProfile/intro", protect, getMyProfileIntro);
ProfileRoute.get("/getUserProfile/intro", protect, getUserProfileIntro);
ProfileRoute.post("/createProfile/intro", protect, createProfileIntro);
ProfileRoute.patch("/updateProfile/intro", protect, updateUserProfileIntro);

// routes for the user's contact info profile
// POST: to create a user contact profile;
// GET: to get the curent user's contact profile;
// GET: to get another user's contact profile
// PATCH: to update a user's contact profile;

ProfileRoute.get("/getProfile/contact", protect, getMyContactProfile);
ProfileRoute.get("/getUserProfile/contact", protect, getUserContactProfile);
ProfileRoute.post("/createProfile/contact", protect, createContactProfile);
ProfileRoute.patch("/updateProfile/contact", protect, updateUserContactProfile);

module.exports = ProfileRoute;
