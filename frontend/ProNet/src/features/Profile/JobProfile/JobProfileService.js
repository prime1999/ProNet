import axios from "axios";
import { baseUrl } from "../../../config/BaseURL";

// ----------------------------- function to get the current user's jop profile ------------------------ //
const getJobProfile = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.get("/api/profile/getProfile/job", config);
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
		"/api/profile/createProfile/job",
		jobData,
		config
	);

	return data;
};

// ----------------------------- function to update the current user's jop profile ------------------------ //
const updateJobProfile = async (token, jobUpdates) => {
	console.log(token);
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.put(
		"/api/profile/updateProfile/job",
		{ jobUpdates },
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
