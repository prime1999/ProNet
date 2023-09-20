import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { Avatar } from "@mui/material";
import NotificationAlert from "../miscellaneous/NotificationAlert";
import { updateProfileIntro } from "../../features/Profile/ProfileIntro/ProfileIntroSlice";
import Spinner from "../Spinner/Spinner";

const ProfilePics = ({
	intro,
	fetchProfileIntroAgain,
	setFetchProfileIntroAgain,
}) => {
	// init the dispatch function
	const dispatch = useDispatch();
	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	const [pic, setPic] = useState("");
	const [bgPic, setBgPic] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setPic(intro?.pic);
		setBgPic(intro?.backgroundPhoto);
	}, [intro]);
	// function to upload the user's profile picture
	const handlePic = async (selectedPic) => {
		try {
			setLoading(true);

			if (!selectedPic) {
				setLoading(false);
				return;
			}
			// check if the image selected is either a jpeg or a png file
			if (
				selectedPic.type === "image/jpeg" ||
				selectedPic.type === "image/png"
			) {
				// create a new form data instance to send to cloudinary
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
				const picUrl = data.url;
				setPic(picUrl);
				setLoading(false);
				const introUpdates = {
					pic: data.url,
				};
				// dispatch the update profile intro function in the intro slice
				dispatch(updateProfileIntro(introUpdates));
				setFetchProfileIntroAgain(!fetchProfileIntroAgain);
				// show success message
				handleShowSnackbar("success", "Pic uploaded successfully");
			} else {
				setLoading(false);
				// show error message
				handleShowSnackbar("error", "Pic has to be a jpeg/png file");
			}
		} catch (error) {
			setLoading(false);
			// show error message
			handleShowSnackbar("error", "could not upload pic");
		}
	};

	// function to update the background photo
	const handleBackgroundPhoto = async (selectedPic) => {
		console.log(222);
		try {
			setLoading(true);

			if (!selectedPic) {
				setLoading(false);
				return;
			}
			console.log(11);
			// check if the image selected is either a jpeg or a png file
			if (
				selectedPic.type === "image/jpeg" ||
				selectedPic.type === "image/png"
			) {
				console.log(22);
				// create a new form data instance to send to cloudinary
				const picData = new FormData();
				// append the following key-value pairs to it
				picData.append("file", selectedPic);
				picData.append("upload_preset", "proNet");
				picData.append("cloud_name", "ddboi173o");
				console.log(33);
				// send the data(your new FormData with the required data) to your cloudinary url
				const { data } = await axios.post(
					"https://api.cloudinary.com/v1_1/ddboi173o/image/upload",
					picData
				);
				console.log(44);
				const picUrl = data.url;
				setBgPic(picUrl);
				setLoading(false);
				const introUpdates = {
					backgroundPhoto: data.url,
				};
				// dispatch the update profile intro function in the intro slice
				dispatch(updateProfileIntro(introUpdates));
				setFetchProfileIntroAgain(!fetchProfileIntroAgain);
				// show success message
				handleShowSnackbar("success", "background photo uploaded successfully");
			} else {
				setLoading(false);
				// show error message
				handleShowSnackbar(
					"error",
					"background photo has to be a jpeg/png file"
				);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			// show error message
			handleShowSnackbar("error", "could not upload pic");
		}
	};

	// function to show snack-bar alert
	const handleShowSnackbar = (severity, message) => {
		setOpenAlert(true);
		setAlertSeverity(severity);
		setAlertMessage(message);
	};
	return (
		<div className="relative top-16 flex items-center justify-between w-10/12 mx-auto">
			<div className="">
				{loading ? (
					<>
						<Spinner />
					</>
				) : (
					<Avatar
						sx={{ width: "170px", height: "170px", marginLeft: "20px" }}
						alt="user avatar"
						src={pic}
					></Avatar>
				)}
				<div className="absolute top-28 left-40">
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
			<div className="">
				<label htmlFor="profileBgPic">
					<p className="bg-light p-2 rounded-full duration-500 hover:cursor-pointer hover:bg-orange">
						<FiEdit2 />
					</p>
				</label>
				<input
					type="file"
					accept="image/*"
					id="profileBgPic"
					className="hidden"
					onChange={(e) => handleBackgroundPhoto(e.target.files[0])}
				/>
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

export default ProfilePics;
