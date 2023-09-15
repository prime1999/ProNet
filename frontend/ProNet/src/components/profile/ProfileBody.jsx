import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftProfileDetails from "./LeftProfileDetails";
import { getJobProfile } from "../../features/Profile/JobProfile/JobProfileSlice";

const ProfileBody = ({ intro }) => {
	const [jobDetails, setJobDetails] = useState(null);
	// init the dispatch function
	const dispatch = useDispatch();

	// get the job profile states from the redux store
	const { jobProfile, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.JobProfile
	);

	useEffect(() => {
		dispatch(getJobProfile());
	}, [dispatch]);

	useEffect(() => {
		if (isSuccess) {
			setJobDetails(jobProfile[0]);
		}
	}, [isSuccess]);

	return (
		<div>
			<div className="flex items-start">
				<div className="flex items-start justify-between mr-4 w-1/4">
					<LeftProfileDetails
						intro={intro}
						jobDetails={jobDetails}
						isLoading={isLoading}
					/>
				</div>
				svh
			</div>
		</div>
	);
};

export default ProfileBody;
