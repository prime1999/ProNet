import { useState } from "react";
import { MdNavigateNext } from "react-icons/md";

const CreateExperience = ({ values }) => {
	const { profileIntroState, setProfileIntroState, nextStep, prevStep } =
		values;

	const { company, position, details, startDate, endDate } = profileIntroState;

	const handleChange = (e) => {
		setProfileIntroState((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
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
				<input
					className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
					placeholder="Company name"
					type="text"
					id="company"
					value={company}
					onChange={(e) => handleChange(e)}
				/>

				<input
					className="w-full h-[40px] rounded-md py-2 mt-4 px-4 bg-transparent border border-gray-200 focus:outline-none"
					placeholder="Position"
					type="text"
					id="position"
					value={position}
					onChange={(e) => handleChange(e)}
				/>
				<textarea
					className="w-full h-[100px] rounded-md py-2 px-4 my-4 bg-transparent border border-gray-200 focus:outline-none"
					placeholder="Job details"
					type="text"
					id="details"
					value={details}
					onChange={(e) => handleChange(e)}
				/>
				<div className="flex items-center justify-between">
					<div className="w-1/2">
						<label className="text-md ml-2 mb-2 text-gray-400">
							Start-date
						</label>
						<input
							className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							placeholder="Start date"
							type="date"
							id="startDate"
							value={startDate}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="w-1/2 ml-2">
						<label className="text-md ml-2 mb-2 text-gray-400">End-date</label>
						<input
							className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							placeholder="end date"
							type="date"
							id="endDate"
							value={endDate}
							onChange={(e) => handleChange(e)}
						/>
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
						onClick={nextStep}
						className="flex items-center w-20 p-2 duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-pink hover:to-orange"
					>
						<p className="mr-2 font-dosis">Next</p>
						<MdNavigateNext />
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateExperience;
