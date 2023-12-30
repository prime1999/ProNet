import axios from "axios";
import { baseUrl } from "../../config/BaseURL";

const API_URL = `${baseUrl()}notification/`;

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
	console.log(data);
	return data;
};

const NotificationService = { sendNotification };

export default NotificationService;
