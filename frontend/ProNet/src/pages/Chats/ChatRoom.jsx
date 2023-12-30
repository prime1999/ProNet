import React from "react";
import { Grid } from "@mui/material";
import ChatUsers from "../../components/Chat/ChatUsers";
import MessageBox from "../../components/Chat/MessageBox";

const ChatRoom = () => {
	return (
		<div className="bg-gray-50">
			<div className="container mx-auto">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={4} md={4}>
						<ChatUsers />
					</Grid>
					<Grid item xs={12} sm={8} md={8}>
						<MessageBox />
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default ChatRoom;
