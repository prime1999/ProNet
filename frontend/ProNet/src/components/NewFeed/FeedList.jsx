import { useState, lazy, Suspense } from "react";
import { BiMessage } from "react-icons/bi";
import {
	BsFillHandThumbsUpFill,
	BsHandThumbsUp,
	BsShareFill,
	BsFillSendFill,
} from "react-icons/bs";
import { Avatar, Skeleton } from "@mui/material";
import CommentsList from "./Comments/CommentsList";

const FileSwiper = lazy(() => import("../FileSwiper"));

const FeedList = ({ post }) => {
	const [toComment, setToComment] = useState("");
	const [showComments, setShowComments] = useState([]);

	const handleShowCommentSection = (id) => {
		// Check if the post's comments are currently displayed
		const isPostDisplayed = showComments.includes(id);

		if (isPostDisplayed) {
			// If displayed, hide the post's comments
			const updatedShowComments = showComments.filter((id) => id !== id);
			setShowComments(updatedShowComments);
		} else {
			// If not displayed, show the post's comments
			setShowComments((prevState) => [...prevState, id]);
		}
	};
	return (
		<div>
			<div className="w-full mt-4 bg-white shadow-sm p-4">
				<div className="w-full">
					<div className="flex items-center">
						<Avatar
							sx={{ width: "48px", height: "48px" }}
							src={post.details.author.pic}
						/>
						<div className="ml-2">
							<h6 className="font-bold font-poppins">{post.name}</h6>
							<p className="text-gray-300 text-sm">{post.headLine}</p>
							{/* get the time of the post */}
						</div>
					</div>
					<div className="mt-2 p-4 text-sm font-semibold">
						<p>{post.details.content}</p>
					</div>
					<div>
						<Suspense
							fallback={
								<>
									<Skeleton variant="rectangular" width={"100%"} height={300} />
								</>
							}
						>
							<FileSwiper media={post.details.media} />
						</Suspense>
					</div>
					<div className="w-11/12 mx-auto flex items-cente justify-between mt-4">
						<div className="text-sm text-gray-400 hover:cursor-pointer hover:border-b">
							{post.details.likes.length !== 0 && (
								<div>{`${post.details.likes.length} Likes`}</div>
							)}
						</div>
						<div className="text-sm text-gray-400 hover:cursor-pointer hover:border-b">
							{post.details.comments.length !== 0 && (
								<div>{`${post.details.comments.length} Comments`}</div>
							)}
						</div>
					</div>
					<div className="mt-4 px-4 py-2">
						<hr />
						<div className="mt-4 flex items-center justify-between">
							<div
								onClick={() => handleShowCommentSection(post.details._id)}
								className="flex items-center hover:text-blue-500 hover:cursor-pointer"
							>
								<BiMessage className="" />{" "}
								<p className="text-gray-700 text-xs ml-1 md:text-sm">Comment</p>
							</div>
							<div className="flex items-center hover:text-red-500 hover:cursor-pointer">
								<BsHandThumbsUp />{" "}
								<p className="text-gray-700 text-xs ml-1 md:text-sm">like</p>
							</div>
							<div className="flex items-center hover:text-blue-800 hover:cursor-pointer">
								<BsShareFill />{" "}
								<p className="text-gray-700 text-xs ml-1 md:text-sm">Share</p>
							</div>
							<div className="flex items-center hover:text-blue-200 hover:cursor-pointer">
								<BsFillSendFill />{" "}
								<p className="text-gray-700 text-xs ml-1 md:text-sm">Repost</p>
							</div>
						</div>
					</div>
				</div>
				{showComments.includes(post.details._id) && (
					<div className="mt-8">
						<CommentsList postId={post.details._id} />
					</div>
				)}
			</div>
		</div>
	);
};

export default FeedList;
