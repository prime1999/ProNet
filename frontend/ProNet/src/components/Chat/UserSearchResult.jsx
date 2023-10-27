import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../features/Auth/AuthSlice";
import { accessChat } from "../../features/Chat/ChatSlice";

const UserSearchResult = ({ searchedUsers }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		reset();
	}, []);

	const handleChat = (userId) => {
		console.log(userId);
		dispatch(accessChat(userId));
	};
	return (
		<>
			<div className="mt-8 p-2 shadow-sm rounded-md border duration-500 hover:cursor-pointer hover:bg-light hover:border-none">
				{searchedUsers.map((u) => (
					<div onClick={() => handleChat(u._id)} key={u._id} className="flex">
						<img src={u.pic} alt={u.firstName} className="w-12 rounded-full" />
						<div className="ml-4 font-poppins font-semibold text-lg">
							<h6>{`${u.firstName} ${u.lastName}`}</h6>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default UserSearchResult;
