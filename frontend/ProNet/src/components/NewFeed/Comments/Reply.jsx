import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import { RiGalleryLine } from "react-icons/ri";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { createComment } from "../../../features/Comments/CommentSlice";

const Reply = ({
	intro,
	comment,
	newReplyLength,
	setNewReplyLength,
	setCommentReply,
}) => {
	const [myReplyText, setMyReplyText] = useState("");
	const dispatch = useDispatch();

	// function to give reply to a comment
	const handleReply = (event) => {
		if (event.key === "Enter" && myReplyText) {
			let sampleReply = {
				_id: Date.now(),
				author: {
					_id: Math.floor(Math.random * 10),
					firstName: intro.firstName,
					lastName: intro.lastName,
					pic: intro.pic,
				},
				content: myReplyText,
				likes: [],
				media: "",
				parentCommentId: comment._id,
				replies: [],
			};
			let newReply = {
				content: myReplyText,
				parentCommentId: comment._id,
			};
			dispatch(createComment(newReply));
			setNewReplyLength(newReplyLength + 1);
			setCommentReply(sampleReply);
			setMyReplyText("");
		}
	};
	return (
		<div className="mt-4 w-full">
			<div className="flex items-center w-full">
				<Avatar src={intro.pic} />
				<div className="relative ml-2 w-full">
					<input
						type="text"
						placeholder="reply to comment"
						autoFocus={true}
						onKeyDown={handleReply}
						value={myReplyText}
						onChange={(e) => setMyReplyText(e.target.value)}
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
							//onChange={(e) => handleGallery(e.target.files[0])}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Reply;
