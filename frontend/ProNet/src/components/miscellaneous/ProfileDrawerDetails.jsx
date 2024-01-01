import React from "react";
import { Link } from "react-router-dom";
import { BiMessageRounded } from "react-icons/bi";
import { BsPersonWorkspace, BsFillPeopleFill } from "react-icons/bs";
import { GrArticle } from "react-icons/gr";
import { FiMoreVertical } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import logo from "../../assets/images/png/logo.png";
import CurrentUser from "../CurrentUser";

const ProfileDrawerDetails = () => {
	return (
		<div className="w-[240px] px-8 py-8">
			{/* <Link
				to="/"
				className="flex items-center font-black font-semibold text-3xl"
			>
				<img className="w-8" src={logo} alt="" />
				<h1 className="ml-2">ProNet</h1>
			</Link> */}
			<div>
				<CurrentUser />
			</div>
			<div className="flex flex-col items-start mt-8 text-darkBlue font-poppins font-bold">
				<Link className="flex items-center h-8 duration-400 px-4 py-1 rounded-md w-full hover:bg-light">
					<GrArticle />
					<p className="ml-2">Feeds</p>
				</Link>
				<Link className="flex items-center my-4 h-8 duration-400 px-4 py-1 rounded-md w-full hover:bg-light">
					<BsPersonWorkspace />
					<p className="ml-2">Jobs</p>
				</Link>
				<Link
					to="/people"
					className="flex items-center h-8 duration-400 px-4 py-1 rounded-md w-full hover:bg-light"
				>
					<BsFillPeopleFill />
					<p className="ml-2">People</p>
				</Link>
				<Link
					to="/more"
					className="flex items-center my-4 h-8 duration-400 px-4 py-1 rounded-md w-full hover:bg-light"
				>
					<FiMoreVertical />
					<p className="ml-2">More</p>
				</Link>
			</div>
			<div className="flex items-start flex-col font-bold text-lg text-darkBlue ">
				<Link className="flex items-center justify-start px-4 py-1 rounded-md w-full hover:bg-light">
					<RxDashboard className="text-2xl" />
					<p className="text-sm ml-2">Works</p>
				</Link>
				<Link
					to="/chats"
					className="flex items-center justify-start my-4 px-4 py-1 rounded-md w-full hover:bg-light"
				>
					<BiMessageRounded className="text-2xl" />
					<p className="text-sm ml-2">Messages</p>
				</Link>
				<Link className="flex items-center justify-start px-4 py-1 rounded-md w-full hover:bg-light">
					<IoMdNotificationsOutline className="text-2xl" />
					<p className="text-sm ml-2">Notifications</p>
				</Link>
			</div>
		</div>
	);
};

export default ProfileDrawerDetails;
