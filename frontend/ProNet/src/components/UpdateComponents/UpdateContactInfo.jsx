import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GrDocumentUpdate } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";
import { updateContactInfo } from "../../features/Profile/ContactInfo/ContactInfoSlice";
import NotificationAlert from "../miscellaneous/NotificationAlert";

const UpdateContactInfo = ({
	contact,
	fetchContactsAgain,
	setFetchContactsAgain,
}) => {
	const dispatch = useDispatch();
	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");
	const [month, setMonth] = useState("");
	const [day, setDay] = useState("");
	const [address, setAddress] = useState("");
	const [website, setWebsite] = useState("");

	const handleMonthChange = (e) => {
		const value = e.target.value;
		setMonth(value);
	};
	const handleDayChange = (e) => {
		const value = e.target.value;
		setDay(value);
	};

	const handleMonthInput = (e) => {
		e.target.value = e.target.value.slice(0, 2).replace(/[^0-9]/g, ""); // Allow only numeric input
		const numericValue = parseInt(e.target.value, 10);
		if (numericValue > 12) {
			e.target.value = "12"; // Limit the input to 12 if it's higher
		}
	};

	const handleDayInput = (e) => {
		e.target.value = e.target.value.slice(0, 2).replace(/[^0-9]/g, ""); // Allow only numeric input
		const numericValue = parseInt(e.target.value, 10);
		if (numericValue > 31) {
			e.target.value = "31"; // Limit the input to 12 if it's higher
		}
	};

	// function to check if the website is a valid website url
	const isValidWebsite = (inputText) => {
		// Regular expression pattern for a website address validation
		const websitePattern =
			/^(https?:\/\/|www\.)[A-Za-z0-9-]+\.[A-Za-z]{2,}(\.[A-Za-z]{2,})?$/;

		// Test if the inputText matches the pattern
		return websitePattern.test(inputText);
	};

	// function to update the user's contact info in the DB
	const updateContact = () => {
		let birthDay;
		let web = false;

		if (day && month) {
			birthDay = `${day}/${month}`;
		}

		if (website) {
			if (isValidWebsite(website)) {
				web = true;
			} else {
				handleShowSnackbar("error", "Website eddress not valid");
			}
		}
		const contactUpdates = {
			BirthDay: birthDay ? birthDay : contact.BirthDay,
			Address: address ? address : contact.Address,
			Website: web ? website : contact.Website,
		};
		dispatch(updateContactInfo(contactUpdates));
		setFetchContactsAgain(!fetchContactsAgain);

		// clear all the input fields
		setMonth("");
		setDay("");
		setAddress("");
		setWebsite("");
		// show a success alert message
		handleShowSnackbar("success", "Info updated");
	};

	// function to show snack-bar alert
	const handleShowSnackbar = (severity, message) => {
		setOpenAlert(true);
		setAlertSeverity(severity);
		setAlertMessage(message);
	};

	return (
		<div>
			<div className="p-4 font-semibold text-lg text-gray-400">
				<h4>Edit Contact Info</h4>
			</div>
			<hr className="border-darkBlue" />
			<div className="px-4 py-4">
				<div className="flex items-center mb-8">
					<h6 className="font-bold">Email</h6>
					<p className="ml-4 font-bold text-darkBlue">{contact?.email}</p>
					<Link>
						<BiEdit className="ml-2 mt-1 font-bold text-darkBlue" />
					</Link>
				</div>
				<div className="flex items-center mb-8">
					<h6 className="font-bold">Phone Number</h6>
					<p className="ml-4 font-bold text-darkBlue">{contact?.phoneNumber}</p>
					<Link>
						<BiEdit className="ml-2 mt-1 font-bold text-darkBlue" />
					</Link>
				</div>
				<div className="mt-8">
					<div className="flex items-center">
						<h6 className="font-bold">Birthday</h6>
						<p className="ml-4 font-bold text-darkBlue">{contact?.BirthDay}</p>
					</div>
					<div className="flex items-center mt-2">
						<input
							type="number"
							value={day}
							className="border px-2 py-1 rounded-md focus:outline-none"
							onChange={(e) => handleDayChange(e)}
							placeholder="Day"
							maxLength="2"
							onInput={(e) => handleDayInput(e)}
						/>
						<input
							type="number"
							value={month}
							className="ml-4 border px-2 py-1 rounded-md focus:outline-none"
							onChange={(e) => handleMonthChange(e)}
							placeholder="Month"
							maxLength="2"
							onInput={(e) => handleMonthInput(e)}
						/>
					</div>
				</div>
				<div className="mt-8">
					<div className="flex items-center mb-2">
						<h6 className="font-bold">Address</h6>
						<p className="ml-4 font-bold text-darkBlue">{contact?.Address}</p>
					</div>
					<input
						type="text"
						value={address}
						className="w-full border px-2 py-1 rounded-md focus:outline-none"
						onChange={(e) => setAddress(e.target.value)}
						placeholder="Address"
					/>
				</div>
				<div className="mt-8">
					<div className="flex items-center mb-2">
						<h6 className="font-bold">Website</h6>
						<p className="ml-4 font-bold text-darkBlue">{contact?.Website}</p>
					</div>
					<input
						type="text"
						value={website}
						className="w-full border px-2 py-1 rounded-md focus:outline-none"
						onChange={(e) => setWebsite(e.target.value)}
						placeholder="Website"
					/>
				</div>
			</div>
			<hr className="border-darkBlue" />
			<div className="flex items-end justify-end m-4">
				<div
					onClick={updateContact}
					className="flex items-center w-24 p-2 duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-pink hover:to-orange"
				>
					<GrDocumentUpdate />
					<p className="ml-2 font-dosis">Update</p>
				</div>
			</div>
			<NotificationAlert
				open={openAlert}
				message={alertMessage}
				severity={alertSeverity}
				onClose={() => setOpenAlert(false)}
			/>
		</div>
	);
};

export default UpdateContactInfo;
