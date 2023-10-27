import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthService";

// check if the user's data is stored in locl storage
let user = JSON.parse(localStorage.getItem("user"));
const initialState = {
	user: user ? user : null,
	users: null,
	people: null,
	verify: null,
	sentCode: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};

// ----------------------------------- function to register a user ----------------------------- //
export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async (userData, thunkAPI) => {
		try {
			// await on the register user  function in the auth service component
			return await authService.registerUser(userData);
		} catch (error) {
			// assign an error value if there is one in any of the listed error value holders below
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			// return the errror message using the thunkapi rejectwithvalue
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// ----------------------------------- function to log a user in ----------------------------- //
export const logUserIn = createAsyncThunk(
	"auth/logUserIn",
	async (userData, thunkAPI) => {
		console.log(userData);
		try {
			// await on the log in user  function in the auth service component
			return await authService.logUserIn(userData);
		} catch (error) {
			// assign an error value if there is one in any of the listed error value holders below
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			// return the errror message using the thunkapi rejectwithvalue
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// ----------------------------------- function to get people with same interest ----------------------------- //
export const getPeopleWithSameInterest = createAsyncThunk(
	"auth/getPeople",
	async (_, thunkAPI) => {
		try {
			// await on the getPeopleWithSameInterest  function in the auth service component
			const token = thunkAPI.getState().auth.user.token;
			return await authService.getPeopleWithSameInterest(token);
		} catch (error) {
			// assign an error value if there is one in any of the listed error value holders below
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			// return the errror message using the thunkapi rejectwithvalue
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// ----------------------------------- function to search users ----------------------------- //
export const searchUsers = createAsyncThunk(
	"auth/searchUsers",
	async (text, thunkAPI) => {
		try {
			// await on the search users  function in the auth service component
			const token = thunkAPI.getState().auth.user.token;
			return await authService.searchUsers(text, token);
		} catch (error) {
			// assign an error value if there is one in any of the listed error value holders below
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			// return the errror message using the thunkapi rejectwithvalue
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// ------------------------------ function to send verification code -------------------- //
export const sendCode = createAsyncThunk(
	"auth/sendCode",
	async (phone, thunkAPI) => {
		try {
			// await on the send code  function in the auth service component
			return await authService.sendCode(phone);
		} catch (error) {
			// assign an error value if there is one in any of the listed error value holders below
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			// return the errror message using the thunkapi rejectwithvalue
			return thunkAPI.rejectWithValue(message);
		}
	}
);
// ------------------------------ function to verify code -------------------- //
export const verifyCode = createAsyncThunk(
	"auth/verifyCode",
	async (code, thunkAPI) => {
		try {
			// await on the verify code  function in the auth service component
			return await authService.verifyCode(code);
		} catch (error) {
			// assign an error value if there is one in any of the listed error value holders below
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			// return the errror message using the thunkapi rejectwithvalue
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// ------------------------------ function to log user out -------------------- //
export const logUserOut = createAsyncThunk("auth/logUserOut", async () => {
	await authService.logUserOut();
});

// create auth slice
export const AuthSlice = createSlice({
	name: "Auth",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builders) => {
		builders
			// for registering users
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				state.isSuccess = true;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			// for loging in users
			.addCase(logUserIn.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logUserIn.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				state.isSuccess = true;
			})
			.addCase(logUserIn.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			// for getting people with same interest
			.addCase(getPeopleWithSameInterest.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPeopleWithSameInterest.fulfilled, (state, action) => {
				state.isLoading = false;
				state.people = action.payload;
				state.isSuccess = true;
			})
			.addCase(getPeopleWithSameInterest.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			// for searching users
			.addCase(searchUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(searchUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.users = action.payload;
				state.isSuccess = true;
			})
			.addCase(searchUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			// for sending code
			.addCase(sendCode.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(sendCode.fulfilled, (state, action) => {
				state.isLoading = false;
				state.sentCode = action.payload.success;
			})
			.addCase(sendCode.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.sentCode = false;
			})
			// for verifying code
			.addCase(verifyCode.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(verifyCode.fulfilled, (state, action) => {
				state.isLoading = false;
				state.verify = action.payload.success;
			})
			.addCase(verifyCode.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.verify = false;
				console.log(action.payload);
			})
			// for logging a user out
			.addCase(logUserOut.fulfilled, (state) => {
				state.user = null;
			});
	},
});

export const { reset } = AuthSlice.actions;

export default AuthSlice.reducer;
