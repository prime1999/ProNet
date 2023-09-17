import axios from "axios";
import { baseUrl } from "../../../config/BaseURL";

// ----------------------------- function to get the current user's jop profile ------------------------ //
const getJobProfile = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.get(
		`${baseUrl()}profile/getProfile/job`,
		config
	);
	console.log(data);
	return data;
};

// ----------------------------- function to update the current user's jop profile ------------------------ //
const updateJobProfile = async (jobUpdates, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.patch(
		`${baseUrl()}profile/updateProfile/job`,
		jobUpdates,
		config
	);

	console.log(data);

	return data;
};

const JobProfileService = {
	getJobProfile,
	updateJobProfile,
};

export default JobProfileService;
