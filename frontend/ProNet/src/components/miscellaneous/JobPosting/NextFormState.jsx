import { useState } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import Select from "react-select";

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
	const [selectedEmploymentOption, setSelectedEmploymentOption] =
		useState(null);
	const [selectedJobOption, setSelectedJobOption] = useState(null);
	return (
		<div className="p-4">
			<BsArrowLeftCircleFill
				onClick={() => setStep(1)}
				className="mb-4 text-3xl text-orange hover:cursor-pointer hover:text-pink"
			/>
			<h6 className="text-lg font-semibold">Other job info</h6>
			<form className="mt-8">
				<div className="mt-8">
					<h6 className="text-md text-gray-500 mb-2">Job-type*</h6>
					<Select
						defaultValue={selectedJobOption}
						onChange={setSelectedJobOption}
						options={jobTypeOptions}
						styles={customStyles}
					/>
				</div>
				<div className="mt-8">
					<h6 className="text-md text-gray-500 mb-2">Employment-type*</h6>
					<Select
						defaultValue={selectedEmploymentOption}
						onChange={setSelectedEmploymentOption}
						options={employmentTypeOptions}
						styles={customStyles}
					/>
				</div>
				<div className="mt-8">
					<label className="text-md text-gray-500">Salary*</label>
					<input
						type="number"
						placeholder="salary (this will be in multiple of 1000 i.e 100 for 100K per annum)"
						className="w-full border-2 text-sm mt-2 h-10 rounded-md px-2 hover:shadow-sm"
					/>
				</div>

				<div className="mt-16">
					<button
						//onClick={(e) => handleSubmit(e)}
						className="py-2 px-4 font-dosis w-full text-center text-lg font-bold duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:bg-gradient-to-r hover:from-pink hover:to-orange"
					>
						Continue
					</button>
				</div>
			</form>
		</div>
	);
};

export default NextFormState;
