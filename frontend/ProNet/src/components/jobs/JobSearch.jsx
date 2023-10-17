import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";

const JobSearch = () => {
	return (
		<div className="w-full">
			<form className="w-full flex items-center">
				<div className="relative w-2/3">
					<FaMagnifyingGlass className="absolute top-4 left-2 text-orange" />
					<input
						type="text"
						placeholder="search by job title, company, keywords"
						className="h-10 px-8 text-sm text-gray-500 w-full border shadow-sm focus:outline-none"
					/>
				</div>
				<div className="relative w-1/3 ml-4">
					<MdLocationPin className="absolute top-3 left-2 text-orange" />
					<input
						type="text"
						placeholder="On-site, remote or hybrid"
						className="h-10 px-8 text-sm text-gray-500 w-full border shadow-sm focus:outline-none"
					/>
				</div>
			</form>
			<div>{/* to show searched queries */}</div>
		</div>
	);
};

export default JobSearch;
