import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftProfileDetails from "./LeftProfileDetails";
import { getJobProfile } from "../../features/Profile/JobProfile/JobProfileSlice";

const ProfileBody = ({ intro }) => {
	return (
		<div>
			<div className="flex items-start">
				<div className="flex items-start justify-between mr-4 w-1/4">
					<LeftProfileDetails intro={intro} />
				</div>
				svh
			</div>
		</div>
	);
};

export default ProfileBody;
