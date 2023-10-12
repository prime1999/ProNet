import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import { RiGalleryLine } from "react-icons/ri";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import {
	createComment,
	getComments,
	reset,
} from "../../../features/Comments/CommentSlice";
import ReplyComponent from "../../miscellaneous/comments/Comment/Comment/ReplyComponent";

const CommentsList = ({ postId, intro, setCommentLength, commentLength }) => {
	// state for storing the post comments
	const [postComments, setPostComments] = useState(null);
	// state for the comment inputted
	const [myCommentText, setMyCommentText] = useState("");
	// init the dispatch function
	const dispatch = useDispatch();
	// get comments from he redux store comments
	const { comments, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.comments
	);
	// get user's from he redux store users
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		// get the comments from the backend
		dispatch(getComments(postId));
	}, []);

	useEffect(() => {
		// if the comments was gotten successfully then,
		if (isSuccess) {
			// store them in the postComments state
			setPostComments(comments);
		}
		// clear out the redux store
		dispatch(reset());
	}, [isSuccess]);

	// function to comment on  post
	const handleComment = (event) => {
		// check if the enter is the one clicked and if the input field has been filled
		if (event.key === "Enter" && myCommentText) {
			// set a sample comment data to show on the UI untill thee one from the backend is gotten
			let sampleComment = {
				_id: Date.now(),
				author: {
					_id: Math.floor(Math.random * 10),
					firstName: intro.firstName,
					lastName: intro.lastName,
					pic: intro.pic,
				},
				content: myCommentText,
				likes: [],
				media: "",
				post: postId,
				replies: [],
			};
			let newComment = {
				content: myCommentText,
				postId,
			};
			// send the reply to the backend
			dispatch(createComment(newComment));
			// increment the comments length by 1
			setCommentLength(commentLength + 1);
			// add the comment to the UI
			setPostComments([sampleComment, ...postComments]);
			// clear out the comment text input field
			setMyCommentText("");
		}
	};

	return (
		<div>
			<div className="flex items-center w-full">
				<Avatar src={intro.pic} />
				<div className="relative ml-2 w-full">
					<input
						type="text"
						placeholder="comment on post"
						autoFocus={true}
						onKeyDown={handleComment}
						value={myCommentText}
						onChange={(e) => setMyCommentText(e.target.value)}
						className="w-full px-4 py-2 rounded-xl bg-gray-100 border focus:outline-none"
					/>
					<div className="absolute top-3 right-3 text-lg text-gray-500">
						<label htmlFor="gallery" className="hover:cursor-pointer">
							<RiGalleryLine />
						</label>
						<input
							type="file"
							id="gallery"
							className="hidden"
							onChange={(e) => handleGallery(e.target.files[0])}
						/>
					</div>
				</div>
			</div>
			<ReplyComponent intro={intro} postComments={postComments} />
		</div>
	);
};

export default CommentsList;
