import axios from "axios";
import { baseUrl } from "../../../config/BaseURL";

// -------------------------------- function to get the user's profile intro -------------------------- //
const getProfileIntro = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(
		`${baseUrl()}profile/getProfile/intro`,
		config
	);

	return data;
};

// -------------------------------- function to update the user's profile intro -------------------------- //
const updateProfileIntro = async (introUpdates, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.patch(
		`${baseUrl()}profile/updateProfile/intro`,
		{ introUpdates },
		config
	);

	console.log(data);

	return data;
};

const profileIntroService = {
	getProfileIntro,
	updateProfileIntro,
};

export default profileIntroService;
