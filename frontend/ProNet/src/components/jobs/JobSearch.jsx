import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { searchJobPosting } from "../../features/jobs/JobSlice";

const JobSearch = () => {
	const dispatch = useDispatch();
	const [text, setText] = useState("");
	const [queries, setQueries] = useState(null);

	const handleSearch = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			const keyword = text;
			dispatch(searchJobPosting(keyword));
		}
	};

	return (
		<div className="w-full">
			<form className="w-full flex items-center">
				<div className="relative w-2/3">
					<FaMagnifyingGlass className="absolute top-4 left-2 text-orange" />
					<input
						type="text"
						placeholder="search by job title, company, skills"
						value={text}
						onChange={(e) => setText(e.target.value)}
						onKeyDown={handleSearch}
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
