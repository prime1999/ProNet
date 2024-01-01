require("dotenv").config();
const path = require("path");
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
const notificationRoute = require("./Routes/NotificationRoute");

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
//app.use("/api", route);
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
// for notifications
app.use("/api/notification", notificationRoute);

// connect to db
connectDb();

//middleware for handling errors
app.use(errorHandler);

// get the current directory name of the app
const __dirName = path.resolve();
// check if the app is in production,
if (process.env.NODE_ENV === "production") {
	// if yes, then:
	// serve the statis files in the '/frontend/build' path to the page
	app.use(express.static(path.join(__dirName, "/frontend/ProNet/dist")));
	// get the files under the route "*" and send it to the route below
	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirName, "frontend/ProNet", "dist", "index.html")
		);
	});
} else {
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}

// listen to request on the port
const server = app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
});

const io = require("socket.io")(server, {
	// set the time for the socket to wait before disconnecting
	pingTimeout: 60000,
	// set cors for the specified web address
	cors: {
		origin: "http://localhost:5174",
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
		// emit a socket instance for the frontend to know that te user is connected
		socket.emit("connected");
	});
	// listen to request from the frontend to join a specific chat
	socket.on("join chat", (room) => {
		// add the user to the chat with the id of the chat the user requested to join
		socket.join(room);
		console.log(`user joined room ${room}`);
	});
	// listen to the socket instance sent when a new message has been sent
	socket.on("new message", (newMessageReceived) => {
		// get the chat the message is comming from
		let chat = newMessageReceived.chat;
		// check if there are user in the chat
		if (!chat.users) {
			return;
		}
		// if there are then: loop throught the users array
		chat.users.forEach((user) => {
			// get the other user apart from the message sender
			if (user._id === newMessageReceived.sender._id) {
				return console.log("user ");
			}
			// get the room of the user and emit the message the message sent
			socket.in(user._id).emit("message received", newMessageReceived);
		});
	});
	socket.off("setup", (userData) => {
		console.log("USER DISCONNECTED");
		socket.leave(userData._id);
	});
});
