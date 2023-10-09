import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CommentService from "./CommentService";

const initialState = {
	comments: null,
	comment: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};

// ----------------------------------- function to get post comments ----------------------------- //
export const getComments = createAsyncThunk(
	"comment/getComments",
	async (postId, thunkAPI) => {
		try {
			// await on the getComment  function in the comment service component
			const token = thunkAPI.getState().auth.user.token;
			return await CommentService.getComments(postId, token);
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

// ----------------------------------- function to create post comments ----------------------------- //
export const createComment = createAsyncThunk(
	"comment/createComment",
	async (commentDetails, thunkAPI) => {
		try {
			// await on the createComment  function in the comment service component
			const token = thunkAPI.getState().auth.user.token;
			return await CommentService.createComment(commentDetails, token);
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

export const CommentSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builders) => {
		builders
			// for getting the post comments
			.addCase(getComments.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getComments.fulfilled, (state, action) => {
				state.isLoading = false;
				state.comments = action.payload;
				state.isSuccess = true;
			})
			.addCase(getComments.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			// for creating the post comments
			.addCase(createComment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createComment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.comments = [...action.payload, state.comments];
				state.isError = false;
				state.isSuccess = true;
			})
			.addCase(createComment.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = CommentSlice.actions;

export default CommentSlice.reducer;
