import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
//import { Snackbar, Alert } from "@mui/material";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import logo from "../../assets/images/png/logo.png";
import VerificationModal from "../../components/Auth/VerificationModal";
import { reset } from "../../features/Auth/AuthSlice";
import NotificationAlert from "../../components/miscellaneous/NotificationAlert";

const RegisterUser = () => {
	// state for the phone number value
	const [value, setValue] = useState("");

	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// check the sentCode and verify variable in the redux store
	const { sentCode, verify, isSuccess } = useSelector((state) => state.auth);

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	useEffect(() => {
		// check if the code was sent
		if (sentCode === false) {
			// if it was not then throw an error message
			handleShowSnackbar("error", "Code not sent: Check number");
		}
		if (isSuccess) {
			handleShowSnackbar("success", "Welcome to ProNet");
			navigate("/profile");
		}
		dispatch(reset());
	}, [sentCode, isSuccess]);

	// function to show snack-bar alert
	const handleShowSnackbar = (severity, message) => {
		setOpenAlert(true);
		setAlertSeverity(severity);
		setAlertMessage(message);
	};

	// destructure the formData object
	const { firstName, lastName, email, password } = formData;

	// function to set the value of the formData
	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<div className="image-back">
			<form className="h-screen flex items-center justify-center">
				<div className="h-[550px] w-[450px] glassmorphism-card p-4">
					<Link
						to="/"
						className="flex items-center font-black font-semibold text-4xl"
					>
						<img className="w-12" src={logo} alt="" />
						<h1 className="ml-2">ProNet</h1>
					</Link>
					<p className="mt-2 font-dosis text-sm text-orange">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						Voluptatibus, sapiente!
					</p>
					<div className="mt-4 flex items-start flex-col">
						<input
							className="w-full h-[50px] mb-4 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							type="text"
							placeholder="First-Name"
							id="firstName"
							value={firstName}
							onChange={handleChange}
						/>
						<input
							className="w-full h-[50px] mb-4 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							type="text"
							placeholder="Last-Name"
							id="lastName"
							value={lastName}
							onChange={handleChange}
						/>
						<input
							className="w-full h-[50px] mb-4 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							type="email"
							placeholder="Your Email"
							id="email"
							value={email}
							onChange={handleChange}
						/>
						<PhoneInput
							className={`custom-phone-input mb-4 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none`}
							placeholder="Enter phone number"
							value={value}
							international={true}
							onChange={setValue}
						/>
						<input
							className="w-full h-[50px] mb-2 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							type="password"
							placeholder="Create password"
							id="password"
							value={password}
							onChange={handleChange}
						/>
						<VerificationModal value={value} formData={formData}>
							<p>REGISTER</p>
						</VerificationModal>
						<Link
							to="/login"
							className="mt-2 font-dosis duration-500 hover:text-orange"
						>
							<p>Already have an account</p>
						</Link>
					</div>
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

export default RegisterUser;
