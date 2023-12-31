import axios from "axios";
import { baseUrl } from "../../../config/BaseURL";

const API_URL = "/api/profile";

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
// -------------------------------- function to create the current user's contact info ------------------------- //
const createContactInfo = async (contactData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(
		`${API_URL}/createProfile/contact`,
		contactData,
		config
	);

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
	createContactInfo,
	updateContactInfo,
};
export default ContactInfoService;
