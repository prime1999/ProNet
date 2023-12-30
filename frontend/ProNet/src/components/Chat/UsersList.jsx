import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { accessChat } from "../../features/Chat/ChatSlice";

const UsersList = ({ userChats }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const handleChat = (userId) => {
		dispatch(accessChat(userId));
	};

	return (
		<>
			<div className="">
				{userChats.map((one) => (
					<div key={one._id} className="">
						<div>
							{one.users.map(
								(u) =>
									u._id !== user._id && (
										<div
											onClick={() => handleChat(u._id)}
											key={u._id}
											className="flex mt-4 p-2 border duration-500 rounded-md shadow-md hover:bg-light hover:cursor-pointer"
										>
											<img
												src={u.pic}
												alt={u.firstName}
												className="w-12 rounded-full"
											/>
											<div className="ml-4 font-poppins font-semibold text-lg">
												<h6>{`${u.firstName} ${u.lastName}`}</h6>
												<p className="text-gray-300 text-sm font-normal">
													{one?.latestMessage?.content}
												</p>
											</div>
										</div>
									)
							)}
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default UsersList;
