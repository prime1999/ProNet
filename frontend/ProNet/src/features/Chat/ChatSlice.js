import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ChatService from "./ChatService";

const initialState = {
	chats: null,
	selectedChat: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};

// ----------------------------------- function to get all chats of the user ----------------------------- //
export const getChats = createAsyncThunk(
	"chat/getChat",
	async (_, thunkAPI) => {
		try {
			// await on the getChats function in the chat service component
			const token = thunkAPI.getState().auth.user.token;
			return await ChatService.getChats(token);
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
// ----------------------------------- function to access or create a chat ----------------------------- //
export const accessChat = createAsyncThunk(
	"chat/accessChat",
	async (userId, thunkAPI) => {
		try {
			// await on the accessChat function in the chat service component
			const token = thunkAPI.getState().auth.user.token;
			return await ChatService.accessChat(userId, token);
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

export const ChatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builders) => {
		builders
			// function to get the users chats
			.addCase(getChats.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getChats.fulfilled, (state, action) => {
				state.isLoading = false;
				state.chats = action.payload;
				state.isSuccess = true;
			})
			.addCase(getChats.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
				state.message = action.payload;
			})
			// function to access or create a chat
			.addCase(accessChat.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(accessChat.fulfilled, (state, action) => {
				state.isLoading = false;
				state.selectedChat = action.payload;
				state.isSuccess = true;
			})
			.addCase(accessChat.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
				state.message = action.payload;
			});
	},
});

export const { reset } = ChatSlice.actions;
export default ChatSlice.reducer;
