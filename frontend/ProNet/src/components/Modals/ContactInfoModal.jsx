import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { BsFillCalendarEventFill, BsFillTelephoneFill } from "react-icons/bs";
import { FaAddressBook, FaMailBulk } from "react-icons/fa";
import { TbWorldCheck } from "react-icons/tb";
import { Modal, Backdrop, Fade } from "@mui/material";
import {
	getContactInfo,
	reset,
} from "../../features/Profile/ContactInfo/ContactInfoSlice";
import UpdateContactInfo from "../UpdateComponents/UpdateContactInfo";
const ContactInfoModal = ({ children }) => {
	// init the dispatch hook
	const dispatch = useDispatch();
	// get the user's contact info from the redux store
	const { contactInfo, isLoading, isSuccess, message } = useSelector(
		(state) => state.contactInfo
	);
	const [fetchContactsAgain, setFetchContactsAgain] = useState(false);
	// state to show the edit state
	const [editMode, setEditMode] = useState(false);
	const [contact, setContact] = useState(null);
	// state to handle the modal visibilty
	const [open, setOpen] = useState(false);
	// function to open the modal
	const handleOpen = () => setOpen(true);
	// function to close the modal
	const handleClose = () => setOpen(false);

	useEffect(() => {
		dispatch(getContactInfo());
		console.log(fetchContactsAgain);
	}, [fetchContactsAgain]);

	useEffect(() => {
		if (isSuccess) {
			setContact(contactInfo[0]);
		}
		dispatch(reset());
	}, [isSuccess]);
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
						<div className="absolute top-[10%] left-[35%] rounded-md shadow-md h-[430px] w-[500px] bg-white overflow-y-auto">
							{!editMode ? (
								<>
									<div className="flex items-center justify-between p-4 font-semibold text-lg text-gray-400">
										<h4>Contact Info</h4>
										<FiEdit2
											onClick={() => setEditMode(!editMode)}
											className="text-black font-bold hover:cursor-pointer"
										/>
									</div>
									<hr className="border-darkBlue" />
									<div className="p-4">
										<div className="flex items-start">
											<FaMailBulk className="mt-1" />
											<div className="ml-2">
												<h6 className="text-lg font-bold capitalize">Email</h6>
												<p className="text-orange">{contact?.email}</p>
											</div>
										</div>
										<div className="flex items-start mt-4">
											<BsFillTelephoneFill className="mt-1" />
											<div className="ml-2">
												<h6 className="text-lg font-bold capitalize">Phone</h6>
												<p className="text-orange">{contact?.phoneNumber}</p>
											</div>
										</div>
										<div className="flex items-start mt-4">
											<TbWorldCheck className="mt-1" />
											<div className="ml-2">
												<h6 className="text-lg font-bold capitalize">
													Website
												</h6>
												<p className="text-orange">{contact?.Website}</p>
											</div>
										</div>
										<div className="flex items-start mt-4">
											<FaAddressBook className="mt-1" />
											<div className="ml-2">
												<h6 className="text-lg font-bold capitalize">
													Address
												</h6>
												<p className="text-orange">{contact?.Address}</p>
											</div>
										</div>
										<div className="flex items-start mt-4">
											<BsFillCalendarEventFill className="mt-1" />
											<div className="ml-2">
												<h6 className="text-lg font-bold capitalize">
													Birthday
												</h6>
												<p className="text-orange">{contact?.BirthDay}</p>
											</div>
										</div>
									</div>
								</>
							) : (
								<UpdateContactInfo
									fetchContactsAgain={fetchContactsAgain}
									setFetchContactsAgain={setFetchContactsAgain}
									contact={contact}
								/>
							)}
						</div>
					</Fade>
				</Modal>
			</div>
		</div>
	);
};

export default ContactInfoModal;
