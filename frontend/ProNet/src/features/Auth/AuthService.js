import axios from "axios";
import { baseUrl } from "../../config/BaseURL";

// ----------------------------------- function to register a user ------------------------ //
const registerUser = async (userData) => {
	// send the request to the backend
	const { data } = await axios.post("/api/user", userData);

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
	const { data } = await axios.post("/api/user/login", userData);

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
	const { data } = await axios.get("/api/user/getPeople", config);

	return data;
};

// ----------------------------------- function for searching users ------------------------ //
const searchUsers = async (text, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	// send the request to the backend
	const { data } = await axios.post("/api/user/searchUsers", { text }, config);

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
	searchUsers,
	sendCode,
	verifyCode,
	logUserIn,
	logUserOut,
};

export default authService;
