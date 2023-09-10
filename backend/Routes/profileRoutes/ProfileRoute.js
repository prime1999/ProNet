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
const {
	createJobProfile,
	getUserJobProfile,
	getMyJobProfile,
	updateJobProfile,
} = require("../../Controlller/profileController/JobProfileController");
const {
	createSkillProfile,
	getMySkillProfile,
	getUserSkillProfile,
	updateUserSKillProfile,
} = require("../../Controlller/profileController/SkillController");

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

// routes for the user's job preference profile
// POST: to create a user job preference profile;
// GET: to get the curent user's job preference profile;
// GET: to get another user's job preference profile
// PATCH: to update a user's job preference profile;

ProfileRoute.get("/getProfile/job", protect, getMyJobProfile);
ProfileRoute.get("/getUserProfile/job", protect, getUserJobProfile);
ProfileRoute.post("/createProfile/job", protect, createJobProfile);
ProfileRoute.patch("/updateProfile/job", protect, updateJobProfile);

// routes for the user's skill profile
// POST: to create a user skill profile;
// GET: to get the curent user's skill profile;
// GET: to get another user's skill profile
// PATCH: to update a user's skill profile;

ProfileRoute.get("/getProfile/skill", protect, getMySkillProfile);
ProfileRoute.get("/getUserProfile/skill", protect, getUserSkillProfile);
ProfileRoute.post("/createProfile/skill", protect, createSkillProfile);
ProfileRoute.patch("/updateProfile/skill", protect, updateUserSKillProfile);

module.exports = ProfileRoute;
