import { useState } from "react";
import { useDispatch } from "react-redux";
import { GrDocumentUpdate } from "react-icons/gr";
import { Modal, Backdrop, Fade } from "@mui/material";
import { updateProfileIntro } from "../../features/Profile/ProfileIntro/ProfileIntroSlice";

const UpdateSummary = ({ intro, children }) => {
	const dispatch = useDispatch();
	const [summary, setSummary] = useState(intro?.summary || "");
	// state to handle the modal visibilty
	const [open, setOpen] = useState(false);
	// function to open the modal
	const handleOpen = () => setOpen(true);
	// function to close the modal
	const handleClose = () => setOpen(false);

	const handleChange = (e) => {
		setSummary(e.target.value);
	};
	const updateSummary = () => {
		const introUpdates = {
			summary,
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
						<div className="absolute top-[40%] left-[20%] rounded-md shadow-md h-[200px] w-[800px] bg-white p-4 outline-0 overflow-y-auto">
							<h3 className="font-bold font-poppins text-lg mb-2">
								Edit Summary
							</h3>
							<form className="w-full h-[70px]">
								<textarea
									value={summary}
									onChange={handleChange}
									autoFocus
									className="w-full h-full focus:outline-none"
								></textarea>
							</form>
							<div
								onClick={updateSummary}
								className="flex items-center w-24 p-2 duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-pink hover:to-orange"
							>
								<GrDocumentUpdate />
								<p className="ml-2 font-dosis">Update</p>
							</div>
						</div>
					</Fade>
				</Modal>
			</div>
		</div>
	);
};

export default UpdateSummary;
