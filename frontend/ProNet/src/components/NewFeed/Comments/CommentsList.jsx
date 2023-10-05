import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import { RiGalleryLine } from "react-icons/ri";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { getComments, reset } from "../../../features/Comments/CommentSlice";

const CommentsList = ({ postId }) => {
	const [postComments, setPostComments] = useState(null);
	const dispatch = useDispatch();

	const { comments, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.comments
	);

	useEffect(() => {
		if (isSuccess) {
			setPostComments(comments);
		}

		dispatch(reset());
	}, [isSuccess]);

	useEffect(() => {
		dispatch(getComments(postId));
	}, []);

	return (
		<div>
			<div className="relative">
				<input
					type="text"
					placeholder="comment on post"
					autoFocus={true}
					className="w-full px-4 py-2 rounded-xl bg-gray-100 border focus:outline-none"
				/>
				<div className="absolute top-3 right-3 text-lg text-gray-500">
					<label htmlFor="gallery" className="hover:cursor-pointer">
						<RiGalleryLine />
					</label>
					<input type="file" id="gallery" className="hidden" />
				</div>
			</div>
			<div className="mt-4">
				{postComments &&
					postComments?.map((comment) => (
						<div key={comment._id} className="flex items-start">
							<Avatar src={comment.author.pic} />
							<div className="ml-4">
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
									<p className="hover:cursor-pointer">
										Reply{" "}
										{comment.replies.length !== 0 && (
											<span>{`${comment.replies.length} reply`}</span>
										)}{" "}
									</p>
								</div>
								{comment.replies.length !== 0 && (
									<div className="mt-4">
										<hr className="mb-4" />
										{comment.replies.map((reply) => (
											<div key={reply._id} className="flex items-start">
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
														<p className="hover:cursor-pointer">
															Reply{" "}
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
