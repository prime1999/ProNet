import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

	const [pic, setPic] = useState(intro?.pic);
	const [loading, setLoading] = useState(false);
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
				setPic(data.url);
				setLoading(false);
				const introUpdates = {
					pic: data.url,
				};
				// dispatch the update profile intro function in the intro slice
				dispatch(updateProfileIntro(introUpdates));
				console.log(pic);
				setFetchProfileIntroAgain(!fetchProfileIntroAgain);
			} else {
				setLoading(false);
				handleShowSnackbar("error", "Pic has to be a jpeg/png file");
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
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
			{/* <div className="">
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
			</div> */}
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
