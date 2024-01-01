import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import NotificationAlert from "../../miscellaneous/NotificationAlert";
import {
	resetProfile,
	updateProfileIntro,
} from "../../../features/Profile/ProfileIntro/ProfileIntroSlice";

const CreateEducationProfile = ({ values }) => {
	const dispatch = useDispatch();
	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	const { profileIntroState, setProfileIntroState, nextStep, prevStep } =
		values;

	const { name, degree, grade, startDate, endDate, fieldOfStudy } =
		profileIntroState;

	const handleChange = (e) => {
		setProfileIntroState((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};
	const handleCreateProfile = (e) => {
		e.preventDefault();
		if (!name || !degree || !grade || !fieldOfStudy || !startDate || !endDate) {
			handleShowSnackbar("error", "Please fill in all fields");
		} else {
			const updateEducation = {
				name: profileIntroState.name,
				degree: profileIntroState.degree,
				fieldOfStudy: profileIntroState.fieldOfStudy,
				grade: profileIntroState.grade,
				startDate: profileIntroState.startDate,
				endDate: profileIntroState.endDate,
			};
			const introUpdates = {
				education: updateEducation,
			};
			dispatch(updateProfileIntro(introUpdates));
			dispatch(resetProfile());
			nextStep();
		}
	};

	// function to show snack-bar alert
	const handleShowSnackbar = (severity, message) => {
		setOpenAlert(true);
		setAlertSeverity(severity);
		setAlertMessage(message);
	};

	return (
		<div className="">
			<div>
				<h6 className="text-lg font-semibold">
					Welcome to <span className="font-black text-2xl">ProNet</span>
				</h6>
				<h6 className="font-normal font-cour">Add an Education history</h6>
			</div>
			<form className="mt-2">
				<input
					className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
					placeholder="Intitution name"
					type="text"
					id="name"
					value={name}
					onChange={(e) => handleChange(e)}
				/>
				<input
					className="w-full h-[40px] rounded-md my-4 py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
					placeholder="Field of study"
					type="text"
					id="fieldOfStudy"
					value={fieldOfStudy}
					onChange={(e) => handleChange(e)}
				/>
				<input
					className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
					placeholder="degree"
					type="text"
					id="degree"
					value={degree}
					onChange={(e) => handleChange(e)}
				/>
				<input
					className="w-full h-[40px] rounded-md py-2 px-4 my-4 bg-transparent border border-gray-200 focus:outline-none"
					placeholder="grade"
					type="text"
					id="grade"
					value={grade}
					onChange={(e) => handleChange(e)}
				/>
				<div className="flex items-center justify-between">
					<div className="w-1/2">
						<label className="text-md ml-2 mb-2 text-gray-400">
							Start-date
						</label>
						<input
							className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							placeholder="Start date"
							type="date"
							id="startDate"
							value={startDate}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="w-1/2 ml-2">
						<label className="text-md ml-2 mb-2 text-gray-400">End-date</label>
						<input
							className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							placeholder="end date"
							type="date"
							id="endDate"
							value={endDate}
							onChange={(e) => handleChange(e)}
						/>
					</div>
				</div>

				<div className="flex items-end justify-between mt-4">
					<button
						onClick={prevStep}
						className="flex items-center w-20 p-2 duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-pink hover:to-orange"
					>
						<p className="mr-2 font-dosis">Prev</p>
						<MdNavigateNext />
					</button>
					<button
						onClick={handleCreateProfile}
						className="flex items-center w-42 p-2 duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-pink hover:to-orange"
					>
						<p className="mr-2 font-dosis">Save and Continue</p>
						<MdNavigateNext />
					</button>
				</div>
			</form>
			<NotificationAlert
				open={openAlert}
				message={alertMessage}
				severity={alertSeverity}
				onClose={() => setOpenAlert(false)}
			/>
		</div>
	);
};

export default CreateEducationProfile;
