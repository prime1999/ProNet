import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import JobProfileService from "./JobProfileService";

const initialState = {
	jobProfile: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};

// ----------------------------------- function to get the user's job profile ----------------------------- //
export const getJobProfile = createAsyncThunk(
	"JobProfile/getJobProfile",
	async (_, thunkAPI) => {
		try {
			// await on the get user job profile  function in the jobProfile service component
			const token = thunkAPI.getState().auth.user.token;
			return await JobProfileService.getJobProfile(token);
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

// ----------------------------------- function to create the user's job profile ----------------------------- //
export const addJobProfile = createAsyncThunk(
	"JobProfile/addJobProfile",
	async (jobData, thunkAPI) => {
		console.log({ jobData });
		try {
			// await on the add user job profile  function in the jobProfile service component
			const token = thunkAPI.getState().auth.user.token;
			return await JobProfileService.addJobProfile(jobData, token);
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

// ----------------------------------- function to update the user's job profile ----------------------------- //
export const updateJobProfile = createAsyncThunk(
	"JobProfile/updateJobProfile",
	async (jobUpdates, thunkAPI) => {
		try {
			// await on the update user job profile  function in the job Profile service component
			const token = thunkAPI.getState().auth.user.token;
			return await JobProfileService.updateJobProfile(token, jobUpdates);
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

export const JobProfileSlice = createSlice({
	name: "jobProfile",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builders) => {
		builders
			// for getting the current user's job profile
			.addCase(getJobProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getJobProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.jobProfile = action.payload;
				state.isSuccess = true;
			})
			.addCase(getJobProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			// for creating the current user's job profile
			.addCase(addJobProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addJobProfile.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(addJobProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			// for updating the current user's job profile
			.addCase(updateJobProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateJobProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(updateJobProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = JobProfileSlice.actions;

export default JobProfileSlice.reducer;
