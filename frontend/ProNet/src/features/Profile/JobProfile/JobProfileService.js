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
	return data;
};
// ----------------------------- function to add the current user's jop profile ------------------------ //
const addJobProfile = async (jobData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.post(
		`${baseUrl()}profile/createProfile/job`,
		jobData,
		config
	);
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

	return data;
};

const JobProfileService = {
	getJobProfile,
	addJobProfile,
	updateJobProfile,
};

export default JobProfileService;
