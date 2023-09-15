import { useState } from "react";
import { GrDocumentUpdate } from "react-icons/gr";

const UpdateContactInfo = () => {
	const [months, setMonths] = useState([
		"January",
		"february",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]);
	return (
		<div>
			<div className="p-4 font-semibold text-lg text-gray-400">
				<h4>Edit Job Preference</h4>
			</div>
			<hr className="border-darkBlue" />
			<div className="px-4">
				<form className="my-8">
					<label>Phone number</label>
					<input className="w-full" type="text" />
					<label>Birthday</label>
					<select className="w-full">
						<option></option>
						{months.map((month, index) => (
							<option key={index} className="w-full">
								{month}
							</option>
						))}
					</select>
				</form>
			</div>
			<hr className="border-darkBlue" />
			<div className="flex items-end justify-end m-4">
				<div className="flex items-center w-24 p-2 duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-pink hover:to-orange">
					<GrDocumentUpdate />
					<p className="ml-2 font-dosis">Update</p>
				</div>
			</div>
		</div>
	);
};

export default UpdateContactInfo;
