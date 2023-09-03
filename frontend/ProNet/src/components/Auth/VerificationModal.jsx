import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, Modal, Fade } from "@mui/material";
import NotificationAlert from "../miscellaneous/NotificationAlert";
// import { toast } from "react-toastify";
import otp from "../../assets/images/png/otp3.png";
import {
	registerUser,
	reset,
	sendCode,
	verifyCode,
} from "../../features/Auth/AuthSlice";

const VerificationModal = ({ children, value, formData }) => {
	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	// state for the modal
	const [open, setOpen] = useState(false);
	// state for the verification code input
	const [verificationcode, setVerificationcode] = useState("");

	const dispatch = useDispatch();

	// check the sentCode and verify variable in the redux store
	const { sentCode, verify } = useSelector((state) => state.auth);

	// destructure the formData object
	const { firstName, lastName, email, password } = formData;

	// useEffect to show the verification modal
	useEffect(() => {
		// check if the code was sent
		if (sentCode) {
			// if it was then open the modal
			setOpen(true);
		}
		dispatch(reset());
	}, [sentCode, dispatch]);

	// useEffect to register the user
	useEffect(() => {
		if (verify) {
			const data = {
				...formData,
				phoneNumber: value,
			};
			dispatch(registerUser(data));
			console.log(123);
		}
	}, [verify, dispatch]);

	// function to open the modal
	const handleVerification = (e) => {
		e.preventDefault();
		if (!firstName || !lastName || !email || !password || !value) {
			// if it was not then throw an error message
			setOpenAlert(true);
			setAlertSeverity("error");
			setAlertMessage("Pleasse fill in all fields");
		} else {
			dispatch(sendCode({ phoneNumber: value }));
		}
	};

	// function to handle the code input
	const handleCode = (inputedCode) => {
		setVerificationcode(inputedCode);
	};

	// to handle the form submition
	const handleSubmit = (e) => {
		e.preventDefault();
		if (verificationcode !== "") {
			dispatch(verifyCode({ verificationCode: verificationcode }));
		} else {
			console.log(13);
		}
	};

	// function to close modal
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			{children && (
				<button
					onClick={handleVerification}
					className="py-2 px-4 mt-2 font-bold w-full text-md bg-gradient-to-r from-orange to-pink rounded-md duration-1000 ease-in-out hover:bg-gradient-to-r hover:from-pink hover:to-orange"
				>
					{children}
				</button>
			)}
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<div className="absolute top-[10%] right-1/2 flex justify-center items-center w-96 translate-x-1/2 p-8 text-black outline-none glassmorphism-card">
						<div className="flex flex-col justify-center items-center">
							<img className="w-48" src={otp} alt="" />
							<h1 className="font-poppins font-bold text-center text-2xl mt-4">
								Verification
							</h1>
							<p className="text-md">Enter the 6 digit code sent to</p>
							<p className="font-bold text-center font-poppins mt-2">
								+2347085289675
							</p>
							<form onSubmit={handleSubmit} className="w-full">
								<input
									value={verificationcode}
									onChange={(e) => handleCode(e.target.value)}
									className="w-full h-[40px] font-dosis tracking-widest text-lg my-4 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
									type="number"
									placeholder="Enter code"
								/>
							</form>
						</div>
					</div>
				</Fade>
			</Modal>
			<div className="w-full absolute bg-red-50">
				<NotificationAlert
					open={openAlert}
					message={alertMessage}
					severity={alertSeverity}
					onClose={() => setOpenAlert(false)}
				/>
			</div>
		</>
	);
};

export default VerificationModal;
