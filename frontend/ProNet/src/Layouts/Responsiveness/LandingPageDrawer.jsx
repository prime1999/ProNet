import { useState } from "react";
import { Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import { GrArticle } from "react-icons/gr";
import logo from "../../assets/images/png/logo.png";

const LandingPageDrawer = ({ children }) => {
	const [open, setOpen] = useState(false);
	// function to open the drawer
	const handleOpen = () => {
		setOpen(true);
	};
	// function to close the drawer
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			{children && <button onClick={handleOpen}>{children}</button>}
			<Drawer anchor="left" open={open} onClose={handleClose}>
				<div className="w-[300px]">
					<Link
						to="/"
						className="flex items-center font-black font-semibold p-8 text-4xl"
					>
						<img className="w-12" src={logo} alt="" />
						<h1 className="ml-2">ProNet</h1>
					</Link>
					<hr />
					<div className="flex flex-col items-start px-8 py-4 mt-8 ml-4 w-1/3 font-roboto text-xl">
						<Link className="flex justify-center items-center mb-8 duration-500 hover:text-gray-200">
							<GrArticle className="text-xl" />
							<h4 className="ml-4">Articles</h4>
						</Link>
						<Link className="flex justify-center items-center mb-8 duration-500 hover:text-gray-200">
							<GrArticle className="text-xl" />
							<h4 className="ml-4">People</h4>
						</Link>
						<Link className="flex justify-center items-center mb-8 duration-500 hover:text-gray-200">
							<GrArticle className="text-xl" />
							<h4 className="ml-4">Learning</h4>
						</Link>
						<Link className="flex justify-center items-center mb-8 duration-500 hover:text-gray-200">
							<GrArticle className="text-xl" />
							<h4 className="ml-4">Jobs</h4>
						</Link>
					</div>
					<hr />
					<div className="flex justify-between items-center ml-4 font-roboto py-8 px-2 font-semibold w-48">
						<Link className="duration-500 hover:text-gray-400">LogIn</Link>
						<Link className="py-2 px-4 duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:bg-gradient-to-r hover:from-pink hover:to-orange">
							Get Started
						</Link>
					</div>
				</div>
			</Drawer>
		</>
	);
};

export default LandingPageDrawer;
