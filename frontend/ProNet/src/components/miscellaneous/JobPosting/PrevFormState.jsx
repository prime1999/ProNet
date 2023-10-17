import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import CitiesAndCountries from "../CitiesAndCountries";

const PrevFormState = ({ setStep, jobPostingData, setJobPostingData }) => {
	const [locations, setLocations] = useState(CitiesAndCountries());
	const [filterLocations, setFilteredLocations] = useState(null);

	const [requirementValue, setRequirementValue] = useState("");

	const { title, company, location, description, requirements } =
		jobPostingData;

	// function to select the company's location
	const handleSelectLocation = (e) => {
		const value = e.target.value;

		setJobPostingData((prevState) => ({
			...prevState,
			location: value,
		}));
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
		setJobPostingData((prevState) => ({
			...prevState,
			location: location,
		}));
		// clear out the filteredLocations list list
		setFilteredLocations(null);
	};

	const handleSelect = (event) => {
		if (event.key === "Enter") {
			requirements.push(requirementValue);
		}
	};

	const handleDelete = (value) => {
		console.log(value);
	};

	return (
		<div className="px-4">
			<h6 className="text-2xl font-semibold">Post a job for free</h6>
			<form className="mt-4">
				<div>
					<label className="text-md text-gray-500">Job Title*</label>
					<input
						type="text"
						value={title}
						id="title"
						className="w-full border-2 mt-2 h-8 rounded-md px-2 hover:shadow-sm"
					/>
				</div>
				<div className="mt-2 flex">
					<div>
						<label className="text-md text-gray-500">Company*</label>
						<input
							type="text"
							value={company}
							id="company"
							className="w-full border-2 mt-2 h-8 rounded-md px-2 hover:shadow-sm"
						/>
					</div>
					<div className="relative ml-2">
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
					</div>
				</div>
				<div className="flex flex-col mt-2">
					<label className="text-md text-gray-500 mb-2">Job description*</label>
					<textarea
						value={description}
						id={description}
						className="p-2 h-24 border-2 rounded-md"
					></textarea>
				</div>
				<div className="mt-2">
					<label className="text-md text-gray-500">Job Title*</label>
					<input
						type="text"
						value={requirementValue}
						onChange={(e) => setRequirementValue(e.target.value)}
						onKeyDown={handleSelect}
						placeholder="give the neccesary certificate or experience for the job"
						id="title"
						className="w-full text-sm border-2 mt-2 h-8 rounded-md px-2 hover:shadow-sm"
					/>
					<div>
						{requirements &&
							requirements?.map((requirement, index) => (
								<Chip
									key={index}
									label={requirement}
									variant="outlined"
									sx={{ marginTop: "10px" }}
									onDelete={() => handleDelete(requirement)}
								/>
							))}
					</div>
				</div>
			</form>
		</div>
	);
};

export default PrevFormState;
