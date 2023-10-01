import { useState, useEffect } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { GrAttachment } from "react-icons/gr";
import { Modal, Backdrop, Fade, Avatar } from "@mui/material";

const CreatePostModal = ({ children, intro }) => {
	// post states
	const [pics, setPics] = useState([]);
	const [postText, setPostText] = useState("");
	const [loading, setLoading] = useState(false);

	// state to handle the modal visibilty
	const [open, setOpen] = useState(false);
	// function to open the modal
	const handleOpen = () => setOpen(true);
	// function to close the modal
	const handleClose = () => setOpen(false);

	const handlepics = async (selectedPics) => {
		try {
			setLoading(true);

			if (!selectedPics) {
				setLoading(false);
				return;
			}
			const files = [...selectedPics];
			console.log(files);
			for (const pic of files) {
				console.log(123);
				if (pic.type === "image/jpeg" || pic.type === "image/png") {
					await uploadImage(pic);
				} else {
					console.log(
						`File ${pic.name} is not an image and will not be uploaded.`
					);
				}
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

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
		const picUrl = data.url;
		console.log(data);
		setPics((prevPics) => [...prevPics, picUrl]);
	};

	const handleCreatePost = async (e) => {
		e.preventDefault();
		console.log(123);
	};

	const handleRemoveFile = (pic) => {
		const newFiles = pics.filter((file) => file !== pic);
		console.log(newFiles);
		setPics(newFiles);
	};

	useEffect(() => {
		console.log(pics);
	}, [pics]);

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
						<div className="absolute top-[5%] left-[3%] p-4 rounded-md shadow-md h-[500px] w-[400px] bg-white md:w-[500px] md:left-[32%]">
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
		</div>
	);
};

export default CreatePostModal;
