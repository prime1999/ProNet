import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MessageService from "./MessageService";

const initialState = {
	messages: null,
	chatMessage: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};

// ----------------------------------- function to get all the messages of a chat ----------------------------- //
export const getMessages = createAsyncThunk(
	"messages/getMessage",
	async (chatId, thunkAPI) => {
		try {
			// await on the getMessages function in the message service component
			const token = thunkAPI.getState().auth.user.token;
			return await MessageService.getMessages(chatId, token);
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

// ----------------------------------- function to get all the messages of a chat ----------------------------- //
export const sendMessage = createAsyncThunk(
	"messages/sendMessage",
	async (chatData, thunkAPI) => {
		console.log(chatData);
		try {
			// await on the senMessages function in the message service component
			const token = thunkAPI.getState().auth.user.token;
			return await MessageService.sendMessage(chatData, token);
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

// ----------------------------------- function to get all the messages of a chat ----------------------------- //
export const setMessage = createAsyncThunk("messages/setMessage", (message) => {
	return message;
});

export const MessageSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builders) => {
		builders
			// function to get all the messages of a chat
			.addCase(getMessages.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMessages.fulfilled, (state, action) => {
				state.isLoading = false;
				state.messages = action.payload;
				state.isSuccess = true;
			})
			.addCase(getMessages.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
				state.message = action.payload;
			})
			// function to send a messages
			.addCase(sendMessage.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(sendMessage.fulfilled, (state, action) => {
				state.isLoading = false;
				state.chatMessage = action.payload;
				state.isSuccess = true;
			})
			.addCase(sendMessage.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
				state.message = action.payload;
			})
			// function for real time messaging
			.addCase(setMessage.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(setMessage.fulfilled, (state, action) => {
				state.isLoading = false;
				state.messages = [...state.messages, action.payload];
				state.isSuccess = true;
			})
			.addCase(setMessage.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
				state.message = action.payload;
			});
	},
});

export const { reset } = MessageSlice.actions;

export default MessageSlice.reducer;
