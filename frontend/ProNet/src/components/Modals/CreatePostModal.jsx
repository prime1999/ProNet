import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrAttachment } from "react-icons/gr";
import { Modal, Backdrop, Fade, Avatar } from "@mui/material";

const CreatePostModal = ({ children, intro }) => {
	// state to show the edit state
	const [editMode, setEditMode] = useState(false);

	// state to handle the modal visibilty
	const [open, setOpen] = useState(false);
	// function to open the modal
	const handleOpen = () => setOpen(true);
	// function to close the modal
	const handleClose = () => setOpen(false);

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
								<form className="h-full">
									<div className="h-48 w-full mt-4">
										<textarea
											type="text"
											placeholder="what's on your mind?"
											className="p-2 text-gray-500 text-md w-full h-full focus:outline-none"
										/>
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
											/>
										</div>
										<button className="text-center mt-8 font-poppins text-sm font-semibold w-full bg-light py-2 px-4 rounded-md duration-500 hover:cursor-pointer hover:bg-orange">
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
