import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { GrAttachment } from "react-icons/gr";
import { FaSmile } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import ScrollableChat from "./ScrollableChat";
import { getMessages, sendMessage } from "../../features/Messages/MessageSlice";
import { sendNotification } from "../../features/Notifications/NotificationSlice";

// the backend url
const ENDPOINT = "http://localhost:8000";
let socket, selectedChatCompare;

const MessageBox = () => {
	// init the useDispatch hook
	const dispatch = useDispatch();
	const [connected, setConnected] = useState(false);
	// get the selectedChat from the chat in the redux store
	const { selectedChat } = useSelector((state) => state.chat);
	// get the chatMessage and the messages of a chat from the messages store in the redux store
	const { chatMessage, messages } = useSelector((state) => state.messages);
	// get the user info from the redux store
	const { user } = useSelector((state) => state.auth);
	// state for the value of the messge to be sent to a chat
	const [newMessage, setNewMessage] = useState("");

	useEffect(() => {
		// instatntiate the socket to the backend api url
		socket = io(ENDPOINT);
		// send the user details in order to setup the user's room
		socket.emit("setup", user);
		// listen to the socket  instance to connect the user from the backend
		socket.on("connected", () => {
			setConnected(true);
		});
	}, []);

	useEffect(() => {
		// check if a chat has been selected
		if (selectedChat) {
			// if yes then dispatch the getMessages function
			dispatch(getMessages(selectedChat._id));
			selectedChatCompare = selectedChat;
			// emit a socket instance to join chat
			socket.emit("join chat", selectedChat._id);
		}
	}, [selectedChat, messages]);

	useEffect(() => {
		// check if a new message has been sent
		if (chatMessage) {
			// if yes, then emit the socket instance to handle the new message in real time
			socket.emit("new message", chatMessage);
		}
	}, [chatMessage]);
	// function to send a message
	const handleMessage = (e) => {
		// prevent the default form sunmission process
		e.preventDefault();
		// if the input has been filled
		if (newMessage !== "") {
			// dispatch the  function to send a new message to the chat room
			dispatch(sendMessage({ content: newMessage, chatId: selectedChat._id }));
		}
		// clear out the message field
		setNewMessage("");
	};

	useEffect(() => {
		// listen to the socket from another user that is sending a message
		socket.on("message received", (messageReceived) => {
			if (
				!selectedChatCompare ||
				selectedChatCompare._id !== messageReceived.chat._id
			) {
				dispatch(
					sendNotification({
						message: messageReceived.content,
						chatId: messageReceived.chat._id,
					})
				);
			}
			// dispatch get messages function again to get the message in real time
			dispatch(getMessages(messageReceived.chat._id));
		});
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
