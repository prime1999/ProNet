import React from "react";
import { Link } from "react-router-dom";
import { GrArticle } from "react-icons/gr";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../../assets/images/png/logo.png";
import LandingPageDrawer from "../Responsiveness/LandingPageDrawer";

const NavBar = () => {
	// for the drwaer on mobile screen
	const isSmallerThanMd = useMediaQuery((theme) =>
		theme.breakpoints.down("md")
	);
	return (
		<div className="w-full p-4 flex justify-between items-center">
			<Link
				to="/"
				className="flex items-center font-black font-semibold text-4xl"
			>
				<img className="w-12" src={logo} alt="" />
				<h1 className="ml-2">ProNet</h1>
			</Link>
			{!isSmallerThanMd && (
				<div className="flex items-center justify-between w-1/3 font-roboto text-md">
					<Link className="flex flex-col justify-center items-center duration-500 hover:text-gray-200">
						<GrArticle className="text-xl" />
						<h4>Articles</h4>
					</Link>
					<Link className="flex flex-col justify-center items-center duration-500 hover:text-gray-200">
						<GrArticle className="text-xl" />
						<h4>People</h4>
					</Link>
					<Link className="flex flex-col justify-center items-center duration-500 hover:text-gray-200">
						<GrArticle className="text-xl" />
						<h4>Learning</h4>
					</Link>
					<Link className="flex flex-col justify-center items-center duration-500 hover:text-gray-200">
						<GrArticle className="text-xl" />
						<h4>Jobs</h4>
					</Link>
				</div>
			)}
			{!isSmallerThanMd && (
				<div className="flex justify-between items-center font-roboto font-semibold w-48">
					<Link className="duration-500 hover:text-gray-400">LogIn</Link>
					<Link className="py-2 px-4 rounded-md duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:bg-gradient-to-r hover:from-pink hover:to-orange">
						Get Started
					</Link>
				</div>
			)}
			{isSmallerThanMd && (
				<LandingPageDrawer>
					<AiOutlineMenuUnfold className="text-3xl hover:cursor-pointer" />
				</LandingPageDrawer>
			)}
		</div>
	);
};

export default NavBar;
