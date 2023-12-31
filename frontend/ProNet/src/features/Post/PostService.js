import axios from "axios";
import { baseUrl } from "../../config/BaseURL";

// ----------------------------------- function to create a post ---------------------------------- //
const createPost = async (postData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post("/api/createPost", postData, config);
	return data;
};

// ----------------------------------- function to get user's feed ---------------------------------- //
const getFeed = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get("/api/getFeed", config);
	return data;
};

// ----------------------------------- function to react to a post ---------------------------------- //
const reactToAPost = async (postId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.patch("/api/reactToAPost", { postId }, config);
	return data;
};

const postService = { createPost, getFeed, reactToAPost };

export default postService;
