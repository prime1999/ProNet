import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PiMagnifyingGlass } from "react-icons/pi";
import { BiMessageRounded, BiMenuAltLeft } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { Avatar, Menu, MenuItem, Drawer } from "@mui/material";
import logo from "../../assets/images/png/logo.png";
import ProfileDrawerDetails from "../../components/miscellaneous/ProfileDrawerDetails";
import { logUserOut } from "../../features/Auth/AuthSlice";

const MenuBar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// for the drawer
	const [open, setOpen] = useState(false);

	// for the dropdown menu
	const [anchorEl, setAnchorEl] = useState(null);
	const openDrop = Boolean(anchorEl);

	// check the sentCode and verify variable in the redux store
	const { user } = useSelector((state) => state.auth);

	// function to open the side drawer
	const handleOpen = () => {
		setOpen(true);
	};

	// function to close the side drawer
	const handleClose = () => {
		setOpen(false);
	};

	// functions for the menuItem
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleCloseDropDown = () => {
		setAnchorEl(null);
	};

	const handleLogOut = () => {
		dispatch(logUserOut());
		navigate("/login");
	};

	return (
		<>
			<div className="container flex items-center justify-between flex-col mx-auto p-4 md:flex-row">
				<div className="flex items-center justify-between w-full mb-8 md:m-0 md:hidden">
					<BiMenuAltLeft
						onClick={handleOpen}
						className="text-3xl text-darkBlue hover:cursor-pointer"
					/>
					<Link
						to="/"
						className="flex items-center font-black font-semibold text-3xl"
					>
						<img className="w-8" src={logo} alt="" />
						<h1 className="ml-2">ProNet</h1>
					</Link>
				</div>
				<Link
					to="/"
					className="hidden md:flex items-center font-black font-semibold text-3xl"
				>
					<img className="w-8" src={logo} alt="" />
					<h1 className="ml-2">ProNet</h1>
				</Link>
				<div className="hidden lg:flex items-center justify-between text-darkBlue font-poppins font-bold">
					<Link className="h-6 duration-200 hover:border-b-2 hover:border-darkBlue">
						Feeds
					</Link>
					<Link className="mx-4 h-6 duration-200 hover:border-b-2 hover:border-darkBlue">
						Jobs
					</Link>
					<Link className="h-6 duration-200 hover:border-b-2 hover:border-darkBlue">
						People
					</Link>
					<Link className="mx-4 h-6 duration-200 hover:border-b-2 hover:border-darkBlue">
						More
					</Link>
				</div>
				<form>
					<div className="relative">
						<input
							className="px-6 py-2 rounded-md w-[300px] text-gray-300 font-poppins border border-gray-300 text-sm focus:outline-none"
							type="text"
							placeholder="Find jobs, people and more..."
						/>
						<PiMagnifyingGlass className="absolute left-2 top-3 text-gray-300" />
					</div>
				</form>
				<div className="hidden lg:flex items-center justify-between font-bold text-lg text-darkBlue ">
					<Link className="text-2xl">
						<RxDashboard />
					</Link>
					<Link className="mx-4 text-2xl">
						<BiMessageRounded />
					</Link>
					<Link className="text-2xl">
						<IoMdNotificationsOutline />
					</Link>
					<div className="ml-4">
						<Avatar
							sx={{ cursor: "pointer" }}
							onClick={handleClick}
							alt="Remy Sharp"
							src={user?.pic}
						/>

						<Menu
							id="fade-menu"
							sx={{ marginTop: "10px" }}
							anchorEl={anchorEl}
							open={openDrop}
							onClose={handleCloseDropDown}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}
						>
							<div className="flex flex-col items-start justify-center p-4">
								<div className="flex">
									<Avatar src={user?.pic} />
									<h3 className="font-poppins ml-2 font-bold text-xl text-darkBlue">
										{user?.firstName}
										{` ${user?.lastName}`}
									</h3>
								</div>
								<Link
									to="/profile"
									className="mb-4 w-full mt-4 rounded-lg border-darkBlue border-2 text-center duration-300 hover:bg-darkBlue hover:text-white"
									onClick={handleCloseDropDown}
								>
									view profile
								</Link>

								<Link
									className="mb-4 w-full mt-4 border-2 border-white py-1 rounded-lg text-center duration-300 bg-darkBlue text-white hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-2"
									onClick={handleLogOut}
								>
									Logout
								</Link>
							</div>
						</Menu>
					</div>
				</div>
				<div className="hidden md:flex">
					<Link className="py-2 px-4 font-dosis font-semiBold duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:bg-gradient-to-r hover:from-pink hover:to-orange">
						Upgrade
					</Link>
				</div>
			</div>
			<Drawer anchor="left" open={open} onClose={handleClose}>
				<ProfileDrawerDetails />
			</Drawer>
		</>
	);
};

export default MenuBar;
