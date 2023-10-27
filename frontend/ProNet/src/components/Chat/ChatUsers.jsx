import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchUsers } from "../../features/Auth/AuthSlice";

const ChatUsers = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const text = "john";
		dispatch(searchUsers(text));
	}, []);

	return <div>ChatUsers</div>;
};

export default ChatUsers;
