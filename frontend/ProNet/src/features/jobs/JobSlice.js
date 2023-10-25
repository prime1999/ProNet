import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jobService from "./JobService";

const initialState = {
	jobs: null,
	job: null,
	jobFeed: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};

// ----------------------------- function to get recommended jobs ----------------------------- //
export const getRecommendedJobs = createAsyncThunk(
	"jobs/getRecommendedJobs",
	async (_, thunkAPI) => {
		try {
			// await on the getRecommendedJobs  function in the jobs service component
			const token = thunkAPI.getState().auth.user.token;
			return await jobService.getRecommendedJobs(token);
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
// ----------------------------- function to create a job posting ----------------------------- //
export const createJobPosting = createAsyncThunk(
	"jobs/createJobPosting",
	async (jobData, thunkAPI) => {
		try {
			// await on the createJobPosting function in the jobs service component
			const token = thunkAPI.getState().auth.user.token;
			return await jobService.createJobPosting(jobData, token);
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

// ----------------------------- function to search job posting ----------------------------- //
export const searchJobPosting = createAsyncThunk(
	"jobs/searchJobPosting",
	async (keyword, thunkAPI) => {
		try {
			// await on the searchJobPosting function in the jobs service component
			const token = thunkAPI.getState().auth.user.token;
			return await jobService.searchJobPosting(keyword, token);
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

export const JobSlice = createSlice({
	name: "jobs",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builders) => {
		builders
			.addCase(getRecommendedJobs.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getRecommendedJobs.fulfilled, (state, action) => {
				state.isLoading = false;
				state.jobFeed = action.payload;
				state.isSuccess = true;
			})
			.addCase(getRecommendedJobs.rejected, (state, action) => {
				state.isLoading = false;
				state.message = action.payload;
				state.isSuccess = false;
				state.isError = true;
			})
			.addCase(createJobPosting.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createJobPosting.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createJobPosting.rejected, (state, action) => {
				state.isLoading = false;
				state.message = action.payload;
				state.isSuccess = false;
				state.isError = true;
			})
			.addCase(searchJobPosting.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(searchJobPosting.fulfilled, (state, action) => {
				state.isLoading = false;
				state.jobFeed = action.payload;
				state.isSuccess = true;
			})
			.addCase(searchJobPosting.rejected, (state, action) => {
				state.isLoading = false;
				state.message = action.payload;
				state.isSuccess = false;
				state.isError = true;
			});
	},
});

export const { reset } = JobSlice.actions;

export default JobSlice.reducer;
