import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { Chip } from "@mui/material";
import SkillsList from "../../miscellaneous/SkillsList";
import { addJobProfile } from "../../../features/Profile/JobProfile/JobProfileSlice";
import {
	reset,
	updateProfileIntro,
} from "../../../features/Profile/ProfileIntro/ProfileIntroSlice";

const CreateSkillProfile = ({ values }) => {
	const dispatch = useDispatch();
	// state for the skills
	const [mySkills, setMySkills] = useState(SkillsList());
	const [filteredSkills, setFilteredSkills] = useState(null);
	const [skill, setSkill] = useState("");
	const { skillProfileState, setSkillProfileState, nextStep, prevStep } =
		values;
	const { skills } = skillProfileState;

	const handleChangeName = (e) => {
		const value = e.target.value;
		setSkill(value);
		// get the skills inline with what the user inputs
		const filtered = mySkills.filter((skill) =>
			skill.toLowerCase().includes(value.toLowerCase())
		);
		setFilteredSkills(filtered);
	};

	// function to choose a skill
	const handleSkillOption = (option) => {
		setSkill(option);

		setFilteredSkills(null);
	};

	// function to add the skill to the list of skills to the DB
	const handleAddSkillTitle = (event) => {
		// check if the skill inputted is part of the skill lists in the guideline
		const isCorrect = mySkills.some(
			(skill) => skill.toLowerCase() === skill.toLowerCase()
		);

		// check if the skill is not already been choosen by the user
		const skillExist = skills.some(
			(s) => s.toLowerCase() == skill.toLowerCase()
		);

		if (event.key === "Enter") {
			if (!skillExist && isCorrect) {
				// add the skills to the list of current skills of the user
				setSkillProfileState((prevState) => ({
					...prevState,
					skills: [...skills, skill],
				}));
				setSkill("");
			} else {
				console.log({
					mySkills,
					skills,
					isCorrect,
					skillExist,
				});
			}
		}
	};

	// function to remove a skill from the list of the user's skills
	const handleDelete = (selectedSkill) => {
		const updatedSkills = skills.filter(
			(skill) => skill.toLowerCase() !== selectedSkill.toLowerCase()
		);
		setSkillProfileState((prevState) => ({
			...prevState,
			skills: updatedSkills,
		}));
	};

	const handleCreateProfile = () => {
		const introUpdates = {
			skills: skillProfileState.skills,
		};
		dispatch(updateProfileIntro(introUpdates));
		dispatch(reset());
		nextStep();
	};

	return (
		<div className="mt-8">
			<div>
				<div className="flex items-center flex-wrap">
					{skills?.map((skill, index) => (
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
				<div className="mt-8">
					<input
						className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
						placeholder="select skill"
						type="text"
						value={skill}
						onKeyDown={handleAddSkillTitle}
						onChange={(e) => handleChangeName(e)}
					/>
					<div className="rounded-md mt-2 max-h-[250px] bg-transparent border shadow-md overflow-auto">
						{skill && (
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
			<div className="flex items-end justify-between mt-4">
				<button
					onClick={prevStep}
					className="flex items-center w-20 p-2 duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-pink hover:to-orange"
				>
					<p className="mr-2 font-dosis">Prev</p>
					<MdNavigateNext />
				</button>
				<button
					onClick={handleCreateProfile}
					className="flex items-center w-42 p-2 duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-pink hover:to-orange"
				>
					<p className="mr-2 font-dosis">Save and Continue</p>
					<MdNavigateNext />
				</button>
			</div>
		</div>
	);
};

export default CreateSkillProfile;
