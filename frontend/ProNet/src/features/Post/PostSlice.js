import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./PostService";

const initialState = {
	post: null,
	posts: null,
	feed: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};

// ----------------------------------- function to create a post ----------------------------- //
export const createPost = createAsyncThunk(
	"post/createPost",
	async (postData, thunkAPI) => {
		try {
			// await on the createPost  function in the post service component
			const token = thunkAPI.getState().auth.user.token;
			return await postService.createPost(postData, token);
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

// ----------------------------------- function to get user's feed ----------------------------- //
export const getFeed = createAsyncThunk("post/getFeed", async (_, thunkAPI) => {
	try {
		// await on the createPost  function in the post service component
		const token = thunkAPI.getState().auth.user.token;
		return await postService.getFeed(token);
	} catch (error) {
		// assign an error value if there is one in any of the listed error value holders below
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		// return the errror message using the thunkapi rejectwithvalue
		return thunkAPI.rejectWithValue(message);
	}
});

// ----------------------------------- function to to react to a post ----------------------------- //
export const reactToAPost = createAsyncThunk(
	"post/reactToAPost",
	async (postId, thunkAPI) => {
		try {
			// await on the reactToAPost  function in the post service component
			const token = thunkAPI.getState().auth.user.token;
			return await postService.reactToAPost(postId, token);
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

// create post slice
export const PostSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builders) => {
		builders
			// for creating a post
			.addCase(createPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.post = action.payload;
				state.isSuccess = true;
			})
			.addCase(createPost.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			// for getting feed
			.addCase(getFeed.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getFeed.fulfilled, (state, action) => {
				state.isLoading = false;
				state.feed = action.payload;
				state.isSuccess = true;
			})
			.addCase(getFeed.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			// for react to a post
			.addCase(reactToAPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(reactToAPost.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(reactToAPost.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = PostSlice.actions;

export default PostSlice.reducer;
