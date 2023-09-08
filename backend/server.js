require("dotenv").config();
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const connectDb = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const UserRoute = require("./Routes/UserRoute");
const route = require("./Routes/SMSRoute");
const postRoute = require("./Routes/PostRoute");
const ProfileRoute = require("./Routes/ProfileRoute");

// create an express app
const app = express();

// enable middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable cors middleware
app.use(cors());

// routes
// for the user registration and log in
app.use("/api/user", UserRoute);
// for the number verification
app.use("/api", route);
// for the post
app.use("/api", postRoute);
// for the user's profile
app.use("/api/profile", ProfileRoute);

// connect to db
connectDb();

//middleware for handling errors
app.use(errorHandler);

// listen to request on the port
app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
});
