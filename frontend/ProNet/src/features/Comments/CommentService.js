import axios from "axios";
import { baseUrl } from "../../config/BaseURL";

// ----------------------------------- function to get comments on a post ---------------------------------- //
const getComments = async (postId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(
		`${baseUrl()}/getComments/${postId}`,
		config
	);

	console.log(data);
	return data;
};

const CommentService = { getComments };

export default CommentService;
