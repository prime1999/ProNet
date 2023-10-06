import React from "react";
import { Skeleton } from "@mui/material";

const RightFeedComponentLoader = () => {
	return (
		<div className="w-full">
			<Skeleton
				variant="rectangular"
				width="100%"
				height={200}
				sx={{ marginBottom: "30px" }}
			/>
			<Skeleton
				variant="rectangular"
				width="100%"
				height={500}
				sx={{ marginBottom: "10px" }}
			/>
			<Skeleton
				variant="rectangular"
				width="100%"
				height={100}
				sx={{ marginBottom: "10px" }}
			/>
		</div>
	);
};

export default RightFeedComponentLoader;
