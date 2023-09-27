import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import NotificationAlert from "../../miscellaneous/NotificationAlert";
import {
	reset,
	createContactInfo,
} from "../../../features/Profile/ContactInfo/ContactInfoSlice";

const CreateContactInfo = ({ values }) => {
	const dispatch = useDispatch();
	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");
	const { contactProfileState, setContactProfileState, nextStep, prevStep } =
		values;

	const { address, birthDay, website } = contactProfileState;

	const handleChange = (e) => {
		setContactProfileState((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const handleCreateProfile = (e) => {
		e.preventDefault();

		if (website && !isValidWebsite(website)) {
			handleShowSnackbar("error", "Please enter a valid url");
		}

		if (!address) {
			handleShowSnackbar("error", "Please fill in required fields");
		}
		const createContact = {
			address: contactProfileState.address,
			birthDay: contactProfileState.birthDay,
			website: contactProfileState.website,
		};

		dispatch(createContactInfo(createContact));
		dispatch(reset());
		nextStep();
	};

	// function to check if the website is a valid website url
	const isValidWebsite = (inputText) => {
		// Regular expression pattern for a website address validation
		const websitePattern =
			/^(https?:\/\/|www\.)[A-Za-z0-9-]+\.[A-Za-z]{2,}(\.[A-Za-z]{2,})?$/;

		// Test if the inputText matches the pattern
		return websitePattern.test(inputText);
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
					Add a simple contact information
				</h6>
			</div>
			<form className="mt-2">
				<input
					className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
					placeholder="Current Address"
					type="text"
					id="address"
					value={address}
					onChange={(e) => handleChange(e)}
				/>
				<input
					className="w-full h-[40px] rounded-md py-2 mt-4 px-4 bg-transparent border border-gray-200 focus:outline-none"
					placeholder="Website"
					type="text"
					id="website"
					value={website}
					onChange={(e) => handleChange(e)}
				/>
				<div className="mt-4">
					<label className="text-md ml-2 mb-2 text-gray-400">Birth-day</label>
					<input
						className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
						placeholder="BirthDay"
						type="date"
						id="birthDay"
						value={birthDay}
						onChange={(e) => handleChange(e)}
					/>
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

export default CreateContactInfo;
