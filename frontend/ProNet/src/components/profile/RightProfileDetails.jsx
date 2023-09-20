import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RightProfile from "./RightInfo/RightProfile";

const RightProfileDetails = ({ intro }) => {
	const dispatch = useDispatch();

	return (
		<>
			<div className="relative top-12 w-full xl:top-96 ">
				<div>
					<div>
						<ul className="flex items-center font-semibold text-gray-400">
							<li className="py-2 px-6 rounded-md duration-300 hover:bg-gray-300 hover:text-black hover:cursor-pointer">
								Profile
							</li>
							<li className="mx-4 py-2 px-6 rounded-md duration-300 hover:bg-gray-300 hover:text-black hover:cursor-pointer">
								Posts
							</li>
							<li className="py-2 px-6 rounded-md duration-300 hover:bg-gray-300 hover:text-black hover:cursor-pointer">
								Actions
							</li>
						</ul>
					</div>
					<RightProfile intro={intro} />
				</div>
			</div>
		</>
	);
};

export default RightProfileDetails;
