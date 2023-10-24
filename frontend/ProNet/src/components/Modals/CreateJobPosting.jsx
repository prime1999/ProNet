import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Backdrop, Fade } from "@mui/material";
import JobPostingForm from "../miscellaneous/JobPosting/JobPostingForm";
import { reset } from "../../features/jobs/JobSlice";

const CreateJobPosting = ({ children }) => {
	// state to handle the modal visibilty
	const [open, setOpen] = useState(false);
	// function to open the modal
	const handleOpen = () => setOpen(true);
	// function to close the modal
	const handleClose = () => setOpen(false);

	const { isSuccess } = useSelector((state) => state.jobs);

	useEffect(() => {
		if (isSuccess) {
			setOpen(false);
			reset();
		}
	}, [isSuccess]);
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
						<div className="absolute top-[5%] p-4 rounded-md shadow-md h-[550px] w-full overflow-auto bg-white md:w-[500px] md:left-[18%] lg:left-[35%]">
							<JobPostingForm />
						</div>
					</Fade>
				</Modal>
			</div>
		</div>
	);
};

export default CreateJobPosting;
