// name or id of the sender
// content of the message
// the reference to the chat to which it belongs to

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		content: {
			type: String,
			trim: true,
		},
		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "chat",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);