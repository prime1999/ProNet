import axios from "axios";

const API_URL = "/api/notification/";

// -------------------------------- function to send notifications ------------------------------------- //
const sendNotification = async (notificationData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.post(
		`${API_URL}sendNotifications`,
		notificationData,
		config
	);

	return data;
};

const NotificationService = { sendNotification };

export default NotificationService;
