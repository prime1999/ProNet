import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillEye } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { Modal, Backdrop, Fade } from "@mui/material";
import UpdateJobPreference from "../UpdateComponents/UpdateJobPreference";

const JobProfileModal = ({
	children,
	jobDetails,
	fetchJobProfileAgain,
	setFetchJobProfileAgain,
}) => {
	// state to show the edit state
	const [editMode, setEditMode] = useState(false);
	// state to handle the modal visibilty
	const [open, setOpen] = useState(false);
	// function to open the modal
	const handleOpen = () => setOpen(true);
	// function to close the modal
	const handleClose = () => setOpen(false);

	return (
		<>
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
							<div className="absolute top-[10%] left-[35%] rounded-md shadow-md h-[430px] w-[500px] bg-white overflow-y-auto">
								{!editMode ? (
									<>
										<div className="flex items-center justify-between p-4 font-semibold text-lg text-gray-400">
											<h4>Job Preference</h4>
											<FiEdit2
												onClick={() => setEditMode(!editMode)}
												className="text-black font-bold hover:cursor-pointer"
											/>
										</div>
										<hr className="border-darkBlue" />
										<div className="p-4">
											<div className="flex items-center">
												{jobDetails?.jobTitles?.map((profile, index) => (
													<div key={index} className="ml-2 text-lg">
														<p className="text-md">{profile}</p>
													</div>
												))}
											</div>
											<div className="mt-8">
												<h3 className="ml-2 font-bold">Job-Types</h3>
												<div className="flex items-center">
													{jobDetails?.jobTypes?.map((profile, index) => (
														<div key={index} className="ml-2">
															<p className="text-md">{profile}</p>
														</div>
													))}
												</div>
											</div>
											<div className="mt-8">
												<h3 className="ml-2 font-bold">Job Locations</h3>
												<div className="flex items-center">
													{jobDetails?.jobLocations?.map((profile, index) => (
														<div key={index} className="ml-2">
															<p className="text-md">{profile}</p>
														</div>
													))}
												</div>
											</div>
											<div className="mt-8">
												<h3 className="ml-2 font-bold">Location-Types</h3>
												<div className="flex items-center">
													{jobDetails?.jobTypes?.map((profile, index) => (
														<div key={index} className="ml-2">
															<p className="text-md">{profile}</p>
														</div>
													))}
												</div>
											</div>

											<div className="mt-8">
												<h3 className="ml-2 font-bold">Employment-Types</h3>
												<div className="flex items-center">
													{jobDetails?.employmentTypes ? (
														<>
															{jobDetails?.employmentTypes?.map(
																(profile, index) => (
																	<div key={index} className="ml-2">
																		<p className="text-md">{profile}</p>
																	</div>
																)
															)}
														</>
													) : (
														<div className="ml-2">
															<p className="text-md">Not specified</p>
														</div>
													)}
												</div>
											</div>
										</div>
										<hr className="border-darkBlue" />
										<div className="flex items-center px-4 py-4">
											<AiFillEye className="text-lg" />
											<p className="ml-2 text-gray-400">All ProNet members</p>
										</div>
									</>
								) : (
									<>
										<UpdateJobPreference
											fetchJobProfileAgain={fetchJobProfileAgain}
											setFetchJobProfileAgain={setFetchJobProfileAgain}
											editMode={editMode}
											setEditMode={setEditMode}
											jobDetails={jobDetails}
										/>
									</>
								)}
							</div>
						</Fade>
					</Modal>
				</div>
			</div>
		</>
	);
};

export default JobProfileModal;
