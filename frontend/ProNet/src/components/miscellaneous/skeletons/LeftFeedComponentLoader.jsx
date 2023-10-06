import React from "react";
import { Skeleton } from "@mui/material";

const LeftFeedComponentLoader = () => {
	return (
		<div className="w-full">
			<Skeleton
				variant="rectangular"
				width="100%"
				height={300}
				sx={{ marginBottom: "30px" }}
			/>
			<Skeleton
				variant="rectangular"
				width="100%"
				height={500}
				sx={{ marginBottom: "10px" }}
			/>
		</div>
	);
};

export default LeftFeedComponentLoader;
