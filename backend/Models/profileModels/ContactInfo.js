const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactInfoSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
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
});

module.exports = mongoose.model("ContactSchema", ContactInfoSchema);
