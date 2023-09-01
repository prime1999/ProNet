const errorHandler = (err, req, res, next) => {
	// check if there is a status code for the error when there is an error
	// if there is then  set the status code to the code sent else set the status code to 500
	const statuscode = res.statusCode ? res.statusCode : 500;
	// return the status code to the frontend
	res.status(statuscode);
	// check if the app is in production or development
	// if it is in development then show the stac message else don't show it
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

module.exports = { errorHandler };
