const asyncHandler = require("express-async-handler");
const Chat = require("../Models/ChatModel");
const User = require("../Models/UserModel");

// ----------------------------------- function to access a one on one chat ----------------------------- //
// this will create or access the chat
const accessChat = asyncHandler(async (req, res) => {
	// get the id of the user to chat with from the request body
	const { userId } = req.body;
	// check if the current user is authorised
	const userExist = await User.findById(req.user._id);
	// if the user is not authorised then:
	if (!userExist) {
		// show an error
		throw new Error("User not Authorised");
	}
	// check if the id of the other user was sent with the request
	if (!userId) {
		// if it wasn't then:
		throw new Error("UserId is invalid");
	}
	// if it was then

	// find the chat involving the two users in the DB
	let isChat = await Chat.find({
		// the chat is not a group chat
		isGroupChat: false,
		// the users in the chat are the two users alone
		$and: [
			{ users: { $elemMatch: { $eq: req.user._id } } },
			{ users: { $elemMatch: { $eq: userId } } },
		],
	})
		// fill the information of the users accept for there password
		.populate("users", "-password")
		// populate the lastest message field
		.populate("latestMessage");
	// further populate the latest message field withe the info on the sender accept its password
	isChat = await User.populate(isChat, {
		path: "latestMessage.sender",
		select: "firstName, lastName, pic",
	});

	if (isChat.length > 0) {
		res.status(200).json(isChat[0]);
	} else {
		let chatData = {
			chatName: "sender",
			isGroupChat: false,
			users: [req.user._id, userId],
		};
		try {
			let chat = await Chat.create(chatData);
			let fullChat = await Chat.findOne({ _id: chat._id }).populate(
				"users",
				"-password"
			);
			res.status(201).json(fullChat);
		} catch (error) {
			res.status(400);
			throw new Error(error.message);
		}
	}
});

// ---------------------------------- function to get all the chats a user in involved in -------------- //
const getChats = asyncHandler(async (req, res) => {
	// check if the current user is authorised
	const userExist = await User.findById(req.user._id);
	// if the user is not authorised then:
	if (!userExist) {
		// show an error
		throw new Error("User not Authorised");
	}
	// make a try-catch block
	try {
		// search for a chat tht the user involved in
		let chats = await Chat.find({
			// check the chat with the users array containing the current user
			users: { $elemMatch: { $eq: req.user._id } },
		})
			// fill the info of the users except there password
			.populate("users", "-password")
			// fill the info of the group admin except the password
			.populate("groupAdmin", "-password")
			// fill the info of the latest message
			.populate("latestMessage")
			.sort({ updatedAt: -1 });
		// further populate the latest message
		chats = await User.populate(chats, {
			// the sender field
			path: "latestMessage.sender",
			// fill the sender's firstName, lastName and the pic
			select: "frstName lastName pic",
		});
		// send the hats found to the frontend with the status of 200
		res.status(200).json(chats);
	} catch (error) {
		// if the is an error in the try block then
		res.status(400);
		// show an error message
		throw new Error(error.message);
	}
});

module.exports = { accessChat, getChats };
