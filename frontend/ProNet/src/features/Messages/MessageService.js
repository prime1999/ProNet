import axios from "axios";
import { baseUrl } from "../../config/BaseURL";

const API_URL = "/api/message";

// ----------------------- function to get all the message sof a chats form the backend ----------------------- //
const getMessages = async (chatId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.get(`${API_URL}/getMessages/${chatId}`, config);
	return data;
};

// ----------------------- function to send message ----------------------- //
const sendMessage = async (chatData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.post(`${API_URL}/sendMessage`, chatData, config);
	return data;
};
const MessageService = { getMessages, sendMessage };
export default MessageService;
