import { useState } from "react";
import { useDispatch } from "react-redux";
import { GrDocumentUpdate } from "react-icons/gr";
import { Modal, Backdrop, Fade } from "@mui/material";
import { updateProfileIntro } from "../../features/Profile/ProfileIntro/ProfileIntroSlice";
import NotificationAlert from "../miscellaneous/NotificationAlert";

const UpdateEducation = ({ intro, education, children }) => {
	const dispatch = useDispatch();
	const [toUpdateEducation, setToUpdateEducation] = useState(education);
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

	const { name, degree, fieldOfStudy, grade, startDate, endDate } =
		toUpdateEducation;

	const handleChange = (e) => {
		setToUpdateEducation((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
		console.log(toUpdateEducation);
	};
	const updateEducation = () => {
		if (!name || !fieldOfStudy || !degree) {
			handleShowSnackbar("error", "Please fill in all requied fields");
		} else {
			const updatedEducation = intro.map((intro) =>
				intro._id === toUpdateEducation._id ? toUpdateEducation : intro
			);

			const introUpdates = {
				education: updatedEducation,
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
						<div className="absolute top-[5%] left-[30%] rounded-md shadow-md h-[500px] w-2/4 bg-white p-4 outline-0 overflow-y-auto xl:left-[20%]">
							<h3 className="mb-8 font-poppins font-semibold text-xl">
								Edit Education
							</h3>
							<form key={toUpdateEducation?._id}>
								<label className="text-gray-300">School*</label>
								<input
									className="w-full border rounded-md p-2 my-2 focus:outline-none"
									type="text"
									id="name"
									onChange={handleChange}
									value={name}
								/>
								<label className="text-gray-300">Degree*</label>
								<input
									className="w-full border rounded-md p-2 my-2 focus:outline-none"
									type="text"
									id="degree"
									onChange={handleChange}
									value={degree}
								/>
								<label className="text-gray-300">Field of study*</label>
								<input
									className="w-full border rounded-md p-2 my-2 focus:outline-none"
									type="text"
									id="fieldOfStudy"
									onChange={handleChange}
									value={fieldOfStudy}
								/>
								<label className="text-gray-300">Grade</label>
								<input
									className="w-full border rounded-md p-2 my-2 focus:outline-none"
									type="text"
									id="grade"
									onChange={handleChange}
									value={grade}
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
									onClick={updateEducation}
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

export default UpdateEducation;
