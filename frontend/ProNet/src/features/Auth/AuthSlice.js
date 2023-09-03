import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthService";

// check if the user's data is stored in locl storage
let user = JSON.parse(localStorage.getItem("user"));
const initialState = {
	user: user ? user : null,
	users: null,
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
		console.log(userData);
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
				console.log(action.payload);
			})
			.addCase(registerUser.rejected, (state, action) => {
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
			});
	},
});

export const { reset } = AuthSlice.actions;

export default AuthSlice.reducer;
