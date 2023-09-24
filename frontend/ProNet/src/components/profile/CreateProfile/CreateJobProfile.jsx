import { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { Chip } from "@mui/material";
import Jobs from "../../miscellaneous/Jobs";
import NotificationAlert from "../../miscellaneous/NotificationAlert";
import CitiesAndCountries from "../../miscellaneous/CitiesAndCountries";

const CreateJobProfile = ({ values }) => {
	const { jobProfileState, setJobProfileState, nextStep, prevStep } = values;

	// state fot the input values
	const [jobState, setJobState] = useState({
		titles: "",
		types: "",
		location: "",
	});
	// state for the job title
	const [jobs, setJobs] = useState(Jobs());
	const [filteredJobs, setFilteredJobs] = useState(null);

	// state for the job title
	const [locations, setLocations] = useState(CitiesAndCountries());
	const [filteredLocations, setFilteredLocations] = useState(null);

	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	// destructure the job title
	const { titles, types, location } = jobState;

	// destructure the job dertails array from the job profie state
	const { jobTitles, jobTypes, jobLocations } = jobProfileState;

	const handleDelete = async (jobName, job) => {
		setJobProfileState((prevState) => {
			// Create a copy of the property array and remove the specified item
			const updatedArray = prevState[jobName].filter((item) => item !== job);

			// Create a copy of the details object with the updated property
			const updatedDetails = {
				...prevState,
				[jobName]: updatedArray,
			};

			return updatedDetails; // Return the updated state
		});
	};

	// ---------------------------------------- functions for the job title starts here ------------------------ //
	// function to select the  job title
	const handleChangeTitle = (e) => {
		const value = e.target.value;
		setJobState((prevState) => ({
			...prevState,
			titles: value,
		}));
		// filter out the job titles that fit with the one inputted
		const filtered = jobs.filter((job) =>
			job.toLowerCase().includes(value.toLowerCase())
		);
		// set the fiteredJob variable to the filtered jobs
		setFilteredJobs(filtered);
	};

	// function to run when a job title has been selected from the filtered list
	const handleJobOption = (option) => {
		// set the input value to the selected job title
		setJobState((prevState) => ({
			...prevState,
			titles: option,
		}));
		// clear out the filteredJob list
		setFilteredJobs(null);
	};

	// function to add the title selected to the array
	const handleAddJobTitle = (event) => {
		// check if the job title is part of the guideline given
		const isCorrect = jobs.some(
			(job) => job.toLowerCase() === titles.toLowerCase()
		);
		// check if the job doesn't already exist in the job title
		const jobExist = jobTitles.some((job) => job === titles);
		// if the enter key is clicked and the filtered job list is currently filled
		if (event.key === "Enter") {
			event.preventDefault();
			if (titles && isCorrect && !jobExist) {
				// add the selected location to the details
				setJobProfileState((prevState) => ({
					...prevState,
					jobTitles: [...jobTitles, titles],
				}));
				setJobState((prevState) => ({
					...prevState,
					titles: "",
				}));
			} else {
				// show a success alert message
				handleShowSnackbar("error", "Please select from the drop down list");
			}
		}
	};
	// ---------------------------------------- functions for the job title ends here ------------------------ //
	// ---------------------------------------- functions for the job location starts here ------------------------ //
	// function to select the  job location
	const handleChangeLocation = (e) => {
		const value = e.target.value;
		setJobState((prevState) => ({
			...prevState,
			location: value,
		}));
		// filter out the job locations that fit with the one inputted
		const filtered = locations.filter((location) =>
			location.toLowerCase().includes(value.toLowerCase())
		);
		// set the fiteredLocations variable to the filtered jobs
		setFilteredLocations(filtered);
	};

	// function to run when a job location has been selected from the filtered list
	const handleLocationOption = (option) => {
		// set the input value to the selected job title
		setJobState((prevState) => ({
			...prevState,
			location: option,
		}));
		// clear out the filteredJob list
		setFilteredLocations(null);
	};

	// function to add the location selected to the array
	const handleAddJobLocation = (event) => {
		// check if the job location is part of the guideline given
		const isCorrect = locations.some(
			(joblocation) => joblocation.toLowerCase() === location.toLowerCase()
		);
		// check if the job doesn't already exist in the job location
		const locationExist = jobLocations.some(
			(jobLocation) => jobLocation === titles
		);
		// if the enter key is clicked and the filtered job list is currently filled
		if (event.key === "Enter") {
			event.preventDefault();
			if (location && isCorrect && !locationExist) {
				// add the selected location to the details
				setJobProfileState((prevState) => ({
					...prevState,
					jobLocations: [...jobLocations, location],
				}));
				setJobState((prevState) => ({
					...prevState,
					location: "",
				}));
			} else {
				// show a success alert message
				handleShowSnackbar("error", "Please select from the drop down list");
			}
		}
	};
	// ---------------------------------------- functions for the job location ends here ------------------------ //
	// ---------------------------------------- functions for the job type starts here ------------------------ //
	// function to select the  job type
	const handleChangeType = (e) => {
		const value = e.target.value;
		setJobState((prevState) => ({
			...prevState,
			types: value,
		}));
	};

	// // function to add the type selected to the array
	const handleAddJobTypes = (event) => {
		// // define a guideline for the job type
		const jobTypesEXp = ["on-site", "hybrid", "remote"];
		// check if the  job type is part of the guideline given
		const isCorrect = jobTypesEXp.some((job) => job.toLowerCase() === types);
		// check if the job doesn't already exist in the job types
		const jobExist = jobTypes.some((job) => job === types);
		if (event.key === "Enter") {
			if (types && isCorrect && !jobExist) {
				setJobProfileState((prevState) => ({
					...prevState,
					jobTypes: [...jobTypes, types],
				}));
				setJobState((prevState) => ({
					...prevState,
					types: "",
				}));
			} else {
				// show a success alert message
				handleShowSnackbar(
					"error",
					"select from (on-site, hybrid and remote) jobs"
				);
			}
		}
	};

	// ---------------------------------------- functions for the job type ends here ------------------------ //

	// function to show snack-bar alert
	const handleShowSnackbar = (severity, message) => {
		setOpenAlert(true);
		setAlertSeverity(severity);
		setAlertMessage(message);
	};
	return (
		<div className="">
			<div>
				<h6 className="text-lg font-semibold">
					Welcome to <span className="font-black text-2xl">ProNet</span>
				</h6>
				<h6 className="font-normal font-cour">Add an Education history</h6>
			</div>
			<form className="mt-2">
				{/* ----------------- job titles UI starts here ----------------------- */}
				<div className="">
					<label className="text-md ml-2 mb-2 text-gray-400">Job-titles</label>
					<div className="flex items-center flex-wrap my-4">
						{jobTitles?.map((title, index) => (
							<div key={index} className="mr-2 mt-2">
								<Chip
									sx={{ backgroundColor: "#3E3B6F", color: "#F6E8DF" }}
									label={title}
									onDelete={() => handleDelete("jobTitles", title)}
									deleteIcon={
										<span style={{ color: "#F6E8DF" }}>
											<MdCancel />
										</span>
									}
								/>
							</div>
						))}
					</div>
					<input
						className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
						placeholder="Add Job-titles"
						type="text"
						value={titles}
						onKeyDown={handleAddJobTitle}
						onChange={(e) => handleChangeTitle(e)}
					/>
					<div className="rounded-md mt-2 max-h-[140px] bg-transparent border shadow-md overflow-auto">
						{titles && (
							<ul className="">
								{filteredJobs?.map((job, index) => (
									<li
										onClick={() => handleJobOption(job)}
										className="px-4 py-2 font-dosis hover:bg-light hover:cursor-pointer"
										key={index}
									>
										{job}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
				{/* -----------------job titles UI ends here----------------------- */}
				{/* -----------------job location UI starts here----------------------- */}
				<div className="mt-4">
					<label className="text-md ml-2 mtt-2 text-gray-400">
						Job-Locations
					</label>
					<div className="flex items-center flex-wrap my-2">
						{jobLocations?.map((location, index) => (
							<div key={index} className="mr-2 mt-2">
								<Chip
									sx={{ backgroundColor: "#3E3B6F", color: "#F6E8DF" }}
									label={location}
									onDelete={() => handleDelete("jobLocations", location)}
									deleteIcon={
										<span style={{ color: "#F6E8DF" }}>
											<MdCancel />
										</span>
									}
								/>
							</div>
						))}
					</div>
					<input
						className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
						placeholder="Choose locations"
						type="text"
						value={location}
						onKeyDown={handleAddJobLocation}
						onChange={(e) => handleChangeLocation(e)}
					/>
					<div className="rounded-md mt-2 max-h-[140px] bg-transparent border shadow-md overflow-auto">
						{location && (
							<ul className="">
								{filteredLocations?.map((location, index) => (
									<li
										onClick={() => handleLocationOption(location)}
										className="px-4 py-2 font-dosis hover:bg-light hover:cursor-pointer"
										key={index}
									>
										{location}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
				{/* -----------------job location UI ends here----------------------- */}
				{/* -----------------job type UI starts here----------------------- */}
				<div className="mt-4">
					<label className="text-md ml-2 mtt-2 text-gray-400">Job-Types</label>
					<div className="flex items-center flex-wrap my-2">
						{jobTypes?.map((type, index) => (
							<div key={index} className="mr-2 mt-2">
								<Chip
									sx={{ backgroundColor: "#3E3B6F", color: "#F6E8DF" }}
									label={type}
									onDelete={() => handleDelete("jobTypes", type)}
									deleteIcon={
										<span style={{ color: "#F6E8DF" }}>
											<MdCancel />
										</span>
									}
								/>
							</div>
						))}
					</div>
					<input
						className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
						placeholder="On-Site, Remote or Hybrid"
						type="text"
						value={types}
						onKeyDown={handleAddJobTypes}
						onChange={(e) => handleChangeType(e)}
					/>
				</div>
				{/* -----------------job type UI ends here----------------------- */}
			</form>
			<div className="flex items-end justify-between mt-4">
				<button
					onClick={prevStep}
					className="flex items-center w-20 p-2 duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-pink hover:to-orange"
				>
					<p className="mr-2 font-dosis">Prev</p>
					<MdNavigateNext />
				</button>
				<button
					onClick={nextStep}
					className="flex items-center w-20 p-2 duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-pink hover:to-orange"
				>
					<p className="mr-2 font-dosis">Next</p>
					<MdNavigateNext />
				</button>
			</div>
			<NotificationAlert
				open={openAlert}
				message={alertMessage}
				severity={alertSeverity}
				onClose={() => setOpenAlert(false)}
			/>
		</div>
	);
};

export default CreateJobProfile;
