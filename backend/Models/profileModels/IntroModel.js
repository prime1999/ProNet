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

// ---------------------------------------- the education schema starts here ----------------------------- //

const EducationSchema = new Schema(
	{
		name: {
			type: String,
		},
		degree: {
			type: String,
		},
		fieldOfStudy: {
			type: String,
		},
		startDate: {
			type: String,
		},
		endDate: {
			type: String,
		},
		grade: {
			type: String,
		},
	},
	{ timestamps: true }
);

// ---------------------------------------- the education schema ends here ----------------------------- //
// ---------------------------------------- the experience schema starts here ----------------------------- //

const ExperienceSchema = new Schema(
	{
		company: {
			type: String,
		},
		position: {
			type: String,
		},
		details: {
			type: String,
		},
		startDate: {
			type: String,
		},
		endDate: {
			type: String,
		},
	},
	{ timestamps: true }
);

// ---------------------------------------- the experience schema ends here ----------------------------- //

const ProfileIntroSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		pic: {
			type: String,
			default:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		backgroundPhoto: {
			type: String,
			default:
				"https://img.freepik.com/free-vector/3d-earth-graphic-symbolizing-global-trade-illustration_456031-131.jpg?w=826&t=st=1694248755~exp=1694249355~hmac=4e4ff0c40603f49763f2c4dc3d5b78664aa2de39464ad31532a620cd78055a07",
		},
		headLine: {
			type: String,
		},
		summary: {
			type: String,
		},
		education: [
			{
				type: EducationSchema,
			},
		],
		experience: [
			{
				type: ExperienceSchema,
			},
		],

		location: {
			type: LocationSchema,
			strict: "throw",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("IntroSchema", ProfileIntroSchema);
