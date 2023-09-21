import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { Modal, Backdrop, Fade, Chip } from "@mui/material";
import SkillsList from "../miscellaneous/SkillsList";
import NotificationAlert from "../miscellaneous/NotificationAlert";
import { updateProfileIntro } from "../../features/Profile/ProfileIntro/ProfileIntroSlice";

const UpdateSkills = ({ children, intro }) => {
	const dispatch = useDispatch();
	// state to store the skills quideline list
	const [skillLists, setSkillLists] = useState(SkillsList());
	// state to store the skills from the DB
	const [mySkills, setMySkills] = useState(null);
	// state to store the inputted skill name
	const [skillName, setSkillName] = useState("");
	// state to store the filtered skills acoording to what the user types
	const [filteredSkills, setFilteredSkills] = useState(null);
	// state for the modal visibility
	const [open, setOpen] = useState(false);
	// function to open the modal
	const handleOpen = () => setOpen(true);
	// function to close the modal
	const handleClose = () => setOpen(false);
	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	const handleChangeName = (e) => {
		const value = e.target.value;
		setSkillName(value);
		// get the skills inline with what the user inputs
		const filtered = skillLists.filter((skill) =>
			skill.toLowerCase().includes(value.toLowerCase())
		);
		setFilteredSkills(filtered);
	};

	// function to choose a skill
	const handleSkillOption = (option) => {
		setSkillName(option);

		setFilteredSkills(null);
	};

	// function to add the skill to the list of skills to the DB
	const handleAddSkillTitle = (event) => {
		// check if the skill inputted is part of the skill lists in th eguideline
		const isCorrect = skillLists.some(
			(skill) => skill.toLowerCase() === skillName.toLowerCase()
		);

		// check if the skill is not alread been choosen by the user
		const skillExist = mySkills.some(
			(skill) => skill.toLowerCase() === skillName.toLowerCase()
		);

		if (event.key === "Enter") {
			if (!skillExist && isCorrect) {
				// add the skills to the list of current skills of the user
				setMySkills([...mySkills, skillName]);
				setSkillName("");
			}
		}
	};

	// function to remove a skill from the list of the user's sills
	const handleDelete = (selectedSkill) => {
		const updatedSkills = mySkills.filter(
			(skill) => skill.toLowerCase() !== selectedSkill.toLowerCase()
		);
		setMySkills(updatedSkills);
	};

	// function to udate the skills profile in the DB
	const updateSkillProfile = () => {
		const introUpdates = {
			skills: mySkills,
		};
		dispatch(updateProfileIntro(introUpdates));
	};

	// side effect for the skills
	useEffect(() => {
		if (intro) {
			const { skills } = intro;
			setMySkills(skills);
		}
	}, [intro]);
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
						<div className="absolute top-[10%] left-[25%] rounded-md shadow-md h-[400px] w-2/4 bg-white p-4 outline-0 overflow-y-auto xl:w-[300px] xl:left-[20%]">
							<h3 className="mb-8 font-poppins font-semibold text-xl">
								Edit Skills
							</h3>
							<div>
								<div className="flex items-center flex-wrap">
									{mySkills?.map((skill, index) => (
										<div key={index} className="mr-2 mt-2">
											<Chip
												sx={{ backgroundColor: "#3E3B6F", color: "#F6E8DF" }}
												label={skill}
												onDelete={() => handleDelete(skill)}
												deleteIcon={
													<span style={{ color: "#F6E8DF" }}>
														<MdCancel />
													</span>
												}
											/>
										</div>
									))}
								</div>
								<div className="">
									<input
										className="w-full px-2 py-1 rounded-md mt-4 border border-gray-300 focus:outline-none focus:border-2 focus:border-gray-500"
										placeholder="select skill"
										type="text"
										value={skillName}
										onKeyDown={handleAddSkillTitle}
										onChange={(e) => handleChangeName(e)}
									/>
									<div className="rounded-md max-h-[500px] overflow-auto mt-2 bg-white shadow-md">
										{skillName && (
											<ul className="">
												{filteredSkills?.map((skill, index) => (
													<li
														onClick={() => handleSkillOption(skill)}
														className="px-4 py-2 font-dosis hover:bg-light hover:cursor-pointer"
														key={index}
													>
														{skill}
													</li>
												))}
											</ul>
										)}
									</div>
								</div>
							</div>
							<div className="absolute bottom-0 right-4 mb-8 flex items-center justify-end">
								<div
									onClick={updateSkillProfile}
									className="flex items-center w-24 p-2 duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-pink hover:to-orange"
								>
									<GrDocumentUpdate />
									<p className="ml-2 font-dosis">Update</p>
								</div>
							</div>
							<NotificationAlert
								open={openAlert}
								message={alertMessage}
								severity={alertSeverity}
								onClose={() => setOpenAlert(false)}
							/>
						</div>
					</Fade>
				</Modal>
			</div>
		</div>
	);
};

export default UpdateSkills;
