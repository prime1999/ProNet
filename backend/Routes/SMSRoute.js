const express = require("express");
const { sendCode, verifyCode } = require("../Controlller/SmsController");

const route = express.Router();

route.post("/sendCode", sendCode);
route.post("/verifyCode", verifyCode);

module.exports = route;
