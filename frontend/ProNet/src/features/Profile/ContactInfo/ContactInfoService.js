import axios from "axios";
import { baseUrl } from "../../../config/BaseURL";

const API_URL = `${baseUrl()}profile`;

// -------------------------------- function to get the current user's contact info ------------------------- //
const getContactInfo = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(`${API_URL}/getProfile/contact`, config);

	return data;
};

// -------------------------------- function to update the current user's contact info ------------------------- //
const updateContactInfo = async (contactUpdates, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.patch(
		`${API_URL}/updateProfile/contact`,
		{ contactUpdates },
		config
	);

	return data;
};

const ContactInfoService = {
	getContactInfo,
	updateContactInfo,
};
export default ContactInfoService;
