import axios from "axios";
import { baseUrl } from "../../config/BaseURL";

const API_URL = "/api/jobs/";

// ----------------------------- function to get the recommended jobs -------------------------- //
const getRecommendedJobs = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.get(`${API_URL}recommendJobs`, config);

	return data;
};
// ----------------------------- function to create a job posting -------------------------- //
const createJobPosting = async (jobData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.post(`${API_URL}postJob`, jobData, config);
	return data;
};
// ----------------------------- function to search job posting -------------------------- //
const searchJobPosting = async (keyword, token) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const requestData = { keyword }; // Include keyword in the request body
		console.log(requestData);

		const { data } = await axios.post(
			`${API_URL}searchJobs`,
			requestData, // Pass the requestData as the request body
			config
		);

		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
	}
};

const jobService = { getRecommendedJobs, createJobPosting, searchJobPosting };

export default jobService;
