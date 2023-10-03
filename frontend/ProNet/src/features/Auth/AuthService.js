import axios from "axios";
import { baseUrl } from "../../config/BaseURL";

// ----------------------------------- function to register a user ------------------------ //
const registerUser = async (userData) => {
	// send the request to the backend
	const { data } = await axios.post(`${baseUrl()}user`, userData);

	// check if a data was sent back
	if (data) {
		// save the data gotten to local storage
		localStorage.setItem("user", JSON.stringify(data));
	}

	return data;
};

// ----------------------------------- function to register a user ------------------------ //
const logUserIn = async (userData) => {
	// send the request to the backend
	const { data } = await axios.post(`${baseUrl()}user/login`, userData);

	// check if a data was sent back
	if (data) {
		// save the data gotten to local storage
		localStorage.setItem("user", JSON.stringify(data));
	}

	return data;
};
// ----------------------------------- function to get people with same interest ------------------------ //
const getPeopleWithSameInterest = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	// send the request to the backend
	const { data } = await axios.get(`${baseUrl()}user/getPeople`, config);

	console.log(data);

	return data;
};

// ----------------------------------- function to send verification code ------------------------ //
const sendCode = async (phone) => {
	// send the request to the backend
	const { data } = await axios.post(`${baseUrl()}sendCode`, phone);

	return data;
};

// ----------------------------------- function to verify inputed code ------------------------ //
const verifyCode = async (code) => {
	// send the request to the backend
	const { data } = await axios.post(`${baseUrl()}verifyCode`, code);
	return data;
};

// ----------------------------------- function to log user out ------------------------ //
const logUserOut = async () => {
	localStorage.removeItem("user");
};
const authService = {
	registerUser,
	getPeopleWithSameInterest,
	sendCode,
	verifyCode,
	logUserIn,
	logUserOut,
};

export default authService;
