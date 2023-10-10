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
	// init the useDispatch function
	const dispatch = useDispatch();

	// function to give reply to a comment
	const handleReply = (event) => {
		// check if the enter is the one clicked and if the input field has been filled
		if (event.key === "Enter" && myReplyText) {
			// set a sample reply data to show on the UI untill thee one from the backend is gotten
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
			// send the reply to the backend
			dispatch(createComment(newReply));
			// increment the replies length by 1
			setNewReplyLength(newReplyLength + 1);
			// set the comment Reply yo the reply from the user for in other to change the UI
			setCommentReply(sampleReply);
			// clear the input field
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
