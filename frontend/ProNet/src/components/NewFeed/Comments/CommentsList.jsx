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
import Reply from "./Reply";

const CommentsList = ({ postId, intro, setCommentLength, commentLength }) => {
	const [replyToComment, setReplyToComment] = useState("");
	const [postComments, setPostComments] = useState(null);
	const [commentReply, setCommentReply] = useState(null);

	const [myCommentText, setMyCommentText] = useState("");

	const [newReplyLength, setNewReplyLength] = useState(0);

	const dispatch = useDispatch();

	const { comments, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.comments
	);

	useEffect(() => {
		dispatch(getComments(postId));
	}, []);

	useEffect(() => {
		if (isSuccess) {
			setPostComments(comments);
		}
		dispatch(reset());
	}, [isSuccess]);

	// function to comment on  post
	const handleComment = (event) => {
		if (event.key === "Enter" && myCommentText) {
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
			dispatch(createComment(newComment));
			setCommentLength(commentLength + 1);
			setPostComments([sampleComment, ...postComments]);
			setMyCommentText("");
		}
	};

	const handleReplyLength = (comment) => {
		return comment.replies.length + newReplyLength;
	};

	// used this function to get the comment replies inorder for me to be able to modify it later
	const handleCommentReplies = useCallback(
		(comment) => {
			let replies = [];
			if (commentReply !== null) {
				replies = [commentReply, ...comment?.replies];
			} else {
				replies = [...comment?.replies];
			}
			return replies;
		},
		[commentReply] // added the commentReply (the new reply) as a dependency
	);

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
			<div className="mt-4">
				{postComments &&
					postComments?.map((comment) => (
						<div key={comment._id} className="flex items-start mb-4 w-full">
							<Avatar src={comment.author.pic} />
							<div className="ml-4 w-full">
								<h6 className="font-semibold">{`${comment.author.firstName} ${comment.author.lastName}`}</h6>
								{/* <p>to add the user's  headline</p> */}
								<p className="text-gray-700">{comment.content}</p>
								<div className="flex items-center mt-2 text-sm text-gray-400">
									<p className="hover:cursor-pointer">
										Like{" "}
										{comment.likes.length !== 0 && (
											<span>
												<BsFillHandThumbsUpFill />{" "}
												{`${comment.likes.length} likes`}
											</span>
										)}{" "}
									</p>
									<p className="mx-2">|</p>
									<p>
										<span
											onClick={() => setReplyToComment(comment._id)}
											className="hover:cursor-pointer"
										>
											Reply{" "}
										</span>
										{comment.replies.length !== 0 && (
											<span>{`${handleReplyLength(comment)} reply`}</span>
										)}{" "}
									</p>
								</div>
								{replyToComment === comment._id && (
									<div className="w-full">
										{replyToComment && (
											<Reply
												intro={intro}
												comment={comment}
												newReplyLength={newReplyLength}
												setCommentReply={setCommentReply}
												setNewReplyLength={setNewReplyLength}
											/>
										)}
									</div>
								)}
								{comment.replies.length !== 0 && (
									<div className="mt-4">
										<hr className="mb-4" />
										{handleCommentReplies(comment).map((reply) => (
											<div key={reply._id} className="flex items-start my-2">
												<Avatar src={reply.author.pic} />
												<div className="ml-4">
													<h6 className="font-semibold">{`${reply.author.firstName} ${reply.author.lastName}`}</h6>
													{/* <p>to add the user's  headline</p> */}
													<p className="text-gray-700">{reply.content}</p>
													<div className="flex items-center mt-2 text-sm text-gray-400">
														<p className="hover:cursor-pointer">
															Like{" "}
															{reply.likes.length !== 0 && (
																<span>
																	<BsFillHandThumbsUpFill />{" "}
																	{`${reply.likes.length} likes`}
																</span>
															)}{" "}
														</p>
														<p className="mx-2">|</p>
														<p className="">
															<span className="hover:cursor-pointer">
																Reply{" "}
															</span>
															{reply.replies.length !== 0 && (
																<span>{`${reply.replies.length} reply`}</span>
															)}{" "}
														</p>
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default CommentsList;
