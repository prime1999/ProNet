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
	"auth/getJobProfile",
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

export const JobProfileSlice = createSlice({
	name: "jobProfile",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builders) => {
		builders
			// for getting the current job profile
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
			});
	},
});

export const { reset } = JobProfileSlice.actions;

export default JobProfileSlice.reducer;
