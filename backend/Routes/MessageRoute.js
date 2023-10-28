const express = require("express");
const { protect } = require("../middleware/AuthMiddleware");
const {
	sendMessage,
	allMessages,
} = require("../Controlller/MessageController");

const messageRoute = express.Router();
//POST: sendMessage, private (send message to chat);
//GET: allMessage, private (to get all the messages og a chat)

messageRoute.post("/sendMessage", protect, sendMessage);
messageRoute.get("/getMessages/:chatId", protect, allMessages);

module.exports = messageRoute;
