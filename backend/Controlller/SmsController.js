const asyncHander = require("express-async-handler");
const twilio = require("twilio");

// create a new instance of the twilo method
const twilioClient = new twilio(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);
// init a sentCode variable
let sentCode;

// ------------------------------------ function to send verification code ----------------- //
const sendCode = asyncHander(async (req, res) => {
	// get the phone number from the request body
	const { phoneNumber } = req.body;
	// check if the phone number was sent from the frontend
	if (!phoneNumber) {
		// it was not sent then
		throw new Error("please input a valid number");
	}
	try {
		// if it was sent then
		// generate the code to send to the user
		const code = generateVerificationCode(phoneNumber);
		// set the initialized sentCode varibale to the code generated
		sentCode = code;
		// send the code generated to the phoneNumber
		const message = await twilioClient.messages.create({
			body: `your verification code is: ${code}`,
			from: process.env.TWILIO_NUMBER,
			to: phoneNumber,
		});
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({ success: false, error: "SMS not sent" });
	}
});

// -------------------------------- function to verify code --------------------------- //
const verifyCode = asyncHander((req, res) => {
	// get the code inputed by the user from the req body
	const { verificationCode } = req.body;
	// check if the code was sent
	if (!verificationCode) {
		// if it was not then
		throw new Error("input sent code");
	}

	// if it was sent then
	// compare the code from the req body and the actual code sent to the user
	if (verificationCode === sentCode) {
		// if they match then
		res.json({ success: true });
	} else {
		// if they do not match then
		res.status(500).json({ success: false, error: "wrong verification code" });
	}
});

// function to generate the verification code
const generateVerificationCode = (phoneNumber) => {
	// init a code variable
	let code = "";
	// using a for loop,
	// get a random index from the phoneNUmber sent
	for (let i = 0; i <= 6; i++) {
		const randomIndex = Math.floor(Math.random() * phoneNumber.length);
		// Get the character at the random index
		const char = phoneNumber.charAt(randomIndex);
		// Check if the character is not '+', then add it to the code
		if (char !== "+") {
			// then add the character of the index gotten to the code variable
			code += char;
		}
	}

	return code;
};

module.exports = { sendCode, verifyCode };
