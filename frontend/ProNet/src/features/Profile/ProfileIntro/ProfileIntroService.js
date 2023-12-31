import axios from "axios";
import { baseUrl } from "../../../config/BaseURL";

// -------------------------------- function to get the user's profile intro -------------------------- //
const getProfileIntro = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get("/api/profile/getProfile/intro", config);

	return data;
};
// -------------------------------- function to create the user's profile intro -------------------------- //
const createUserProfile = async (profileData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(
		"/api/profile/createProfile/intro",
		profileData,
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
		"/api/profile/updateProfile/intro",
		{ introUpdates },
		config
	);

	return data;
};

const profileIntroService = {
	getProfileIntro,
	createUserProfile,
	updateProfileIntro,
};

export default profileIntroService;
