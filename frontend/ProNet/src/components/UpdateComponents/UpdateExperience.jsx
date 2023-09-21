import { useState } from "react";
import { useDispatch } from "react-redux";
import { GrDocumentUpdate } from "react-icons/gr";
import { Modal, Backdrop, Fade } from "@mui/material";
import { updateProfileIntro } from "../../features/Profile/ProfileIntro/ProfileIntroSlice";
import NotificationAlert from "../miscellaneous/NotificationAlert";

const UpdateExperience = ({ intro, experience, children }) => {
	const dispatch = useDispatch();
	const [toUpdateExperience, setToUpdateExperience] = useState(experience);
	// state to handle the modal visibilty
	const [open, setOpen] = useState(false);
	// function to open the modal
	const handleOpen = () => setOpen(true);
	// function to close the modal
	const handleClose = () => setOpen(false);
	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	const { company, position, details, startDate, endDate } = toUpdateExperience;

	const handleChange = (e) => {
		setToUpdateExperience((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const updateExperience = () => {
		if (!company || !position) {
			handleShowSnackbar("error", "Please fill in all required fields");
		} else {
			const updatedExperience = intro.map((intro) =>
				intro._id === toUpdateExperience._id ? toUpdateExperience : intro
			);

			const introUpdates = {
				experience: updatedExperience,
			};
			dispatch(updateProfileIntro(introUpdates));
		}
	};

	// function to show snack-bar alert
	const handleShowSnackbar = (severity, message) => {
		setOpenAlert(true);
		setAlertSeverity(severity);
		setAlertMessage(message);
	};

	return (
		<div>
			{children && <span onClick={handleOpen}>{children}</span>}
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
						<div className="absolute top-[5%] left-[10%] rounded-md shadow-md h-[500px] w-3/4 bg-white p-4 outline-0 overflow-y-auto lg:top-[5%] lg:w-1/2 lg:left-[30%]">
							<h3 className="mb-8 font-poppins font-semibold text-xl">
								Edit Work Experience
							</h3>
							<form key={toUpdateExperience?._id}>
								<label className="text-gray-300">Company*</label>
								<input
									className="w-full border rounded-md p-2 my-2 focus:outline-none"
									type="text"
									id="company"
									onChange={handleChange}
									value={company}
								/>
								<label className="text-gray-300">Position*</label>
								<input
									className="w-full border rounded-md p-2 my-2 focus:outline-none"
									type="text"
									id="position"
									onChange={handleChange}
									value={position}
								/>
								<label className="text-gray-300">details</label>
								<textarea
									className="w-full border rounded-md p-2 my-2 focus:outline-none"
									type="text"
									id="details"
									onChange={handleChange}
									value={details}
								/>
								<label className="text-gray-300">Start date & end date</label>
								<div className="w-full flex justify-between items-center">
									<input
										className="w-1/2 border rounded-md p-2 my-2 focus:outline-none"
										type="text"
										id="startDate"
										onChange={handleChange}
										value={startDate}
									/>
									<input
										className="w-1/2 ml-2 border rounded-md p-2 my-2 focus:outline-none"
										type="text"
										id="endDate"
										onChange={handleChange}
										value={endDate}
									/>
								</div>
								<div
									onClick={updateExperience}
									className="flex items-center w-24 p-2 mt-4 duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-pink hover:to-orange"
								>
									<GrDocumentUpdate />
									<p className="ml-2 font-dosis">Update</p>
								</div>
							</form>
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

export default UpdateExperience;
