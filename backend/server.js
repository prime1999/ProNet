require("dotenv").config();
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const connectDb = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const UserRoute = require("./Routes/UserRoute");

// create an express app
const app = express();

// enable middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable cors middleware
app.use(cors());

// routes
app.use("/api/user", UserRoute);

// connect to db
connectDb();

//middleware for handling errors
app.use(errorHandler);

// listen to request on the port
app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
});
