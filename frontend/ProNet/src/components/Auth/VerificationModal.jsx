import { useState } from "react";
import { Backdrop, Modal, Fade } from "@mui/material";
import otp from "../../assets/images/png/otp3.png";

const VerificationModal = ({ children }) => {
	const [open, setOpen] = useState(false);

	// function to open the modal
	const handleOpen = () => {
		setOpen(true);
	};

	// function to close modal
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			{children && (
				<button
					onClick={handleOpen}
					className="py-2 px-4 mt-2 font-bold w-full text-md bg-gradient-to-r from-orange to-pink rounded-md duration-1000 ease-in-out hover:bg-gradient-to-r hover:from-pink hover:to-orange"
				>
					{children}
				</button>
			)}
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
					<div className="absolute top-[10%] right-1/2 flex justify-center items-center w-96 translate-x-1/2 p-8 text-black outline-none glassmorphism-card">
						<div className="">
							<img className="w-48" src={otp} alt="" />
							<h1 className="font-poppins font-bold text-center text-2xl mt-4">
								Verification
							</h1>
							<p className="text-md">Enter the 6 digit code sent to</p>
							<p className="font-bold text-center font-poppins mt-2">
								+2347085289675
							</p>
							<input
								className="w-full h-[40px] my-4 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
								type="text"
								placeholder="Enter code"
							/>
						</div>
					</div>
				</Fade>
			</Modal>
		</>
	);
};

export default VerificationModal;
