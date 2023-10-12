import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import { RiGalleryLine } from "react-icons/ri";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import Reply from "../../../../NewFeed/Comments/Reply";

const ReplyComponent = ({ postComments, intro }) => {
	const [likes, setLikes] = useState(null);
	const [liked, setLiked] = useState(false);
	// state for show the reply input field by using the comment id
	const [replyToComment, setReplyToComment] = useState("");
	// state to store the reply by the user temporarily in other to show it on the UI
	const [commentReply, setCommentReply] = useState(null);
	// state to increment the reply length by
	const [newReplyLength, setNewReplyLength] = useState(0);
	// function to change the replies length
	const handleReplyLength = (comment) => {
		return comment.replies.length + newReplyLength;
	};

	// used this function to get the comment replies inorder for me to be able to modify it later
	const handleCommentReplies = useCallback(
		(comment) => {
			// init a replies variable dto an empty array
			let replies = [];
			// if there has been a reply text, then
			if (commentReply !== null) {
				// add the reply to the comments replies and savethem in the replies array
				replies = [commentReply, ...comment?.replies];
			} else {
				// save only the initial replies in the replies array
				replies = [...comment?.replies];
			}
			// return the replies array
			return replies;
		},
		[commentReply] // added the commentReply (the new reply) as a dependency
	);

	return (
		<div>
			{" "}
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
										<Reply
											intro={intro}
											comment={comment}
											newReplyLength={newReplyLength}
											setCommentReply={setCommentReply}
											setNewReplyLength={setNewReplyLength}
										/>
									</div>
								)}
								{comment.replies.length !== 0 && (
									<div className="mt-4">
										<hr className="mb-4" />
										{handleCommentReplies(comment).map((reply) => (
											<div key={reply._id} className="flex items-start my-2">
												<Avatar src={reply.author.pic} />
												<div className="ml-4 w-full">
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
															<span
																onClick={() => setReplyToComment(reply._id)}
																className="hover:cursor-pointer"
															>
																Reply{" "}
															</span>
															{reply.replies.length !== 0 && (
																<span>{`${reply.replies.length} reply`}</span>
															)}{" "}
														</p>
													</div>
													{replyToComment === reply._id && (
														<div className="w-full">
															<Reply
																intro={intro}
																comment={reply}
																newReplyLength={newReplyLength}
																setCommentReply={setCommentReply}
																setNewReplyLength={setNewReplyLength}
															/>
														</div>
													)}
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

export default ReplyComponent;
