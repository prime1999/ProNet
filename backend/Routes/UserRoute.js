const express = require("express");
const { registerUser, logUserIn } = require("../Controlller/UserController");

const UserRoute = express.Router();

UserRoute.post("/", registerUser);
UserRoute.post("/login", logUserIn);

module.exports = UserRoute;
