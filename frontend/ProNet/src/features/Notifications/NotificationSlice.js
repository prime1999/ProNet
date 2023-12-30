import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NotificationService from "./NotificationService";

const initialState = {
	notifications: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};

// ------------------------------- function to send notification to the backend --------------------------- //
export const sendNotification = createAsyncThunk(
	"notifications/sendNotification",
	async (notificationData, thunkAPI) => {
		try {
			// await on the sendNotification function in the notification service component
			const token = thunkAPI.getState().auth.user.token;
			return await NotificationService.sendNotification(
				notificationData,
				token
			);
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

export const notificationSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builders) => {
		builders
			// function to send notifications
			.addCase(sendNotification.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(sendNotification.fulfilled, (state, action) => {
				state.isLoading = false;
				state.notifications = action.payload;
				state.isSuccess = true;
			})
			.addCase(sendNotification.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
				state.message = action.payload;
			});
	},
});

export const { reset } = notificationSlice.actions;

export default notificationSlice.reducer;
