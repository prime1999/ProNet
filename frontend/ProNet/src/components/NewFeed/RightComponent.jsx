import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { Avatar } from "@mui/material";
import {
	reset,
	getPeopleWithSameInterest,
} from "../../features/Auth/AuthSlice";
import ComponentLoader from "../Spinner/ComponentLoader";
import { Link } from "react-router-dom";
import ComponentFooter from "./ComponentFooter";

const RightComponent = () => {
	const [users, setUsers] = useState(null);
	const dispatch = useDispatch();

	const { people, isLoading, isSuccess, isError } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		dispatch(getPeopleWithSameInterest());
	}, []);

	// to run anytime the isSuccess variable changes
	useEffect(() => {
		// check if the isSuccess variable from the redux store is true (that is the getProfileIntro was fulfilled)
		if (isSuccess) {
			setUsers(people);
			console.log(people);
		}
		// clear the redux store
		dispatch(reset());
	}, [isSuccess]);
	return (
		<div className="hidden lg:block">
			{/* TO PERFORM A FILTER BASED ON USERS ALREADY CONNECTED WITH */}
			{isLoading || !users ? (
				<>
					<ComponentLoader />
				</>
			) : (
				<div className="flex items-center justify-center bg-white shadow-sm p-4 w-full">
					<div className="flex flex-col items-center justify-center w-full">
						<div className="flex items-center justify-between font-bold w-full">
							<h6>Keep in touch</h6>
							<MdNavigateNext className="bg-light p-1 rounded-full text-2xl text-orange hover:cursor-pointer" />
						</div>
						<div>
							{users.map((user, index) => (
								<Link key={index} className="flex items-center text-sm my-2">
									<Avatar src={user?.pic} />
									<div className="ml-4">
										<h6 className="font-semibold">{user.name}</h6>
										<p className="text-xs text-gray-500">{user.headLine}</p>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			)}
			{/* TO MAKE A COURSES IN THE DB AND SHOW THEM HERE */}
			<div className="flex items-center justify-center bg-white mt-4 shadow-sm p-4 w-full">
				<div className="w-full">
					<div className="flex items-center justify-between font-bold w-full">
						<h6>Most viewed courses</h6>
						<MdNavigateNext className="bg-light p-1 rounded-full text-2xl text-orange hover:cursor-pointer" />
					</div>
					<div className="mt-4">
						<Link className="text-sm my-2">
							<h6 className="font-semibold">
								Developing a text based app from ground up
							</h6>
							<div className="flex items-center justify-between text-gray-500 mt-1">
								<p className="">Paul Williams</p>
								<p className="flex items-center">
									<span className="mr-2">
										<AiFillEye className="text-md" />
									</span>
									2K
								</p>
							</div>
						</Link>
						<Link className="text-sm">
							<h6 className="font-semibold mt-4">
								Developing a text based app from ground up
							</h6>
							<div className="flex items-center justify-between text-gray-500 mt-1">
								<p className="">Paul Williams</p>
								<p className="flex items-center">
									<span className="mr-2">
										<AiFillEye className="text-md" />
									</span>
									2K
								</p>
							</div>
						</Link>
						<Link className="text-sm">
							<h6 className="font-semibold mt-4">
								Developing a text based app from ground up
							</h6>
							<div className="flex items-center justify-between text-gray-500 mt-1">
								<p className="">Paul Williams</p>
								<p className="flex items-center">
									<span className="mr-2">
										<AiFillEye className="text-md" />
									</span>
									2K
								</p>
							</div>
						</Link>
						<Link className="text-sm">
							<h6 className="font-semibold mt-4">
								Developing a text based app from ground up
							</h6>
							<div className="flex items-center justify-between text-gray-500 mt-1">
								<p className="">Paul Williams</p>
								<p className="flex items-center">
									<span className="mr-2">
										<AiFillEye className="text-md" />
									</span>
									2K
								</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
			<ComponentFooter />
		</div>
	);
};

export default RightComponent;
