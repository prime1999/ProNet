import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactScrollableFeed from "react-scrollable-feed";
import { Avatar } from "@mui/material";
import { getMessages } from "../../features/Messages/MessageSlice";
import {
	isCurrentUser,
	isLastMessage,
	isSameSender,
	isSameSenderMargin,
	isSameUser,
} from "../../config/MessageLogics";

const ScrollableChat = () => {
	const { messages } = useSelector((state) => state.messages);
	const { user } = useSelector((state) => state.auth);

	return (
		<>
			<ReactScrollableFeed>
				{messages &&
					messages.map((message, index) => (
						<div key={message._id} className="w-full flex items-start p-2">
							<div
								className={`w-full flex ${
									message.sender._id === user._id
										? "flex-row-reverse"
										: "flex-row"
								} ${isSameUser(messages, message, index) ? "-mt-2" : "mt-4"}`}
							>
								{isSameSender(messages, message, index, user._id) && (
									<Avatar
										src={message.sender.pic}
										className={`${
											message.sender._id === user._id ? "ml-2" : "mr-2"
										}`}
									/>
								)}

								<p
									className={`mt-2 py-1 px-3 ${
										message.sender._id === user._id
											? "bg-darkBlue rounded-l-2xl text-white"
											: "bg-gray-100 rounded-r-2xl text-darkBlue"
									}`}
								>
									{message.content}
								</p>
							</div>
						</div>
					))}
			</ReactScrollableFeed>
		</>
	);
};

export default ScrollableChat;
