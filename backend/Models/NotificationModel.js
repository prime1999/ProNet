const mongoose = require("mongoose");

// Define the notification schema
const notificationSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Reference to the User model for the sender of the notification
		},
		receivers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User", // Reference to the User model for the user who will receive the notification
			},
		],
		content: {
			type: String, // Message or content of the notification
			required: true,
		},

		isRead: {
			type: Boolean,
			default: false, // Indicates whether the notification has been read
		},
		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat", // Reference to the chat model from where the notification is coming from
		},
	},
	{ timestamps: true }
);

// Create the Notification model
const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
