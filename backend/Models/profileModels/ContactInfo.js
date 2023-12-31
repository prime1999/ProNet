const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactInfoSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		email: {
			type: String,
		},
		phoneNumber: {
			type: String,
		},
		Address: {
			type: String,
		},
		BirthDay: {
			type: String,
		},
		Website: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("ContactSchema", ContactInfoSchema);
