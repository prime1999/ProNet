import { useState } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { GrAttachment } from "react-icons/gr";
import { Modal, Backdrop, Fade, Avatar } from "@mui/material";
import { createPost } from "../../features/Post/PostSlice";
import NotificationAlert from "../miscellaneous/NotificationAlert";

const CreatePostModal = ({ children, intro }) => {
	const dispatch = useDispatch();
	// post states
	const [pics, setPics] = useState([]);
	const [postText, setPostText] = useState("");
	const [loading, setLoading] = useState(false);

	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	// state to handle the modal visibilty
	const [open, setOpen] = useState(false);
	// function to open the modal
	const handleOpen = () => setOpen(true);
	// function to close the modal
	const handleClose = () => setOpen(false);

	// function to upload files selected by the user
	const handlepics = async (selectedPics) => {
		// make a try-catch block
		try {
			// set the loading to true to show a loader
			setLoading(true);
			// check if a file was selected
			if (!selectedPics) {
				// if it wasn't then,set remove the loader and cancel the upload process
				setLoading(false);
				return;
			}
			// if it was then,
			// store the files selected in an array
			const files = [...selectedPics];
			// loop through the files
			for (const pic of files) {
				// on each pic of the files, check if the type is a jpeg or png
				if (pic.type === "image/jpeg" || pic.type === "image/png") {
					// await on uploadImage function of each pic
					await uploadImage(pic);
				} else {
					// show an error message if any of the file is not a jpeg or png file
					handleShowSnackbar(
						"error",
						`File ${pic.name} is not an image and will not be uploaded.`
					);
				}
			}
			// set the loading to false after upload is done
			setLoading(false);
		} catch (error) {
			handleShowSnackbar("error", "files cannot be uploaded, please try again");
		}
	};

	// function to upload an image
	const uploadImage = async (pic) => {
		// create a new form data instance to send to cloudinary
		const picData = new FormData();
		// append the following key-value pairs to it
		picData.append("file", pic);
		picData.append("upload_preset", "proNet");
		picData.append("cloud_name", "ddboi173o");
		// send the data(your new FormData with the required data) to your cloudinary url
		const { data } = await axios.post(
			"https://api.cloudinary.com/v1_1/ddboi173o/image/upload",
			picData
		);
		// store the image url in the picUrl variable
		const picUrl = data.url;
		// push the url to the Pics array state
		setPics((prevPics) => [...prevPics, picUrl]);
	};

	// function to create the post based on the data entered by the user
	const handleCreatePost = async (e) => {
		// prevent the default behaviour of the form
		e.preventDefault();
		// make a try-catch block
		try {
			// check if the user's post is a text or fiiles or both
			if (postText !== "" || pics) {
				// if the user actually has one of them, then:
				// store the data entered in the variable
				const postData = {
					content: postText,
					media: JSON.stringify(pics),
				};
				// dispatch the createPost function in the post slice, passing the postData as an argument
				dispatch(createPost(postData));
				// after the post has been uploaded, clear all the fields used by the user
				setPostText("");
				setPics([]);
				// show a success message
				handleShowSnackbar("success", "post upload successful");
			}
		} catch (error) {
			// if there was an error in the try block, then show an error message
			handleShowSnackbar("error", "post upload failed");
		}
	};

	// function to remove a file from been uploaded to the DB
	const handleRemoveFile = (pic) => {
		// filter out the file to be removed from the pics array
		const newFiles = pics.filter((file) => file !== pic);
		setPics(newFiles);
	};

	// function to show snack-bar alert
	const handleShowSnackbar = (severity, message) => {
		setOpenAlert(true);
		setAlertSeverity(severity);
		setAlertMessage(message);
	};
	return (
		<div className="w-full">
			{children && (
				<span className="w-full" onClick={handleOpen}>
					{children}
				</span>
			)}
			<div>
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
						<div className="absolute top-[5%] p-4 rounded-md shadow-md h-[500px] w-full bg-white md:w-[600px] md:left-[18%] lg:left-[28%]">
							<div className="relative h-full">
								<h6 className="text-center font-poppins font-bold">
									Create a Post
								</h6>
								<div className="flex items-center mt-4">
									<Avatar src={intro?.pic} />
									<h6 className="ml-2 font-semibold">{`${intro?.firstName} ${intro?.lastName}`}</h6>
								</div>
								<form onSubmit={handleCreatePost} className="h-full">
									<div className="h-48 w-full mt-4">
										<textarea
											type="text"
											placeholder="what's on your mind?"
											value={postText}
											onChange={(e) => setPostText(e.target.value)}
											className="p-2 text-gray-500 text-md w-full h-full focus:outline-none"
										/>
									</div>
									<div className="flex items-center w-full">
										{pics &&
											pics?.map((pic, index) => (
												<div key={index} className="relative mr-1 w-16">
													<img
														className="w-full object-cover"
														src={pic}
														alt="post-img"
													/>
													<div
														style={{
															backgroundColor: "rgba(0, 0, 0, 0.5)",
														}}
														className="absolute w-full h-full top-0 left-0"
													></div>
													<div
														onClick={() => handleRemoveFile(pic)}
														className="absolute top-1 right-1 hover:cursor-pointer"
													>
														<MdCancel />
													</div>
												</div>
											))}
									</div>
									<div className="absolute bottom-0 w-full mt-16">
										<div className="w-2">
											<label
												htmlFor="attachment"
												className="w-8 bg-red-500 hover:cursor-pointer"
											>
												<GrAttachment />
											</label>
											<input
												className="hidden w-full"
												type="file"
												id="attachment"
												multiple
												onChange={(e) => handlepics(e.target.files)}
											/>
										</div>
										<button
											className="text-center mt-8 font-poppins text-sm font-semibold w-full bg-light py-2 px-4 rounded-md duration-500 hover:cursor-pointer hover:bg-orange"
											disabled={postText === "" || pics == [] ? true : false}
										>
											Post
										</button>
									</div>
								</form>
							</div>
						</div>
					</Fade>
				</Modal>
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

export default CreatePostModal;
