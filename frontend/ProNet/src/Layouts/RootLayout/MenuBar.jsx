import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";
import { PiMagnifyingGlass } from "react-icons/pi";
import { BiMessageRounded, BiMenuAltLeft } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { Avatar, Menu, Drawer } from "@mui/material";
import logo from "../../assets/images/png/logo.png";
import ProfileDrawerDetails from "../../components/miscellaneous/ProfileDrawerDetails";
import { logUserOut } from "../../features/Auth/AuthSlice";
import {
	getProfileIntro,
	reset,
} from "../../features/Profile/ProfileIntro/ProfileIntroSlice";

const MenuBar = () => {
	const dispatch = useDispatch();
	const [currentUser, setCurrentUser] = useState(null);
	const navigate = useNavigate();
	// for the drawer
	const [open, setOpen] = useState(false);

	// for the dropdown menu
	const [anchorEl, setAnchorEl] = useState(null);
	const openDrop = Boolean(anchorEl);

	// check the sentCode and verify variable in the redux store
	const { user } = useSelector((state) => state.auth);

	// get the user's profile intro from the redux store
	const { profileIntro, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.profileIntro
	);

	// dispatch the getProfileIntro function
	useEffect(() => {
		dispatch(getProfileIntro());
	}, [dispatch]);

	useEffect(() => {
		if (isSuccess) {
			setCurrentUser(profileIntro[0]);
		}
		dispatch(reset());
	}, [isSuccess]);

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
	// function to log user out
	const handleLogOut = () => {
		dispatch(logUserOut());
		navigate("/login");
	};

	return (
		<>
			<div className="w-full">
				<div className="w-11/12 flex items-center justify-between flex-col mx-auto p-4 md:flex-row">
					<div className="flex items-center justify-between w-full mb-8 md:m-0 md:justify-start lg:hidden">
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
						className="hidden items-center font-black font-semibold text-3xl lg:flex"
					>
						<img className="w-8" src={logo} alt="" />
						<h1 className="ml-2">ProNet</h1>
					</Link>
					<div className="hidden items-center justify-between text-darkBlue font-poppins font-bold lg:flex">
						<Link
							to="/"
							className="h-6 duration-200 hover:border-b-2 hover:border-darkBlue"
						>
							Feeds
						</Link>
						<Link
							to="/jobs"
							className="mx-4 h-6 duration-200 hover:border-b-2 hover:border-darkBlue"
						>
							Jobs
						</Link>
						<Link className="h-6 duration-200 hover:border-b-2 hover:border-darkBlue">
							People
						</Link>
						<Link className="mx-4 h-6 duration-200 hover:border-b-2 hover:border-darkBlue">
							More
						</Link>
					</div>
					<form className="md:mr-4">
						<div className="relative">
							<input
								className="px-6 py-2 rounded-md w-[300px] text-gray-300 text-xs font-poppins border border-gray-300 focus:outline-none"
								type="text"
								placeholder="Find jobs, people and more..."
							/>
							<PiMagnifyingGlass className="absolute left-2 top-2 text-gray-300" />
						</div>
					</form>
					<div className="hidden items-center justify-between font-bold text-lg text-darkBlue lg:flex">
						<Link className="text-2xl">
							<RxDashboard />
						</Link>
						<Link to="/chats" className="mx-4 text-2xl">
							<AiOutlineMessage />
						</Link>
						<Link className="text-2xl">
							<IoMdNotificationsOutline />
						</Link>
						<div className="ml-4">
							<Avatar
								sx={{ cursor: "pointer" }}
								onClick={handleClick}
								alt="Remy Sharp"
								src={currentUser?.pic}
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
										<Avatar src={currentUser?.pic} />
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
			</div>
			<Drawer anchor="left" open={open} onClose={handleClose}>
				<ProfileDrawerDetails />
			</Drawer>
		</>
	);
};

export default MenuBar;
