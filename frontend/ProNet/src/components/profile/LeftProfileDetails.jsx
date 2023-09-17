import { useEffect, useState } from "react";
import axios from "axios";
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
import { Avatar } from "@mui/material";
import { updateProfileIntro } from "../../features/Profile/ProfileIntro/ProfileIntroSlice";
import NotificationAlert from "../miscellaneous/NotificationAlert";

const LeftProfileDetails = ({ intro }) => {
	// get the user variable in the redux store
	const { user } = useSelector((state) => state.auth);
	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	const [pic, setPic] = useState(intro?.pic);
	const [loading, setLoading] = useState(false);
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

	// function to upload the user's profile picture
	const handlePic = async (selectedPic) => {
		setLoading(true);

		if (!selectedPic) {
			setLoading(false);
			return;
		}

		try {
			if (
				selectedPic.type === "image/jpeg" ||
				selectedPic.type === "image/png"
			) {
				const picData = new FormData();
				// append the following key-value pairs to it
				picData.append("file", selectedPic);
				picData.append("upload_preset", "proNet");
				picData.append("cloud_name", "ddboi173o");
				// send the data(your new FormData with the required data) to your cloudinary url
				const { data } = await axios.post(
					"https://api.cloudinary.com/v1_1/ddboi173o/image/upload",
					picData
				);

				setPic(data.url);
				setLoading(false);
				const introUpdates = {
					pic: data.url,
				};
				dispatch(updateProfileIntro(introUpdates));
			}
		} catch (error) {
			console.log(error);
		}
	};

	// function to show snack-bar alert
	const handleShowSnackbar = (severity, message) => {
		setOpenAlert(true);
		setAlertSeverity(severity);
		setAlertMessage(message);
	};

	return (
		<>
			<div className="w-full flex flex-col items-center">
				<div className="relative -bottom-10">
					{loading ? (
						<>
							<Spinner />
						</>
					) : (
						<Avatar
							sx={{ width: "120px", height: "120px" }}
							alt="user avatar"
							src={pic}
						></Avatar>
					)}
					<div className="absolute top-20 left-20">
						<label htmlFor="profilePic">
							<p className="bg-light p-2 rounded-full duration-500 hover:cursor-pointer hover:bg-orange">
								<FiEdit2 />
							</p>
						</label>
						<input
							type="file"
							accept="image/*"
							id="profilePic"
							className="hidden"
							onChange={(e) => handlePic(e.target.files[0])}
						/>
					</div>
				</div>
				<div className="w-full bg-white shadow-md px-4 py-8 rounded-md">
					<div className="mt-4">
						<div className="flex flex-col items-center justify-center">
							<h4 className="font-poppins font-bold text-2xl text-center">
								{user?.firstName}
								{` ${user?.lastName}`}
							</h4>
							<p className="font-cour text-lg font-semibold text-gray-500">
								{intro.headLine}
							</p>
						</div>
						<div className="mt-16">
							<div className="flex items-end justify-between">
								<div>
									<p className="text-gray-400 font-semibold text-lg">
										Location
									</p>
									<p className="font-semibold">
										{intro.location.city}, {` ${intro.location.country}`}
									</p>
								</div>
								<div>
									<ContactInfoModal>
										<Link className="text-darkBlue font-bold hover:border-b hover:border-darkBlue">
											Contant info
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
											<Link className="text-darkBlue font-bold hover:border-b hover:border-darkBlue">
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
