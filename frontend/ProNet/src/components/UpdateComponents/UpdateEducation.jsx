import { useState } from "react";
import { useDispatch } from "react-redux";
import { GrDocumentUpdate } from "react-icons/gr";
import { Modal, Backdrop, Fade } from "@mui/material";
import { updateProfileIntro } from "../../features/Profile/ProfileIntro/ProfileIntroSlice";

const UpdateEducation = ({ intro, education, children }) => {
	const dispatch = useDispatch();
	const [toUpdateEducation, setToUpdateEducation] = useState(education);
	console.log(intro);
	// state to handle the modal visibilty
	const [open, setOpen] = useState(false);
	// function to open the modal
	const handleOpen = () => setOpen(true);
	// function to close the modal
	const handleClose = () => setOpen(false);

	const handleChange = (e) => {
		setToUpdateEducation((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
		console.log(toUpdateEducation);
	};
	const updateEducation = () => {
		const updatedEducation = intro.map((intro) =>
			intro._id === toUpdateEducation._id ? toUpdateEducation : intro
		);

		const introUpdates = {
			education: updatedEducation,
		};
		dispatch(updateProfileIntro(introUpdates));
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
						<div className="absolute top-[10%] left-[20%] rounded-md shadow-md h-[500px] w-[800px] bg-white p-4 outline-0 overflow-y-auto">
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
									value={toUpdateEducation?.name}
								/>
								<label className="text-gray-300">Degree</label>
								<input
									className="w-full border rounded-md p-2 my-2 focus:outline-none"
									type="text"
									id="degree"
									onChange={handleChange}
									value={toUpdateEducation?.degree}
								/>
								<label className="text-gray-300">Field of study</label>
								<input
									className="w-full border rounded-md p-2 my-2 focus:outline-none"
									type="text"
									id="fieldToStudy"
									onChange={handleChange}
									value={toUpdateEducation?.fieldOfStudy}
								/>
								<label className="text-gray-300">Start date & end date</label>
								<div className="w-full flex justify-between items-center">
									<input
										className="w-1/2 border rounded-md p-2 my-2 focus:outline-none"
										type="text"
										id="startDate"
										onChange={handleChange}
										value={toUpdateEducation?.startDate}
									/>
									<input
										className="w-1/2 ml-2 border rounded-md p-2 my-2 focus:outline-none"
										type="text"
										id="endDate"
										onChange={handleChange}
										value={toUpdateEducation?.endDate}
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
		</div>
	);
};

export default UpdateEducation;
