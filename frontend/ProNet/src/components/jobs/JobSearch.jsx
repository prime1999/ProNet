import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BiFilter } from "react-icons/bi";
import Select from "react-select";
import { Chip } from "@mui/material";
import { searchJobPosting, reset } from "../../features/jobs/JobSlice";

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
		backgroundColor: state.isSelected ? "#3E3B6F" : "white",
		color: state.isSelected ? "white" : "#252243",
		":hover": {
			backgroundColor: "#F6E8DF", // Change background color on hover
			color: "#252243",
			cursor: "pointer", // Change cursor to pointer on hover
		},
	}),
};

const filters = [
	{ value: "Full-time", label: "Full-time" },
	{ value: "Part-time", label: "Part-time" },
	{ value: "Contract", label: "Contract" },
	{ value: "Temporary", label: "Temporary" },
	{ value: "Other", label: "Other" },
	{ value: "Volunteer", label: "Volunteer" },
	{ value: "Internship", label: "Internship" },
	{ value: "on-site", label: "on-site" },
	{ value: "hybrid", label: "hybrid" },
	{ value: "remote", label: "remote" },
];

const JobSearch = () => {
	const dispatch = useDispatch();
	const [text, setText] = useState("");
	const [queries, setQueries] = useState([]);
	const [filter, setFilter] = useState(null);

	useEffect(() => {
		console.log(123);
	}, []);

	const handleSearch = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			const keyword = text;
			dispatch(searchJobPosting(keyword));
		}
	};

	const handleFilter = (value) => {
		const checkOccurrence = queries.includes(value);

		if (queries != [] && !checkOccurrence) {
			setQueries([...queries, value]);
			console.log(queries);
		}
		commenceSearch(value);
	};

	const commenceSearch = useCallback(
		(value) => {
			// Use useMemo to memoize the keyword value
			const keyword = [...queries, value];
			//const keyword = useMemo(() => [...queries, value], [queries, value]);
			dispatch(searchJobPosting(keyword));
			dispatch(reset());
		},
		[dispatch, queries]
	);

	const handleDelete = (query) => {
		const filterQueries = queries.filter((q) => q !== query);
		setQueries(filterQueries);
		const keyword = filterQueries;
		dispatch(searchJobPosting(keyword));
		dispatch(reset());
	};

	return (
		<div>
			<div className="w-full flex items-center">
				<form className="w-2/3">
					<div className="relative w-full">
						<FaMagnifyingGlass className="absolute top-3 left-2 text-orange" />
						<input
							type="text"
							placeholder="search by job title, company, skills"
							value={text}
							onChange={(e) => setText(e.target.value)}
							onKeyDown={handleSearch}
							className="h-10 px-8 text-sm text-gray-500 w-full border shadow-sm focus:outline-none"
						/>
					</div>
				</form>
				<div className="ml-4 w-1/3">
					<Select
						defaultValue={filter}
						onChange={(e) => {
							setFilter;
							handleFilter(e.value);
						}}
						options={filters}
						styles={customStyles}
						isSearchable={false}
						placeholder={
							<div className="flex items-center">
								<BiFilter className="font-bold text-lg mr-1" /> <p>Filter</p>
							</div>
						}
					/>
				</div>
			</div>
			{queries != [] && (
				<div className="flex flex-wrap p-2">
					{queries?.map((query, index) => (
						<Chip
							key={index}
							label={query}
							variant="outlined"
							sx={{
								marginTop: "10px",
								backgroundColor: "white",
								marginRight: "10px",
							}}
							onDelete={() => handleDelete(query)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default JobSearch;
