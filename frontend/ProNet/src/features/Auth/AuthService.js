import axios from "axios";

const API_URL = "http://localhost:8000/api";

// ----------------------------------- function to register a user ------------------------ //
const registerUser = async (userData) => {
	// send the request to the backend
	const { data } = await axios.post(`${API_URL}/user`, userData);

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
	const { data } = await axios.post(`${API_URL}/user/login`, userData);

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
	const { data } = await axios.get(`${API_URL}/user/getPeople`, config);

	console.log(data);

	return data;
};

// ----------------------------------- function to send verification code ------------------------ //
const sendCode = async (phone) => {
	// send the request to the backend
	const { data } = await axios.post(`${API_URL}/sendCode`, phone);

	return data;
};

// ----------------------------------- function to verify inputed code ------------------------ //
const verifyCode = async (code) => {
	// send the request to the backend
	const { data } = await axios.post(`${API_URL}/verifyCode`, code);
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
