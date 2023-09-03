import React from "react";
import { Snackbar, Alert } from "@mui/material";

const NotificationAlert = ({ open, message, severity, onClose }) => {
	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				autoHideDuration={5000}
				open={open}
				onClose={onClose}
			>
				<Alert onClose={onClose} severity={severity}>
					{message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default NotificationAlert;
