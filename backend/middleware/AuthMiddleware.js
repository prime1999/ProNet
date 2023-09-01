const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");

const protect = asyncHandler(async (req, res, next) => {
	// initialize a token variable
	let token;

	// check if the token was sent with the request header
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// get the token from the header
			token = await req.headers.authorization.split(" ")[1];
			// verify if the token is a valid token
			const decoded = await jwt.verify(token, process.env.JWT_SECRET);
			// find the user using the id of the decoded password but exclude the password itself
			req.user = await User.findById(decoded._id).select("-password");
			next();
		} catch (error) {
			// if there is an error in the try block send the error message
			res.status(401);
			throw new Error("User not authorised");
		}
	}
});

module.exports = { protect };
