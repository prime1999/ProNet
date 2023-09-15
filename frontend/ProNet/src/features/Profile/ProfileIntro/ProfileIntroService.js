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

const profileIntroService = {
	getProfileIntro,
};

export default profileIntroService;
