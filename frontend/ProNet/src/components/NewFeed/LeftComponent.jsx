import { useState } from "react";
import { Link } from "react-router-dom";
import { MdNavigateNext, MdGroups2 } from "react-icons/md";
import { Avatar } from "@mui/material";

const LeftComponent = ({ intro }) => {
	return (
		<>
			<div className="flex items-center justify-center bg-white shadow-sm p-4 w-full">
				<div className="flex flex-col items-center justify-center mt-4 w-full">
					<Avatar
						sx={{ width: "100px", height: "100px" }}
						src={intro?.pic}
						alt="User's pic"
					/>
					<div className="text-center mt-4 w-full">
						<h6 className="font-bold font-poppins text-2xl">{`${intro?.firstName} ${intro?.lastName}`}</h6>
						<p className="text-center text-gray-500 font-cour text-lg">
							{intro?.headLine}
						</p>
					</div>
					<div className="flex items-center justify-between text-gray-500 mt-8 text-sm w-9/12">
						<div className="flex flex-col items-center justify-center">
							<h6 className="text-black font-semibold">Connections</h6>
							{/* to replace with actual connections */}
							<p>3K</p>
						</div>
						<div className="flex flex-col items-center justify-center">
							<h6 className="text-black font-semibold">Views</h6>
							{/* to replace with actual views */}
							<p>1K</p>
						</div>
					</div>
				</div>
			</div>
			{/* use the groups later */}
			<div className="flex items-center justify-center mt-4 bg-white shadow-sm p-4 w-full">
				<div className="w-full">
					<div className="flex items-center justify-between font-bold w-full">
						<h6>Groups</h6>
						<MdNavigateNext className="bg-light p-1 rounded-full text-2xl text-orange hover:cursor-pointer" />
					</div>
					<div className="w-full mt-4">
						<Link className="flex items-center text-sm my-2">
							<MdGroups2 className="mr-2 text-lg text-orange" />{" "}
							<p className="text-gray-500">React developers</p>
						</Link>
						<Link className="flex items-center text-sm my-2">
							<MdGroups2 className="mr-2 text-lg text-orange" />{" "}
							<p className="text-gray-500">React developers</p>
						</Link>
						<Link className="flex items-center text-sm my-2">
							<MdGroups2 className="mr-2 text-lg text-orange" />{" "}
							<p className="text-gray-500">React developers</p>
						</Link>
						<Link className="flex items-center text-sm my-2">
							<MdGroups2 className="mr-2 text-lg text-orange" />{" "}
							<p className="text-gray-500">React developers</p>
						</Link>
						<Link className="text-sm mt-4 text-orange duration-500 hover:underline">
							See All
						</Link>
					</div>
					{/* use the groups later */}

					<div className="w-full mt-8">
						<div className="flex items-center justify-between font-bold w-full">
							<h6>Followed Hastags</h6>
							<MdNavigateNext className="bg-light p-1 rounded-full text-2xl text-orange hover:cursor-pointer" />
						</div>
						<div className="w-full flex items-center justify-between flex-wrap mt-4">
							<Link className="bg-light text-sm my-2 text-orange font-semibold px-4 py-1 rounded-md">
								<p className="">React</p>
							</Link>
							<Link className="bg-light text-sm my-2 text-orange font-semibold px-4 py-1 rounded-md">
								<p className="">React</p>
							</Link>
							<Link className="bg-light text-sm my-2 text-orange font-semibold px-4 py-1 rounded-md">
								<p className="">React</p>
							</Link>
							<Link className="bg-light text-sm my-2 text-orange font-semibold px-4 py-1 rounded-md">
								<p className="">React</p>
							</Link>
							<Link className="bg-light text-sm my-2 text-orange font-semibold px-4 py-1 rounded-md">
								<p className="">React</p>
							</Link>
							<Link className="bg-light text-sm my-2 text-orange font-semibold px-4 py-1 rounded-md">
								<p className="">React</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LeftComponent;
