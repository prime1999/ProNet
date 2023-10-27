const express = require("express");
const { protect } = require("../middleware/AuthMiddleware");
const { accessChat, getChats } = require("../Controlller/ChatController");

const chatRoute = express.Router();
//GET: ACCESSCHAT, private (one on one chat);
//GET: GETCHATS, private (to get all chats of a user)

chatRoute.post("/accessChat", protect, accessChat);
chatRoute.get("/getChats", protect, getChats);

module.exports = chatRoute;
