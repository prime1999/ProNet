const mongoose = require("mongoose");
const User = require("./UserModel");

// chat details
// chatName
// isGroupChat
// users
// latestMessage
// groupAdmin

const Schema = mongoose.Schema;

const chatSchema = new Schema(
	{
		chatName: {
			type: String,
			trim: true,
		},
		isGroupChat: {
			type: Boolean,
			default: false,
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		},
		groupAdmin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: User,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
