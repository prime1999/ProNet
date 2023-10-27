import React from "react";
import { Grid } from "@mui/material";
import ChatUsers from "../../components/Chat/ChatUsers";

const ChatRoom = () => {
	return (
		<div className="container mx-auto">
			<Grid container spacing={2}>
				<Grid xs={6} md={2}>
					<ChatUsers />
				</Grid>
				<Grid xs={6} md={8}>
					<div>xs=6 md=4</div>
				</Grid>
				<Grid xs={6} md={2}>
					<div>xs=6 md=4</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default ChatRoom;
