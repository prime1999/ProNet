import React from "react";
import { Grid } from "@mui/material";
import ChatUsers from "../../components/Chat/ChatUsers";
import MessageBox from "../../components/Chat/MessageBox";

const ChatRoom = () => {
	return (
		<div className="bg-gray-50">
			<div className="container mx-auto">
				<Grid container spacing={2}>
					<Grid item xs={6} md={3}>
						<ChatUsers />
					</Grid>
					<Grid item xs={6} md={6}>
						<MessageBox />
					</Grid>
					<Grid item xs={6} md={3}>
						<div>xs=6 md=4</div>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default ChatRoom;
