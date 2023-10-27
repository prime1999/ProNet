import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/Auth/AuthSlice";
import ProfileIntroReducer from "../features/Profile/ProfileIntro/ProfileIntroSlice";
import JobProfileReducer from "../features/Profile/JobProfile/JobProfileSlice";
import contactInfoReducer from "../features/Profile/ContactInfo/ContactInfoSlice";
import PostReducer from "../features/Post/PostSlice";
import CommentReducer from "../features/Comments/CommentSlice";
import JobReducer from "../features/jobs/JobSlice";
import ChatReducer from "../features/Chat/ChatSlice";

export const store = configureStore({
	reducer: {
		auth: AuthReducer,
		profileIntro: ProfileIntroReducer,
		JobProfile: JobProfileReducer,
		contactInfo: contactInfoReducer,
		post: PostReducer,
		comments: CommentReducer,
		jobs: JobReducer,
		chat: ChatReducer,
	},
});
