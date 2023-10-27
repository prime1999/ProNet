const express = require("express");
const {
	registerUser,
	logUserIn,
	updateUser,
	getPeopleWithSameInterest,
	searchUsers,
} = require("../Controlller/UserController");
const { protect } = require("../middleware/AuthMiddleware");

const UserRoute = express.Router();

UserRoute.get("/getPeople", protect, getPeopleWithSameInterest);
UserRoute.post("/searchUsers", protect, searchUsers);
UserRoute.post("/", registerUser);
UserRoute.post("/login", logUserIn);
UserRoute.patch("/updateDetails", protect, updateUser);

module.exports = UserRoute;
