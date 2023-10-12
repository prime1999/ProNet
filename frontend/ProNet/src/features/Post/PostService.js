import axios from "axios";
import { baseUrl } from "../../config/BaseURL";

// ----------------------------------- function to create a post ---------------------------------- //
const createPost = async (postData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(
		`${baseUrl()}/createPost`,
		postData,
		config
	);
	return data;
};

// ----------------------------------- function to get user's feed ---------------------------------- //
const getFeed = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(`${baseUrl()}/getFeed`, config);
	return data;
};

// ----------------------------------- function to react to a post ---------------------------------- //
const reactToAPost = async (postId, token) => {
	console.log(postId);
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.patch(
		`${baseUrl()}/reactToAPost`,
		{ postId },
		config
	);
	return data;
};

const postService = { createPost, getFeed, reactToAPost };

export default postService;
