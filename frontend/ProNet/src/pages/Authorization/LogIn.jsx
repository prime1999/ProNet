import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/images/png/logo.png";
import NotificationAlert from "../../components/miscellaneous/NotificationAlert";
import { logUserIn, reset } from "../../features/Auth/AuthSlice";

const LogIn = () => {
	// input fields state
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// check the log in status variable in the redux store
	const { isSuccess } = useSelector((state) => state.auth);

	// destructure the formData object
	let { email, password } = formData;

	useEffect(() => {
		if (isSuccess) {
			navigate("/");
		}
		dispatch(reset());
	}, [dispatch, isSuccess]);

	// function to set the value of the formData
	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	// function to handle submittion
	const handleSubmit = (e) => {
		e.preventDefault();
		// make a try catch block
		try {
			// check if all the input fields were filled
			if (!email || !password) {
				console.log(112);
				handleShowSnackbar("error", "Please fill in all fields");
			}
			const userData = {
				email,
				password,
			};
			dispatch(logUserIn(userData));
			email = "";
			password = "";
		} catch (error) {
			handleShowSnackbar("error", error.message);
		}
	};

	// function to show snack-bar alert
	const handleShowSnackbar = (severity, message) => {
		setOpenAlert(true);
		setAlertSeverity(severity);
		setAlertMessage(message);
	};
	return (
		<div className="image-back">
			<form
				onSubmit={handleSubmit}
				className="h-screen flex items-center justify-center"
			>
				<div className="w-[420px] h-[420px] glassmorphism-card p-4">
					<Link
						to="/"
						className="flex items-center font-black font-semibold text-4xl"
					>
						<img className="w-12" src={logo} alt="" />
						<h1 className="ml-2">ProNet</h1>
					</Link>
					<p className="mt-4 font-dosis text-sm text-orange">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						Voluptatibus, sapiente!
					</p>
					<div className="mt-8 flex items-start flex-col">
						<input
							className="w-full h-[50px] mb-4 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							type="email"
							placeholder="Your Email"
							value={email}
							id="email"
							onChange={handleChange}
						/>

						<input
							className="w-full h-[50px] mb-2 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							type="password"
							placeholder="Password"
							value={password}
							id="password"
							onChange={handleChange}
						/>
						<div className="font-cour font-semibold mt-2 px-4">
							<button className="flex justify-end duration-500 hover:text-orange">
								Forgot password?
							</button>
						</div>
						<button
							onClick={handleSubmit}
							className="py-2 px-4 mt-2 font-bold w-full text-md bg-gradient-to-r from-orange to-pink rounded-md duration-1000 ease-in-out hover:bg-gradient-to-r hover:from-pink hover:to-orange"
						>
							LOG-IN
						</button>
						<Link
							to="/register"
							className="mt-4 font-dosis duration-500 hover:text-orange"
						>
							<p>Don't have an Account?</p>
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

export default LogIn;
