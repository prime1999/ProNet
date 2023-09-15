import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/Auth/AuthSlice";
import ProfileIntroReducer from "../features/Profile/ProfileIntro/ProfileIntroSlice";
import JobProfileReducer from "../features/Profile/JobProfile/JobProfileSlice";

export const store = configureStore({
	reducer: {
		auth: AuthReducer,
		profileIntro: ProfileIntroReducer,
		JobProfile: JobProfileReducer,
	},
});
