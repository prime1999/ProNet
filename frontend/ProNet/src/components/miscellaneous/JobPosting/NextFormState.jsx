import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { Chip } from "@mui/material";
import Select from "react-select";
import SkillsList from "../SkillsList";
import { createJobPosting } from "../../../features/jobs/JobSlice";
import NotificationAlert from "../NotificationAlert";

const customStyles = {
	control: (provided, state) => ({
		...provided,
		borderColor: state.isFocused ? "#007bff" : "#ccc",
		boxShadow: state.isFocused ? "0 0 5px rgba(0, 123, 255, 0.5)" : "none",
		height: "10px !important",
		":hover": {
			boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)", // Change border color on hover
		},
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected ? "#007bff" : "white",
		color: state.isSelected ? "white" : "#252243",
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected ? "#3E3B6F" : "white",
		color: state.isSelected ? "white" : "#252243",
		":hover": {
			backgroundColor: "#F6E8DF", // Change background color on hover
			color: "#252243",
			cursor: "pointer", // Change cursor to pointer on hover
		},
	}),
};

const employmentTypeOptions = [
	{ value: "Full-time", label: "Full-time" },
	{ value: "Part-time", label: "Part-time" },
	{ value: "Contract", label: "Contract" },
	{ value: "Temporary", label: "Temporary" },
	{ value: "Other", label: "Other" },
	{ value: "Volunteer", label: "Volunteer" },
	{ value: "Internship", label: "Internship" },
];

const jobTypeOptions = [
	{ value: "on-site", label: "on-site" },
	{ value: "hybrid", label: "hybrid" },
	{ value: "remote", label: "remote" },
];

const NextFormState = ({ jobPostingData, setJobPostingData, setStep }) => {
	const dispatch = useDispatch();
	const [selectedEmploymentOption, setSelectedEmploymentOption] =
		useState(null);
	const [selectedJobOption, setSelectedJobOption] = useState(null);
	const [selectedSkillOption, setSelectedSkillOption] = useState(null);

	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	let { skills, jobType, employmentType, salary } = jobPostingData;

	const handleSkills = (value) => {
		setSelectedSkillOption(value);
		console.log(value);

		// check if the skill has already been specified before
		const checkValue = skills.includes(value);
		// if it has not been then:
		if (!checkValue) {
			// add the skill to the skill array in the job posting data
			setJobPostingData((prevState) => ({
				...prevState,
				skills: [...skills, value],
			}));

			// but if it has been
		} else {
			// perform an error handler
			console.log("exists");
		}
	};

	// function to edit the job requirements lists
	const handleDelete = (value) => {
		// update the the job data state to remove the desired requirement
		setJobPostingData((prevState) => ({
			...prevState,
			skills: skills.filter((skill) => skill !== value),
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			salary === "" ||
			jobType == [] ||
			employmentType == [] ||
			skills == []
		) {
			// show error message
			handleShowSnackbar("error", "Please fill in all fields");
		} else {
			dispatch(createJobPosting(jobPostingData));
			handleShowSnackbar("success", "job posting has uploaded");
			salary = "";
			jobType == [];
			employmentType == [];
			skills == [];
			(jobPostingData.company = ""),
				(jobPostingData.description = ""),
				(jobPostingData.requirements = []);
		}
	};

	// function to show snack-bar alert
	const handleShowSnackbar = (severity, message) => {
		setOpenAlert(true);
		setAlertSeverity(severity);
		setAlertMessage(message);
	};
	return (
		<div className="p-4">
			<BsArrowLeftCircleFill
				onClick={() => setStep(1)}
				className="mb-4 text-3xl text-orange hover:cursor-pointer hover:text-pink"
			/>
			<h6 className="text-lg font-semibold">Other job info</h6>
			<form className="mt-2">
				<div className="mt-8">
					<h6 className="text-md text-gray-500 mb-2">Job-type*</h6>
					<Select
						defaultValue={selectedJobOption}
						onChange={(e) => {
							setSelectedJobOption;
							setJobPostingData((prevState) => ({
								...prevState,
								jobType: [...jobType, e.value],
							}));
						}}
						options={jobTypeOptions}
						styles={customStyles}
					/>
				</div>
				<div className="mt-2">
					<h6 className="text-md text-gray-500 mb-2">Employment-type*</h6>
					<Select
						defaultValue={selectedEmploymentOption}
						onChange={(e) => {
							setSelectedEmploymentOption;
							setJobPostingData((prevState) => ({
								...prevState,
								employmentType: [...employmentType, e.value],
							}));
						}}
						options={employmentTypeOptions}
						styles={customStyles}
					/>
				</div>
				<div className="mt-2">
					<h6 className="text-md text-gray-500 mb-2">Skills*</h6>
					<Select
						defaultValue={selectedSkillOption}
						onChange={(e) => handleSkills(e.value)}
						options={SkillsList().map((skill) => ({
							value: skill,
							label: skill,
						}))}
						styles={customStyles}
					/>
					{skills != [] && (
						<div className="flex flex-wrap p-2 overflow-auto">
							{skills?.map((skill, index) => (
								<Chip
									key={index}
									label={skill}
									variant="outlined"
									sx={{ marginTop: "10px", marginRight: "10px" }}
									onDelete={() => handleDelete(skill)}
								/>
							))}
						</div>
					)}
				</div>
				<div className="mt-2">
					<label className="text-md text-gray-500">Salary*</label>
					<input
						type="number"
						value={salary}
						onChange={(e) =>
							setJobPostingData((prevState) => ({
								...prevState,
								salary: e.target.value,
							}))
						}
						placeholder="salary (this will be in multiple of 1000 i.e 100 for 100K per annum)"
						className="w-full border-2 text-sm mt-2 h-10 rounded-md px-2 hover:shadow-sm"
					/>
				</div>

				<div className="mt-8">
					<button
						onClick={(e) => handleSubmit(e)}
						className="py-2 px-4 font-dosis w-full text-center text-lg font-bold duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:bg-gradient-to-r hover:from-pink hover:to-orange"
					>
						Continue
					</button>
				</div>
			</form>
			<NotificationAlert
				open={openAlert}
				message={alertMessage}
				severity={alertSeverity}
				onClose={() => setOpenAlert(false)}
			/>
		</div>
	);
};

export default NextFormState;
