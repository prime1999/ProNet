import React from "react";
import { Skeleton } from "@mui/material";

const FeedListsLazyLoader = () => {
	return (
		<div>
			<div className="flex items-center mb-4">
				{/* For other variants, adjust the size with `width` and `height` */}
				<Skeleton variant="circular" width={50} height={50} />
				{/* For variant="text", adjust the height via font-size */}
				<div>
					<Skeleton
						variant="text"
						sx={{ width: "150px", marginLeft: "10px" }}
					/>
					<Skeleton
						variant="text"
						sx={{ width: "150px", marginLeft: "10px" }}
					/>
				</div>
			</div>
			<Skeleton
				variant="rectangular"
				width="100%"
				height={300}
				sx={{ marginBottom: "10px" }}
			/>
			<hr className="my-4" />
		</div>
	);
};

export default FeedListsLazyLoader;
