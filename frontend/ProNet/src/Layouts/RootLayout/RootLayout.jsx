import React from "react";
import MenuBar from "./MenuBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<div>
			<MenuBar />
			<div className="">
				<Outlet />
			</div>
		</div>
	);
};

export default RootLayout;
