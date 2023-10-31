import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiPlus } from "react-icons/bi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { MdCancel } from "react-icons/md";
import { searchUsers } from "../../features/Auth/AuthSlice";
import { getChats, reset } from "../../features/Chat/ChatSlice";
import UsersList from "./UsersList";
import UserSearchResult from "./UserSearchResult";
import NotificationAlert from "../miscellaneous/NotificationAlert";

const ChatUsers = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState("");
	const [userChats, setUserChats] = useState(null);
	const [searchedUsers, setSearchedUsers] = useState(null);
	const [fetchChatsAgain, setFetchChatsAgain] = useState(false);

	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	const { chats, isLoading, isSuccess } = useSelector((state) => state.chat);
	const { users, isError, message } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getChats());
	}, [fetchChatsAgain]);

	useEffect(() => {
		if (isSuccess) {
			setUserChats(chats);
			reset();
		}
	}, [isSuccess, fetchChatsAgain]);

	useEffect(() => {
		if (users) {
			setUserChats(null);
			setSearchedUsers(users);
		}
	}, [users]);

	const handleSearch = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			if (value !== "") {
				const text = value;
				dispatch(searchUsers(text));
			} else {
				handleShowSnackbar("error", "Invalid search data");
			}
		}
		if (isError) {
			handleShowSnackbar("error", message);
		}
	};

	const clearSearch = () => {
		setValue("");
		setSearchedUsers(null);
		dispatch(getChats());
		setFetchChatsAgain(!fetchChatsAgain);
	};

	// function to show snack-bar alert
	const handleShowSnackbar = (severity, message) => {
		setOpenAlert(true);
		setAlertSeverity(severity);
		setAlertMessage(message);
	};

	return (
		<div className="px-2">
			<div className="flex items-center justify-between">
				<h6 className="font-poppins font-bold text-3xl">Chats</h6>
				<button className="rounded-full p-2 w-8 h-8 font-dosis font-semiBold duration-500 bg-gradient-to-r from-orange to-pink hover:bg-gradient-to-r hover:from-pink hover:to-orange">
					<BiPlus />
				</button>
			</div>
			<form className="relative mt-4">
				<input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={handleSearch}
					placeholder="Search chats or start a chat"
					className="w-full rounded-3xl p-2 px-5 pl-7 bg-transparent shadow-md focus:outline-none"
				/>
				<HiMagnifyingGlass className="absolute top-3 left-2" />
				{searchedUsers && (
					<MdCancel
						onClick={clearSearch}
						className="absolute top-3 right-0 hover:cursor-pointer"
					/>
				)}
				<NotificationAlert
					open={openAlert}
					message={alertMessage}
					severity={alertSeverity}
					onClose={() => setOpenAlert(false)}
				/>
			</form>
			{userChats && <UsersList userChats={userChats} />}
			{searchedUsers && <UserSearchResult searchedUsers={searchedUsers} />}
		</div>
	);
};

export default ChatUsers;
