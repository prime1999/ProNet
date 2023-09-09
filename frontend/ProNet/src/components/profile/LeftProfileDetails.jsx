import React from "react";
import { useDispatch, useSelector } from "react-redux";

const LeftProfileDetails = () => {
	// check the sentCode and verify variable in the redux store
	const { user } = useSelector((state) => state.auth);
	return (
		<>
			<div className="relative bg-white -top-24 rounded-md shadow-md px-8 py-4 w-full h-[300px]">
				<h3 className="font-poppins font-bold text-3xl text-center">
					{user?.firstName} {` ${user?.lastName}`}
				</h3>
			</div>
		</>
	);
};

export default LeftProfileDetails;
