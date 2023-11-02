const asyncHandler = require("express-async-handler");
const Chat = require("../Models/ChatModel");
const User = require("../Models/UserModel");
const Message = require("../Models/MessageModel");
const Notification = require("../Models/NotificationModel");

// ------------------------------- function to send notification ----------------------------------------------- //
const sendNotification = asyncHandler(async (req, res) => {
	const userExist = await User.findById(req.user._id);

	// check if the user does not exist
	if (!userExist) {
		throw new Error("User not authorized");
	}
	// if the user exist, then
	// make a try-catch block
	try {
		// get the notification info from the frontend
		const { message, chatId } = req.body;

		// get the chat where the notification is intended to go
		const chat = await Chat.find({ _id: chatId });

		// get the users of the chat apart from the user that sent the message
		const chatUsers = chat[0].users.filter(
			(user) => user.toString() !== req.user._id.toString()
		);

		// cht if there are no other user in the chat
		if (!chatUsers) {
			throw new Error("No other user in the chat");
		}
		// create the notification data
		const notificationData = {
			sender: req.user._id,
			receivers: chatUsers,
			content: message,
			chat: chatId,
			isRead: false,
		};
		// create the notification in the DB
		const notification = await Notification.create(notificationData);

		res.status(201).json(notification);
	} catch (error) {
		// if there was any error in the try block, then
		res.status(400);
		throw new Error(error.message);
	}
});

// --------------------------------- function to get all nootifications meant for a user ----------------------- //
const getNotifications = asyncHandler(async (req, res) => {
	const userExist = await User.findById(req.user._id);

	// check if the user does not exist
	if (!userExist) {
		throw new Error("User not authorized");
	}
	// if the user exist, then
	// make a try-catch block
	try {
		// get the notifications based on the user's id
		const notifications = await Notification.find({
			receivers: { $elemMatch: { $eq: req.user._id } },
		}).populate("sender", "-password");
		res.status(200).json(notifications);
	} catch (error) {
		// if there was any error in the try block, then
		res.status(400);
		throw new Error(error.message);
	}
});

module.exports = { sendNotification, getNotifications };
