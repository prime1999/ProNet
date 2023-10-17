import { useState } from "react";
import { Modal, Backdrop, Fade, Avatar } from "@mui/material";
import JobPostingForm from "../miscellaneous/JobPosting/JobPostingForm";

const CreateJobPosting = ({ children }) => {
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
						<div className="absolute top-[5%] p-4 rounded-md shadow-md h-[550px] w-full bg-white md:w-[500px] md:left-[18%] lg:left-[35%]">
							<JobPostingForm />
						</div>
					</Fade>
				</Modal>
			</div>
		</div>
	);
};

export default CreateJobPosting;
