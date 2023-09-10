const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SkillSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		skills: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Skill", SkillSchema);
