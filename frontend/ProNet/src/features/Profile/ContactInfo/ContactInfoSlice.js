import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ContactInfoService from "./ContactInfoService";

const initialState = {
	contactInfo: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};

// ----------------------------------- function to get the user's contact info ----------------------------- //
export const getContactInfo = createAsyncThunk(
	"contactInfo/getContactInfo",
	async (_, thunkAPI) => {
		try {
			// await on the get user contact info function in the contact info service component
			const token = thunkAPI.getState().auth.user.token;
			return await ContactInfoService.getContactInfo(token);
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

// ----------------------------------- function to create the user's contact info ----------------------------- //
export const createContactInfo = createAsyncThunk(
	"contactInfo/createContactInfo",
	async (contactData, thunkAPI) => {
		try {
			// await on the create user contact info function in the contact info service component
			const token = thunkAPI.getState().auth.user.token;
			return await ContactInfoService.createContactInfo(contactData, token);
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

// ----------------------------------- function to update the user's contact info ----------------------------- //
export const updateContactInfo = createAsyncThunk(
	"contactInfo/updateContactInfo",
	async (contactUpdates, thunkAPI) => {
		try {
			// await on the update user contact info function in the contact info service component
			const token = thunkAPI.getState().auth.user.token;
			return await ContactInfoService.updateContactInfo(contactUpdates, token);
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

export const contactInfoSlice = createSlice({
	name: "contactInfo",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builders) => {
		builders
			// for getting the current user's contact info
			.addCase(getContactInfo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getContactInfo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.contactInfo = action.payload;
				state.isSuccess = true;
			})
			.addCase(getContactInfo.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			// for creating the current user's contact info
			.addCase(createContactInfo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createContactInfo.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createContactInfo.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			// for updating the current user's contact info
			.addCase(updateContactInfo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateContactInfo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.contactInfo = action.payload;
				state.isSuccess = true;
			})
			.addCase(updateContactInfo.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = contactInfoSlice.actions;
export default contactInfoSlice.reducer;
