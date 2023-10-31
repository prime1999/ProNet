import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { GrAttachment } from "react-icons/gr";
import { FaSmile } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import ScrollableChat from "./ScrollableChat";
import {
	getMessages,
	reset,
	sendMessage,
	setMessage,
} from "../../features/Messages/MessageSlice";

const ENDPOINT = "http://localhost:8000";

let socket;

const MessageBox = () => {
	const dispatch = useDispatch();
	const [connected, setConnected] = useState(false);
	const { selectedChat } = useSelector((state) => state.chat);
	const { chatMessage, messages } = useSelector((state) => state.messages);
	const { user } = useSelector((state) => state.auth);

	const [newMessage, setNewMessage] = useState("");

	useEffect(() => {
		// instatntiate the socket to the backend api url
		socket = io(ENDPOINT);
		// send the user details in order to setup the user's room
		socket.emit("setup", user);
		socket.on("connected", () => {
			setConnected(true);
		});
	}, []);

	useEffect(() => {
		if (selectedChat) {
			dispatch(getMessages(selectedChat._id));
			socket.emit("join chat", selectedChat._id);
		}
	}, [selectedChat, messages]);

	useEffect(() => {
		if (chatMessage) {
			socket.emit("new message", chatMessage);
		}
	}, [chatMessage]);

	const handleMessage = (e) => {
		e.preventDefault();

		if (newMessage !== "") {
			dispatch(sendMessage({ content: newMessage, chatId: selectedChat._id }));
		}
		setNewMessage("");
	};

	useEffect(() => {
		socket.on("message received", (messageReceived) => {
			dispatch(getMessages(messageReceived.chat._id));
		});
		console.log(messages);
		// Clean up the event listener when the component unmounts
		return () => {
			socket.off("message received");
		};
	}, [chatMessage]);

	return (
		<div className="h-screen relative p-2 py-4 overflow-auto">
			{selectedChat ? (
				<>
					<div className="w-full h-full">
						<div className="px-4 h-[95%]">
							{selectedChat.users.map(
								(u) =>
									u._id !== user._id && (
										<div key={u._id} className="flex justify-between">
											<div className="flex">
												<img
													src={u.pic}
													alt={u.firstName}
													className="w-12 rounded-full border-3 border-white shadow-md"
												/>
												<p className="font-semibold ml-4">{`${u.firstName} ${u.lastName}`}</p>
											</div>
											<div className="">
												<BsThreeDotsVertical />
											</div>
										</div>
									)
							)}

							<ScrollableChat />
						</div>
						<form
							onSubmit={handleMessage}
							className="bg-white h-14 mt-8 w-full flex items-center"
						>
							<div className="relative flex items-center justify-center text-gray-500 w-10/12 mx-auto h-full">
								<input
									type="text"
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									className="bg-gray-200 w-full h-[70%] px-10 rounded-3xl focus:outline-none"
								/>
								<GrAttachment className="absolute left-5" />
								<FaSmile className="absolute right-5" />
							</div>
							<button className="rounded-full mr-4 p-2 w-8 h-8 duration-500 bg-gradient-to-r from-orange to-pink hover:bg-gradient-to-r hover:from-pink hover:to-orange hover:cursor-pointer">
								<BsFillSendFill />
							</button>
						</form>
					</div>
				</>
			) : (
				<div className="flex items-center justify-center text-gray-300 h-full">
					<h1 className="text-4xl">No Chats Selected</h1>
				</div>
			)}
		</div>
	);
};

export default MessageBox;
