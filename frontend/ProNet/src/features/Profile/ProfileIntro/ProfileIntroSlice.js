import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileIntroService from "./ProfileIntroService";

const initialState = {
	profileIntro: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};

// ----------------------------------- function to get the user's profie intro ----------------------------- //
export const getProfileIntro = createAsyncThunk(
	"auth/getProfileIntro",
	async (_, thunkAPI) => {
		try {
			// await on the get user profile intro  function in the profileIntro service component
			const token = thunkAPI.getState().auth.user.token;
			return await profileIntroService.getProfileIntro(token);
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

export const profileIntroSlice = createSlice({
	name: "profileIntro",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},

	extraReducers: (builders) => {
		builders
			// for getting the profile intro
			.addCase(getProfileIntro.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProfileIntro.fulfilled, (state, action) => {
				state.isLoading = false;
				state.profileIntro = action.payload;
				state.isSuccess = true;
			})
			.addCase(getProfileIntro.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = profileIntroSlice.actions;

export default profileIntroSlice.reducer;
