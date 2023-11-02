const express = require("express");
const { protect } = require("../middleware/AuthMiddleware");
const {
	sendNotification,
	getNotifications,
} = require("../Controlller/NotificationController");

const notificationRoute = express.Router();
//GET: GETNOTIFICATION, private (get notifications of a user);
//POST: SENDNOTIFICATION, private (to send a notification);

notificationRoute.get("/getNotifications", protect, getNotifications);
notificationRoute.post("/sendNotifications", protect, sendNotification);

module.exports = notificationRoute;
