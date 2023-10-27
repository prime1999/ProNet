const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const IntroSchema = require("../Models/profileModels/IntroModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ----------------------------- function to get Users with same interest --------------------------- //
const getPeopleWithSameInterest = asyncHandler(async (req, res) => {
	// try check the current user in the DB,
	const userExist = await User.findOne({ _id: req.user._id });
	// then check if the user exist
	if (!userExist) {
		// then throw an error
		throw new Error("Not Authorized");
	}
	try {
		// if the user does exist
		// get the user's profile from the DB
		const userProfile = await IntroSchema.find({ user: req.user._id });
		if (!userProfile) {
			throw new Error("User Not Authorized");
		}

		// find the posts to send to the user's feed based on the user's:
		let suggestions = await IntroSchema.find(
			{
				$text: {
					// headLine, summary and skills by search for the keywords in the headlIne, summary and skills write ups
					$search: `${userProfile.headLine} ${userProfile[0].skills.join(
						" "
					)} ${userProfile[0].summary}`, // Concatenate and search user's "headLine", "summary" and skills
				},
				user: { $ne: req.user._id },
			},
			// show the users in order of there score(how much they match the user's profile)
			{ score: { $meta: "textScore" } }
		);
		// init a variable with an empty array
		const usersSuggested = [];

		// map through the suggestions gotten
		suggestions.map((suggestion) => {
			// get the user's name, headLine and pic, and stote them in a variable
			const user = {
				name: `${suggestion.firstName} ${suggestion.lastName}`,
				headLine: suggestion.headLine,
				pic: suggestion.pic,
			};
			// then pus hthe variable to the usersSuggested array
			usersSuggested.push(user);
		});
		// send the suggested users to the frontend
		res.status(200);
		res.json(usersSuggested);
	} catch (error) {
		// if there is an error in the try block
		res.status(400);
		throw new Error(error.message);
	}
});

// ----------------------------- function to create a user --------------------------- //
const registerUser = asyncHandler(async (req, res) => {
	// get the user details sent from the frontend from the request body
	const { firstName, lastName, email, phoneNumber, password } = req.body;
	// check if all the details was sent
	if (!lastName || !firstName || !email || !phoneNumber || !password) {
		// if any of the details was not sent then
		throw new Error("Please fill in all fields");
	}

	// if they were all sent,
	const userExist = await User.findOne({ email });
	// then check if the user already exist
	if (userExist) {
		// then throw an error
		throw new Error("User already exist");
	}
	try {
		// if the user doesn't exist
		// generate a salt
		const salt = await bcrypt.genSalt(10);
		// then hash the password
		const hashedPassword = await bcrypt.hash(password, salt);
		// make a user data to send to the Db
		const userData = {
			firstName,
			lastName,
			phoneNumber,
			email,
			password: hashedPassword,
		};

		// register the user using the user's details
		const user = await User.create(userData);

		// send the created user details to the frontend with the status code
		res.status(201);
		res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			pic: user.pic,
			token: generateToken(user._id),
		});
	} catch (error) {
		// if there is an error in the try block
		res.status(400);
		throw new Error(error.message);
	}
});

// -------------------------------------- log user in ----------------------------------- //
const logUserIn = asyncHandler(async (req, res) => {
	// get the user credentials sent from the frontend from request body
	const { email, phoneNumber, password } = req.body;
	// check if the phoneNUmber or email and the password is sent
	if ((!email && !phoneNumber) || !password) {
		// if not then throw error
		throw new Error("Please fill all field");
	}
	try {
		// if it was send then
		// initialize a user variable
		let user;

		// if the email was sent then
		if (email) {
			// find the user based on his/her email
			user = await User.findOne({ email });
		}
		// if the phoneNumber was sent instead
		if (!user && phoneNumber) {
			// find the user based on his/her phoneNumber
			user = await User.findOne({ phoneNumber });
		}
		// check if the user exist and the password the user sent matched the one in the Db
		if (user && (await bcrypt.compare(password, user.password))) {
			// send the user data gotten back to the frontend
			res.status(200);
			res.json({
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				pic: user.pic,
				token: generateToken(user._id),
			});
		} else {
			// if the user does not exist or the password does not match, then
			throw new Error("User Not Authorized");
		}
	} catch (error) {
		// if an error occurs in the try block
		res.status(400);
		throw new Error(error.message);
	}
});

// --------------------------------- function to update the user details ----------------------------- //
const updateUser = asyncHandler(async (req, res) => {
	// get the user from the database
	const userExist = await User.findById(req.user._id);

	try {
		// check if the user was found in the DB
		if (!userExist) {
			// if the user was not found
			throw new Error("User not Authorised");
		}
		// if the user was found, then proceed
		// get the details to be updated from the database
		const { updateUser } = req.body;

		// destructure the firstname and the lastname from the updateUser
		const { firstName, lastName, pic } = updateUser;
		// check what is to be updated
		if (firstName !== undefined) {
			// Update the user's firstName
			userExist.firstName = firstName;
		}
		if (lastName !== undefined) {
			// Update the user's lastName
			userExist.lastName = lastName;
		}
		if (pic !== undefined) {
			// Update the user's pic
			userExist.pic = pic;
		}
		// Save the updated user
		await userExist.save();
		// Send a the updated user to the frontend
		return res.status(200).json({ userExist });
	} catch (error) {
		// if there ia an error in the try block
		res.status(500);
		throw new Error(error.message);
	}
});

// --------------------------------------------- function to search for a user -------------------------------- //
const searchUsers = asyncHandler(async (req, res) => {
	const { text } = req.body;
	// get the user from the database
	const userExist = await User.findById(req.user._id);
	// check if the user was found in the DB
	if (!userExist) {
		// if the user was not found
		throw new Error("User not Authorised");
	}
	// make a try-catch block
	try {
		let users = await User.find({
			$and: [
				// check if the text matches the name or email
				{
					$or: [
						// use a regex to make the text case insensitive
						{ firstName: { $regex: text, $options: "i" } },
						{ lastName: { $regex: text, $options: "i" } },
						{ email: { $regex: text, $options: "i" } },
					],
				},
				// check if the id of ther user is not equal to that of the current user
				{ _id: { $ne: req.user._id } },
			],
		});

		if (users.length > 0) {
			res.status(200).json(users);
		} else {
			throw new Error("User not found");
		}
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

// generate the jwt token
const generateToken = (_id) => {
	// generate the token using the user's id, the jwt secret and the number of days before it expires
	return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "5d" });
};

module.exports = {
	registerUser,
	logUserIn,
	updateUser,
	getPeopleWithSameInterest,
	searchUsers,
};
