import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import JobSearch from "./JobSearch";
import { getRecommendedJobs, reset } from "../../features/jobs/JobSlice";
import Spinner from "../Spinner/Spinner";

const JobSection = () => {
	const dispatch = useDispatch();
	const [recommendedJobs, setRecommendedJobs] = useState([]);

	const { jobFeed, isLoading, isSuccess, message } = useSelector(
		(state) => state.jobs
	);

	useEffect(() => {
		dispatch(getRecommendedJobs());
	}, []);

	useEffect(() => {
		if (isSuccess) {
			setRecommendedJobs([...jobFeed]);
			reset();
		}
	}, [isSuccess, jobFeed]);

	const getPrice = (price) => {
		return price / 1000;
	};

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<div>
			<div className="w-11/12 mx-auto h-screen overflow-auto">
				<h2 className="font-poppins font-semibold text-xl mb-4">Job Board</h2>
				<JobSearch />
				{recommendedJobs && (
					<div className="mt-16">
						{recommendedJobs?.map((job) => (
							<div
								key={job._id}
								className="flex items-center bg-white p-4 shadow-sm border-2 border-white mb-4 hover:cursor-pointer hover:border-2 hover:border-light"
							>
								<div className="mr-4">
									<img
										src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzjqWHFE9knuBMuRtBOCNEDmYWm7-nKsBAcg&usqp=CAU"
										alt=""
										className="w-12"
									/>
								</div>
								<div className="w-full">
									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<h6 className="font-semibold font-poppins text-lg capitalize">
												{job?.title}
											</h6>
											{/* to replace with employment type from db */}

											{job?.jobType.map((type) => (
												<>
													<h6
														className={`ml-4 px-3 py-1 ${
															type === "hybrid"
																? "text-blue-800 bg-blue-100"
																: type === "on-site"
																? "text-green-800 bg-green-100"
																: "text-red-800 bg-red-100"
														} rounded-md font-semibold text-sm`}
													>
														{type}
													</h6>
												</>
											))}
										</div>
										<h5 className="text-sm text-gray-500">
											${getPrice(job?.salary)}k anually
										</h5>
									</div>
									<div className="flex items-center text-gray-500 text-sm mt-2">
										<p>{job?.company}</p>
										<p className="ml-8">{job?.location}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default JobSection;
