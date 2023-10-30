require("dotenv").config();
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const connectDb = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const UserRoute = require("./Routes/UserRoute");
const route = require("./Routes/SMSRoute");
const postRoute = require("./Routes/PostRoute");
const ProfileRoute = require("./Routes/profileRoutes/ProfileRoute");
const commentRoute = require("./Routes/CommentsRoute");
const jobRoute = require("./Routes/JobRoute");
const chatRoute = require("./Routes/ChatRoute");
const messageRoute = require("./Routes/MessageRoute");

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
// for the comment
app.use("/api", commentRoute);
// for the user's profile
app.use("/api/profile", ProfileRoute);
//app.use("/api/profile", ProfileRoute);
// for the job
app.use("/api/jobs", jobRoute);
// for chatting
app.use("/api/chat", chatRoute);
// for messaging
app.use("/api/message", messageRoute);

// connect to db
connectDb();

//middleware for handling errors
app.use(errorHandler);

// listen to request on the port
const server = app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
});

const io = require("socket.io")(server, {
	// set the time for the socket to wait before disconnecting
	pingTimeout: 60000,
	// set cors for the specified web address
	cors: {
		origin: "http://localhost:5173",
	},
});
// set the socket io connection to start using the socket io calls
io.on("connection", (socket) => {
	console.log("connected to socket io");
	// listen to the setup socket send from the frontend
	socket.on("setup", (userData) => {
		// get the user's details sent with the sockect instance and add the user to a specific room with his/her id
		socket.join(userData._id);
		console.log(userData._id);
	});
});
