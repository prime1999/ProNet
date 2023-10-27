import axios from "axios";
import { baseUrl } from "../../config/BaseURL";

const API_URL = `${baseUrl()}chat`;

// ------------------------ function to send the getChats request to the backend ------------------------- //
const getChats = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(`${API_URL}/getChats`, config);
	return data;
};

// ------------------------ function to send the accessChat request to the backend ------------------------- //
const accessChat = async (userId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.post(
		`${API_URL}/accessChat`,
		{ userId },
		config
	);
	return data;
};

const ChatService = {
	getChats,
	accessChat,
};

export default ChatService;
