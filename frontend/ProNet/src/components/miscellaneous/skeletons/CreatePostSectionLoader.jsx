import React from "react";
import { Skeleton } from "@mui/material";

const CreatePostSectionLoader = () => {
	return (
		<div className="w-full">
			<Skeleton
				variant="rectangular"
				width="100%"
				height={200}
				sx={{ marginBottom: "10px" }}
			/>
		</div>
	);
};

export default CreatePostSectionLoader;
