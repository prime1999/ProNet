import React, { useState } from "react";
import Select from "react-select";
import Chip from "@mui/material/Chip";
import CitiesAndCountries from "../CitiesAndCountries";
import Jobs from "../Jobs";
import NotificationAlert from "../NotificationAlert";

const PrevFormState = ({ setStep, jobPostingData, setJobPostingData }) => {
	const [locations, setLocations] = useState(CitiesAndCountries());
	const [filterLocations, setFilteredLocations] = useState(null);
	const [jobTitles, setJobTitles] = useState(Jobs());
	const [filterJobs, setFilteredJobs] = useState(null);

	const locationOptions = locations.map((location) => ({
		value: location,
		label: location,
	}));
	const JobTitleOptions = jobTitles.map((title) => ({
		value: title,
		label: title,
	}));
	const [locationValue, setLocationValue] = useState(null);
	const [titleValue, setTitleValue] = useState(null);

	const [requirementValue, setRequirementValue] = useState("");

	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	const { title, company, location, description, requirements } =
		jobPostingData;

	// // function to select the company's location
	// const handleSelectLocation = (e) => {
	// 	const value = e.target.value;

	// 	setJobPostingData((prevState) => ({
	// 		...prevState,
	// 		location: value,
	// 	}));
	// 	// filter out the location that fit with the one inputted
	// 	const filtered = locations.filter((location) =>
	// 		location.toLowerCase().includes(value.toLowerCase())
	// 	);
	// 	// set filtered list to te locations list
	// 	setFilteredLocations(filtered);
	// };

	// // function to handle the location option taken
	// const handleLocationOption = (location) => {
	// 	// set the input value to the selected location
	// 	setJobPostingData((prevState) => ({
	// 		...prevState,
	// 		location: location,
	// 	}));
	// 	// clear out the filteredLocations list list
	// 	setFilteredLocations(null);
	// };

	// // function to get the job titles list
	// const handleSelectJob = (e) => {
	// 	const value = e.target.value;

	// 	setJobPostingData((prevState) => ({
	// 		...prevState,
	// 		title: value,
	// 	}));
	// 	// filter out the job title that fit with the one inputted
	// 	const filtered = jobTitles.filter((jobTitle) =>
	// 		jobTitle.toLowerCase().includes(value.toLowerCase())
	// 	);
	// 	// set filtered list to te jobs title list
	// 	setFilteredJobs(filtered);
	// };

	// // function to handle the job title option taken
	// const handleJobOption = (title) => {
	// 	// set the input value to the selected job title
	// 	setJobPostingData((prevState) => ({
	// 		...prevState,
	// 		title: title,
	// 	}));
	// 	// clear out the filteredjobs list
	// 	setFilteredJobs(null);
	// };

	const handleSelect = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			const checkValue = requirements.includes(requirementValue);
			if (!checkValue) {
				setJobPostingData((prevState) => ({
					...prevState,
					requirements: [...requirements, requirementValue],
				}));
				setRequirementValue("");
			} else {
				// perform an error handler
				console.log("exists");
			}
		}
	};

	const handleDelete = (value) => {
		setJobPostingData((prevState) => ({
			...prevState,
			requirements: requirements.filter((requirement) => requirement !== value),
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (description === "") {
			// perform an error handler
			handleShowSnackbar("error", "fill in job description");
		}
		if (company === "") {
			// perform an error handler
			handleShowSnackbar("error", "fill in the company's name");
		}
		if (requirements == []) {
			// perform an error handler
			handleShowSnackbar(
				"error",
				"please give job requirements for quick response"
			);
		}
		if (description !== "" && company !== "" && requirements) {
			setJobPostingData((prevState) => ({
				...prevState,
				title: titleValue.value,
				location: locationValue.value,
			}));
			setStep(2);
		}
	};

	// function to show snack-bar alert
	const handleShowSnackbar = (severity, message) => {
		setOpenAlert(true);
		setAlertSeverity(severity);
		setAlertMessage(message);
	};

	return (
		<div className="px-4">
			<h6 className="text-2xl font-semibold">Post a job for free</h6>
			<form onSubmit={handleSubmit} className="mt-2">
				{/* <div className="relative z-50">
					<label className="text-md text-gray-500">Job Title*</label>
					<input
						type="text"
						value={title}
						onChange={handleSelectJob}
						id="title"
						className="w-full border-2 mt-2 h-8 rounded-md px-2 hover:shadow-sm"
					/>
					{filterJobs && title && (
						<>
							<ul className="absolute h-48 bg-white mt-2 shadow-md rounded-md border overflow-auto">
								{filterJobs.map((job) => (
									<>
										<li
											key={job}
											onClick={() => handleJobOption(job)}
											className="text-sm p-2 hover:cursor-pointer hover:bg-gray-200"
										>
											{job}
										</li>
									</>
								))}
							</ul>
						</>
					)}
				</div> */}
				<div className="">
					<h6 className="text-md text-gray-500 mb-2">Job Title*</h6>
					<Select
						defaultValue={titleValue}
						onChange={setTitleValue}
						options={JobTitleOptions}
						//styles={customStyles}
					/>
				</div>
				<div className="mt-2 flex items-center">
					<div>
						<label className="text-md text-gray-500">Company*</label>
						<input
							type="text"
							value={company}
							onChange={(e) =>
								setJobPostingData((prevState) => ({
									...prevState,
									company: e.target.value,
								}))
							}
							id="company"
							className="w-full border-2 mt-2 h-8 rounded-md px-2 hover:shadow-sm"
						/>
					</div>
					{/* <div className="relative ml-2">
						<label className="text-md text-gray-500">Location*</label>
						<input
							type="text"
							value={location}
							onChange={handleSelectLocation}
							id="location"
							className="w-full border-2 mt-2 h-8 rounded-md px-2 hover:shadow-sm"
						/>
						{filterLocations && location && (
							<>
								<ul className="absolute h-48 bg-white mt-2 shadow-md rounded-md border overflow-auto">
									{filterLocations.map((location) => (
										<>
											<li
												key={location}
												onClick={() => handleLocationOption(location)}
												className="text-sm p-2 hover:cursor-pointer hover:bg-gray-200"
											>
												{location}
											</li>
										</>
									))}
								</ul>
							</>
						)}
					</div> */}
					<div className="w-1/3 ml-2">
						<h6 className="text-md text-gray-500 mb-2">Location*</h6>
						<Select
							defaultValue={locationValue}
							onChange={setLocationValue}
							options={locationOptions}
							//styles={customStyles}
						/>
					</div>
				</div>
				<div className="flex flex-col mt-2">
					<label className="text-md text-gray-500 mb-2">Job description*</label>
					<textarea
						value={description}
						onChange={(e) =>
							setJobPostingData((prevState) => ({
								...prevState,
								description: e.target.value,
							}))
						}
						id={description}
						className="p-2 h-24 border-2 rounded-md"
					></textarea>
				</div>
				<div className="mt-2">
					<label className="text-md text-gray-500">Requirement*</label>
					<input
						type="text"
						value={requirementValue}
						onChange={(e) => setRequirementValue(e.target.value)}
						onKeyDown={handleSelect}
						placeholder="give the neccesary certificate or experience for the job"
						id="title"
						className="w-full text-sm border-2 mt-2 h-8 rounded-md px-2 hover:shadow-sm"
					/>
					{requirements && (
						<div className="flex flex-wrap h-24 p-2 overflow-auto">
							{requirements?.map((requirement, index) => (
								<Chip
									key={index}
									label={requirement}
									variant="outlined"
									sx={{ marginTop: "10px", marginRight: "10px" }}
									onDelete={() => handleDelete(requirement)}
								/>
							))}
						</div>
					)}
				</div>
				<div>
					<button
						onClick={(e) => handleSubmit(e)}
						className="py-2 px-4 font-dosis w-full text-center text-lg font-bold duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:bg-gradient-to-r hover:from-pink hover:to-orange"
					>
						Continue
					</button>
				</div>
				<NotificationAlert
					open={openAlert}
					message={alertMessage}
					severity={alertSeverity}
					onClose={() => setOpenAlert(false)}
				/>
			</form>
		</div>
	);
};

export default PrevFormState;
