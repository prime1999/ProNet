import { useState } from "react";
import { useDispatch } from "react-redux";
import CitiesAndCountries from "../../miscellaneous/CitiesAndCountries";
import { MdNavigateNext } from "react-icons/md";
import NotificationAlert from "../../miscellaneous/NotificationAlert";
import {
	resetProfile,
	createUserProfile,
} from "../../../features/Profile/ProfileIntro/ProfileIntroSlice";

const CreateProfileIntro = ({ values }) => {
	const dispatch = useDispatch();
	// for the snackbar alert
	console.log(values);
	const { profileIntroState, setProfileIntroState, nextStep, prevStep } =
		values;
	console.log(profileIntroState);
	// for the location selection
	const [locations, setLocations] = useState(CitiesAndCountries());
	const [filterLocations, setFilteredLocations] = useState(null);

	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	const { headLine, summary, location } = profileIntroState;

	// function to select a location where the user is available to work
	const handleSelectLocation = (e) => {
		const value = e.target.value;
		setProfileIntroState((prevState) => ({
			...prevState,
			location: value,
		}));
		// filter out the location that fit with the one inputted
		const filtered = locations.filter((location) =>
			location.toLowerCase().includes(value.toLowerCase())
		);
		// set filtered list to te locations list
		setFilteredLocations(filtered);
	};

	// function to handle the location option taken
	const handleLocationOption = (location) => {
		// set the input value to the selected location
		setProfileIntroState((prevState) => ({
			...prevState,
			location: location,
		}));
		// clear out the filteredLocations list list
		setFilteredLocations(null);
	};

	const handleChange = (e) => {
		setProfileIntroState((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const handleCreateProfile = (e) => {
		e.preventDefault();
		if (!headLine || !location) {
			handleShowSnackbar("error", "Please fill in all required fields");
		} else {
			const profileData = {
				headLine: profileIntroState.headLine,
				summary: profileIntroState.summary,
				location: profileIntroState.location,
				skills: [],
				education: [],
				experience: [],
			};
			dispatch(createUserProfile(profileData));
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
				<h6 className="font-normal font-cour">
					Let's create a profile for you to get started with the App
				</h6>
			</div>
			<form className="mt-2">
				<textarea
					placeholder="Write a headline to be identified with"
					id="headLine"
					value={headLine}
					onChange={handleChange}
					autoFocus
					className="w-full h-[100px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
				></textarea>
				<textarea
					placeholder="Write a summary to make your profile rank higher"
					id="summary"
					value={summary}
					onChange={handleChange}
					autoFocus
					className="w-full h-[100px] mb-2 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
				></textarea>
				<div className="">
					<input
						className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
						placeholder="Add Location"
						type="text"
						value={location}
						onChange={(e) => handleSelectLocation(e)}
					/>
					<div className="rounded-md mt-2 max-h-[140px] bg-transparent border shadow-md overflow-auto">
						{location && (
							<ul className="">
								{filterLocations?.map((location, index) => (
									<li
										onClick={() => handleLocationOption(location)}
										className="px-4 py-2 font-dosis hover:bg-light hover:cursor-pointer"
										key={index}
									>
										{location}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
				<div className="flex items-end justify-end mt-4">
					<button
						onClick={handleCreateProfile}
						className="flex items-center w-20 p-2 duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-pink hover:to-orange"
					>
						<p className="mr-2 font-dosis">Next</p>
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

export default CreateProfileIntro;
