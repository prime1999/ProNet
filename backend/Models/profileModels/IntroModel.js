const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// ---------------------------------------- the location schema starts here ----------------------------- //

const LocationSchema = new Schema(
	{
		country: {
			type: String,
		},
		city: {
			type: String,
		},
	},
	{ timestamps: true }
);

// ---------------------------------------- the location schema ends here ----------------------------- //

const ProfileIntroSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	backgroundPhoto: {
		type: String,
		default:
			"https://img.freepik.com/free-vector/3d-earth-graphic-symbolizing-global-trade-illustration_456031-131.jpg?w=826&t=st=1694248755~exp=1694249355~hmac=4e4ff0c40603f49763f2c4dc3d5b78664aa2de39464ad31532a620cd78055a07",
	},
	headLine: {
		type: String,
	},
	education: {
		type: Array,
	},
	location: {
		type: LocationSchema,
		strict: "throw",
	},
});

module.exports = mongoose.model("IntroSchema", ProfileIntroSchema);
