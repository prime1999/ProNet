import React from "react";
import { Skeleton } from "@mui/material";

const MenuBarLoader = () => {
	return (
		<div className="w-full bg-gray-40">
			<div className="flex items-center justify-between w-11/12 mx-auto p-4">
				<Skeleton variant="rectangular" width={130} height={50} sx={{}} />
				<Skeleton variant="rectangular" width={300} height={50} sx={{}} />
				<Skeleton
					variant="rectangular"
					width={300}
					height={50}
					sx={{ borderRadius: "10px" }}
				/>
				<div className="flex items-center jjustify-between">
					<Skeleton variant="rectangular" width={180} height={50} sx={{}} />
					<Skeleton
						variant="circular"
						width={50}
						height={50}
						sx={{ marginLeft: "10px" }}
					/>
				</div>
				<Skeleton
					variant="rectangular"
					width={120}
					height={50}
					sx={{ borderRadius: "10px" }}
				/>
			</div>
		</div>
	);
};

export default MenuBarLoader;
