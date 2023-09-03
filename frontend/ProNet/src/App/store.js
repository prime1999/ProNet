import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/Auth/AuthSlice";

export const store = configureStore({
	reducer: {
		auth: AuthReducer,
	},
});
