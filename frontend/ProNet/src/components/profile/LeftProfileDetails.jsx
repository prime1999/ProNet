import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import MiniSpinner from "../Spinner/MiniSpinner";
import JobProfileModal from "../Modals/JobProfileModal";
import ContactInfoModal from "../Modals/ContactInfoModal";
import {
	getJobProfile,
	reset,
} from "../../features/Profile/JobProfile/JobProfileSlice";
import Spinner from "../Spinner/Spinner";
import NotificationAlert from "../miscellaneous/NotificationAlert";

const LeftProfileDetails = ({ intro }) => {
	// get the user variable in the redux store
	const { user } = useSelector((state) => state.auth);
	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	const [fetchJobProfileAgain, setFetchJobProfileAgain] = useState(false);
	const [jobDetails, setJobDetails] = useState(null);
	// init the dispatch function
	const dispatch = useDispatch();

	// get the job profile states from the redux store
	const { jobProfile, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.JobProfile
	);

	useEffect(() => {
		dispatch(getJobProfile());
	}, [fetchJobProfileAgain]);

	useEffect(() => {
		// check if the isSuccess variable is true
		if (isSuccess) {
			// check if the jobProfile is an array
			// if it is then
			if (Array.isArray(jobProfile)) {
				setJobDetails(jobProfile[0]);
			} else {
				// if it is an object then
				setJobDetails(jobProfile);
			}
		}
		dispatch(reset());
	}, [isSuccess]);

	// function to show snack-bar alert
	const handleShowSnackbar = (severity, message) => {
		setOpenAlert(true);
		setAlertSeverity(severity);
		setAlertMessage(message);
	};

	return (
		<>
			<div className="w-full flex flex-col items-start lg:items-center">
				<div className="w-full bg-white border shadow-md px-4 py-8 rounded-md">
					<div className="mt-2">
						<div className="flex flex-col items-start lg:items-center justify-center">
							<h4 className="font-poppins font-bold text-2xl text-right lg:text-center">
								{user?.firstName}
								{` ${user?.lastName}`}
							</h4>
							<p className="font-cour text-lg font-semibold text-gray-500">
								{intro?.headLine}
							</p>
						</div>
						<div className="mt-16">
							<div className="flex items-end justify-between">
								<div>
									<p className="text-gray-400 font-semibold text-lg">
										Location
									</p>
									<p className="font-semibold">{intro?.location}</p>
								</div>
								<div>
									<ContactInfoModal>
										<Link className="text-darkBlue text-sm font-bold hover:border-b hover:border-darkBlue">
											Contact info
										</Link>
									</ContactInfoModal>
								</div>
							</div>
							{isLoading ? (
								<div className="ml-8 mt-4">
									<MiniSpinner />
								</div>
							) : (
								<div className="flex items-end justify-between mt-8">
									<div>
										<p className="text-gray-400 font-semibold text-lg">
											Job Info
										</p>
										{jobDetails?.jobTitles?.map((profile, index) => (
											<div key={index}>
												<p className="font-semibold text-sm">{profile}</p>
											</div>
										))}
									</div>
									<div>
										<JobProfileModal
											fetchJobProfileAgain={fetchJobProfileAgain}
											setFetchJobProfileAgain={setFetchJobProfileAgain}
											jobDetails={jobDetails}
										>
											<Link className="text-darkBlue text-sm font-bold hover:border-b hover:border-darkBlue">
												See Details
											</Link>
										</JobProfileModal>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<NotificationAlert
				open={openAlert}
				message={alertMessage}
				severity={alertSeverity}
				onClose={() => setOpenAlert(false)}
			/>
		</>
	);
};

export default LeftProfileDetails;
