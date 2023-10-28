const asyncHandler = require("express-async-handler");
const Chat = require("../Models/ChatModel");
const User = require("../Models/UserModel");
const Message = require("../Models/MessageModel");

// ------------------------------------- function to send message to a chat ------------------------------------ //
const sendMessage = asyncHandler(async (req, res) => {
	// check if the current user is authorised
	const userExist = await User.findById(req.user._id);
	// if the user is not authorised then:
	if (!userExist) {
		// show an error
		throw new Error("User not Authorised");
	}
	// make a try-catch block
	try {
		// get the info about the message from the request body
		const { content, chatId } = req.body;
		// create the message data to send to the DB
		const messageData = {
			sender: req.user._id,
			content,
			chat: chatId,
		};
		// send the message to the DB
		let newMessage = await Message.create(messageData);
		// fill the sender field of the message wit the info of the sender
		newMessage = await newMessage.populate("sender", "firstName lastName pic");
		// fill the chat field
		newMessage = await newMessage.populate("chat");
		// fill the users of the chat with there info
		newMessage = await User.populate(newMessage, {
			path: "chat.users",
			select: "firstName lastName email pic",
		});

		// update the chat to have the new message as its latest message
		await Chat.findByIdAndUpdate(chatId, {
			latestMessage: newMessage,
		});
		// send the new message to the frontend
		res.status(201).json(newMessage);
	} catch (error) {
		// if an error show up in the try block, send the error to the frontend
		res.status(400);
		throw new Error(error.message);
	}
});

// ----------------------------- function to get all messages of a chat --------------------------------- //
const allMessages = asyncHandler(async (req, res) => {
	// check if the current user is authorised
	const userExist = await User.findById(req.user._id);
	// if the user is not authorised then:
	if (!userExist) {
		// show an error
		throw new Error("User not Authorised");
	}
	// make a try-catch block
	try {
		// get the messages of the chat with the id of the chat sent with the request params
		let messages = await Message.find({ chat: req.params.chatId })
			// fill the sender field of the message wit the info of the sender
			.populate("sender", "firstName lastName pic")
			// fill the chat field
			.populate("chat");
		// send the messages gotten to the frontend
		res.status(200).json(messages);
	} catch (error) {
		// if an error show up in the try block, send the error to the frontend
		res.status(400);
		throw new Error(error.message);
	}
});

module.exports = { sendMessage, allMessages };
