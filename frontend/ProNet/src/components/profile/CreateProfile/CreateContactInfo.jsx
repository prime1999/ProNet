import { useState } from "react";
import { MdNavigateNext } from "react-icons/md";

const CreateContactInfo = ({ values }) => {
	const { contactProfileState, setContactProfileState, nextStep, prevStep } =
		values;

	const { address, birthDay, website } = contactProfileState;

	const handleChange = (e) => {
		setContactProfileState((prevState) => ({
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
				<h6 className="font-normal font-cour">
					Add a simple contact information
				</h6>
			</div>
			<form className="mt-2">
				<input
					className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
					placeholder="Current Address"
					type="text"
					id="address"
					value={address}
					onChange={(e) => handleChange(e)}
				/>
				<input
					className="w-full h-[40px] rounded-md py-2 mt-4 px-4 bg-transparent border border-gray-200 focus:outline-none"
					placeholder="Position"
					type="text"
					id="website"
					value={website}
					onChange={(e) => handleChange(e)}
				/>
				<div className="mt-4">
					<label className="text-md ml-2 mb-2 text-gray-400">Birth-day</label>
					<input
						className="w-full h-[40px] rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
						placeholder="BirthDay"
						type="date"
						id="birthDay"
						value={birthDay}
						onChange={(e) => handleChange(e)}
					/>
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

export default CreateContactInfo;
