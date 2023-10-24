import axios from "axios";
import { baseUrl } from "../../config/BaseURL";

const API_URL = `${baseUrl()}jobs/`;

// ----------------------------- function to get the recommended jobs -------------------------- //
const getRecommendedJobs = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.get(`${API_URL}recommendJobs`, config);
	console.log(data);
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
	console.log(data);
	return data;
};

const jobService = { getRecommendedJobs, createJobPosting };

export default jobService;
