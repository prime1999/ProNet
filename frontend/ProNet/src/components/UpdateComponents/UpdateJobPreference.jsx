import { useState } from "react";
import { useDispatch } from "react-redux";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { Chip } from "@mui/material";
import Jobs from "../miscellaneous/Jobs";
import CitiesAndCountries from "../miscellaneous/CitiesAndCountries";
import {
	reset,
	updateJobProfile,
} from "../../features/Profile/JobProfile/JobProfileSlice";
import NotificationAlert from "../miscellaneous/NotificationAlert";

const UpdateJobPreference = ({
	jobDetails,
	fetchJobProfileAgain,
	setFetchJobProfileAgain,
	editMode,
	setEditMode,
}) => {
	// for the snackbar alert
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");
	// init the distatch hook
	const dispatch = useDispatch();
	// state for the user's job profile details
	const [details, setDetails] = useState({
		employmentTypes: jobDetails.employmentTypes,
		jobLocations: jobDetails.jobLocations,
		jobTitles: jobDetails.jobTitles,
		jobTypes: jobDetails.jobTypes,
	});
	// for the job selection
	const [jobs, setJobs] = useState(Jobs());
	const [filterJobs, setFilteredJobs] = useState(null);
	const [jobName, setJobName] = useState("");
	// for the location selection
	const [locations, setLocations] = useState(CitiesAndCountries());
	const [filterLocations, setFilteredLocations] = useState(null);
	const [locationName, setLocationName] = useState("");
	// state for the job type
	const [jobType, setJobType] = useState("");
	// state for the emloyment type
	const [employmentType, setEmploymentType] = useState("");

	const { employmentTypes, jobLocations, jobTitles, jobTypes } = details;

	const handleDelete = async (profile, job) => {
		setDetails((prevState) => {
			// Create a copy of the property array and remove the specified item
			const updatedArray = prevState[profile].filter((item) => item !== job);

			// Create a copy of the details object with the updated property
			const updatedDetails = {
				...prevState,
				[profile]: updatedArray,
			};

			return updatedDetails; // Return the updated state
		});
	};
	// function to select the  job title
	const handleChangeName = (e) => {
		const value = e.target.value;
		setJobName(value);
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
		setJobName(option);
		// clear out the filteredJob list
		setFilteredJobs(null);
	};
	// function to save the selected job title to the list of jobs on the UI
	const handleAddJobTitle = (event) => {
		// check if the job title is part of the guideline given
		const isCorrect = jobs.some(
			(job) => job.toLowerCase() === jobName.toLowerCase()
		);
		// check if the job doesn't already exist in the job title
		const jobExist = jobTitles.some((job) => job === jobName);
		// if the enter key is clicked and the filtered job list is currently filled
		if (event.key === "Enter") {
			if (!jobExist && isCorrect) {
				// add the selected job to the details
				setDetails((prevState) => ({
					...prevState,
					jobTitles: [...jobTitles, jobName],
				}));
				setJobName("");
			} else {
				// show a success alert message
				handleShowSnackbar("error", "Please select from the drop down list");
			}
		}
	};
	// function to select a location where the user is available to work
	const handleSelectLocation = (e) => {
		const value = e.target.value;
		setLocationName(value);
		// filter out the location that fit with the one inputted
		const filtered = locations.filter((location) =>
			location.toLowerCase().includes(value.toLowerCase())
		);
		// set filtered list to te locations list
		setFilteredLocations(filtered);
	};
	// function to handle the location option taken
	const handleLocationOption = (location) => {
		// set the input value to the selected location
		setLocationName(location);
		// clear out the filteredLocations list list
		setFilteredLocations(null);
	};
	// function to add the location selected to the details array
	const handleAddLocation = (event) => {
		const filtered = locations.filter((location) =>
			location.toLowerCase().includes(locationName.toLowerCase())
		);
		// check if the  job title is part of the guideline given
		const isCorrect = locations.some(
			(location) => location.toLowerCase() === locationName.toLowerCase()
		);
		// check if the location doesn't already exist in the job location
		const locationExist = jobLocations.some(
			(location) => location === locationName
		);
		// if the enter key is clicked and the filtered job list is currently filled
		if (event.key === "Enter") {
			if (isCorrect && !locationExist) {
				// add the selected location to the details
				setDetails((prevState) => ({
					...prevState,
					jobLocations: [...jobLocations, locationName],
				}));
				setLocationName("");
			} else {
				// show a success alert message
				handleShowSnackbar("error", "Please select from the drop down list");
			}
		}
	};
	// function to get the value written in the job type input
	const handlechangeJobType = (e) => {
		const value = e.target.value;
		setJobType(value);
	};
	// function to get the value written in the employment type input
	const handlechangeEmploymentType = (e) => {
		const value = e.target.value;
		setEmploymentType(value);
	};
	// function to add the job type chosen to the job types in the details
	const handleAddJobType = (event) => {
		// define a guideline for the job type
		const jobTypesEXp = ["on-site", "hybrid", "remote"];
		// check if the  job type is part of the guideline given
		const isCorrect = jobTypesEXp.some((job) => job.toLowerCase() === jobType);
		// check if the job doesn't already exist in the job types
		const jobExist = jobTypes.some((job) => job === jobType);
		if (event.key === "Enter") {
			if (isCorrect && !jobExist) {
				setDetails((prevState) => ({
					...prevState,
					jobTypes: [...jobTypes, jobType],
				}));
				setJobType("");
			} else {
				// show a success alert message
				handleShowSnackbar(
					"error",
					"select from (on-site, hybrid and remote) jobs"
				);
			}
		}
	};
	// function to add the employment type chosen to the employment types in the details
	const handleAddEmploymentType = (event) => {
		// define a guideline for the empoyment type
		const empoymentTypesEXp = [
			"full-time",
			"part-time",
			"internship",
			"contract",
		];
		// check if the  empoyment type is part of the guideline given
		const isCorrect = empoymentTypesEXp.some(
			(empoyment) => empoyment.toLowerCase() === employmentType
		);
		// check if the employment doesn't already exist in the employment types
		const employmentExist = employmentTypes.some(
			(employment) => employment.toLowerCase() === employmentType
		);
		if (event.key === "Enter") {
			if (isCorrect && !employmentExist) {
				setDetails((prevState) => ({
					...prevState,
					employmentTypes: [...employmentTypes, employmentType],
				}));
				setEmploymentType("");
			} else {
				// show a success alert message
				handleShowSnackbar(
					"error",
					"select from (full-time, part-time, internship and contract) jobs"
				);
			}
		}
	};
	// function to show snack-bar alert
	const handleShowSnackbar = (severity, message) => {
		setOpenAlert(true);
		setAlertSeverity(severity);
		setAlertMessage(message);
	};
	// function to update the user function in the database
	const updateProfile = () => {
		// store the stringified form of the job details in the variable jobUpdates
		const jobUpdates = {
			employmentTypes: JSON.stringify(details.employmentTypes),
			jobTitles: JSON.stringify(details.jobTitles),
			jobLocations: JSON.stringify(jobLocations),
			jobTypes: JSON.stringify(jobTypes),
		};
		// dispatch the updateJobProfile function in the job profile slice passing the jobUpdates as an argument
		dispatch(updateJobProfile({ jobUpdates }));

		dispatch(reset());
		setFetchJobProfileAgain(!fetchJobProfileAgain);

		setEditMode(!editMode);
	};

	return (
		<div className="w-full">
			<div className="p-4 font-semibold text-lg text-gray-400">
				<h4>Edit Job Preference</h4>
			</div>
			<hr className="border-gray-300" />
			<div className="p-4 w-full">
				<p className="text-sm text-gray-400 mb-4">* Indicates required</p>
				<div>
					<h6 className="text-gray-600 font-poppins font-bold">Job Titles*</h6>
					<div>
						{/* ----------------------------------------- job titles ------------------------------------------------ */}
						<div className="flex items-center flex-wrap">
							{jobTitles?.map((profile, index) => (
								<div key={index} className="mr-2 mt-2">
									<Chip
										sx={{
											backgroundColor: "#3E3B6F",
											color: "#F6E8DF",
											marginTop: "10px",
										}}
										label={profile}
										onDelete={() => handleDelete("jobTitles", profile)}
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
								placeholder="Add Job-title"
								type="text"
								value={jobName}
								onKeyDown={handleAddJobTitle}
								onChange={(e) => handleChangeName(e)}
							/>
							<div className="rounded-md max-h-[500px] overflow-auto mt-2 bg-white shadow-md">
								{jobName && (
									<ul className="">
										{filterJobs?.map((job, index) => (
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
					</div>
				</div>
				<div>
					{/* ----------------------------------------- job types ------------------------------------------------ */}
					<div className="mt-8">
						<h6 className="mb-2 text-gray-600 font-poppins font-bold">
							Job Types*
						</h6>
						<div className="flex items-center flex-wrap">
							{jobTypes?.map((profile, index) => (
								<div key={index} className="mr-2 mt-2">
									<Chip
										sx={{ backgroundColor: "#3E3B6F", color: "#F6E8DF" }}
										label={profile}
										onDelete={() => handleDelete("jobTypes", profile)}
										deleteIcon={
											<span style={{ color: "#F6E8DF" }}>
												<MdCancel />
											</span>
										}
									/>
								</div>
							))}
						</div>
						<div>
							<input
								className="w-full px-2 py-1 rounded-md mt-4 border border-gray-300 focus:outline-none focus:border-2 focus:border-gray-500"
								placeholder="On-Site, Remote or Hybrid"
								type="text"
								value={jobType}
								onKeyDown={handleAddJobType}
								onChange={(e) => handlechangeJobType(e)}
							/>
						</div>
					</div>
				</div>
				{/* ----------------------------------------- job locations ------------------------------------------------ */}
				<div className="mt-8">
					<h6 className="mb-2 text-gray-600 font-poppins font-bold">
						Job Locations*
					</h6>
					<div className="flex items-center flex-wrap">
						{jobLocations?.map((profile, index) => (
							<div key={index} className="mr-2 mt-2">
								<Chip
									sx={{ backgroundColor: "#3E3B6F", color: "#F6E8DF" }}
									label={profile}
									onDelete={() => handleDelete("jobLocations", profile)}
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
							placeholder="Add Location"
							type="text"
							value={locationName}
							onKeyDown={handleAddLocation}
							onChange={(e) => handleSelectLocation(e)}
						/>
						<div className="rounded-md max-h-[500px] mt-2 bg-white shadow-md overflow-auto">
							{locationName && (
								<ul className="">
									{filterLocations?.map((location, index) => (
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
				</div>
				{/* ----------------------------------------- employment types ------------------------------------------------ */}
				<div className="mt-8 w-full">
					<h6 className="mb-2 text-gray-600 font-poppins font-bold">
						Employment Types*
					</h6>
					<div className="flex items-center flex-wrap">
						{employmentTypes?.map((profile, index) => (
							<div key={index} className="mr-2 mt-2">
								<Chip
									sx={{ backgroundColor: "#3E3B6F", color: "#F6E8DF" }}
									label={profile}
									onDelete={() => handleDelete("employmentTypes", profile)}
									deleteIcon={
										<span style={{ color: "#F6E8DF" }}>
											<MdCancel />
										</span>
									}
								/>
							</div>
						))}
					</div>
					<div>
						<input
							className="w-full px-2 py-1 rounded-md mt-4 text-xs border border-gray-300 focus:outline-none focus:border-2 focus:border-gray-500"
							placeholder="Full-Time, Part-Time, Internship, Contract"
							type="text"
							value={employmentType}
							onKeyDown={handleAddEmploymentType}
							onChange={(e) => handlechangeEmploymentType(e)}
						/>
					</div>
				</div>
			</div>
			<hr className="border-gray-300" />
			<div className="flex items-end justify-end m-4">
				<div
					onClick={updateProfile}
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
	);
};

export default UpdateJobPreference;
