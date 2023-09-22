import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineArrowRight } from "react-icons/ai";
import { IoIosSchool } from "react-icons/io";
import ExperienceDetail from "./ExperienceDetail";
import UpdateSummary from "../../UpdateComponents/UpdateSummary";
import UpdateEducation from "../../UpdateComponents/UpdateEducation";
import Skills from "./skills";
import AddEducationModal from "./AddEducationModal";

const RightProfile = ({ intro }) => {
	return (
		<div className="w-full my-4">
			<div className="w-full border shadow-md bg-white rounded-sm p-4">
				<div className="flex items-center justify-between mb-4">
					<h6 className="font-semibold font-poppins">Summary</h6>
					<UpdateSummary intro={intro}>
						<FiEdit2 className="hover:text-orange hover:cursor-pointer" />
					</UpdateSummary>
				</div>
				<p className="mt-2 text-md font-normal text-gray-500">
					{intro?.summary}
				</p>
			</div>
			<div className="w-full border shadow-md bg-white rounded-sm p-4 my-8">
				<div className="flex items-start justify-between mb-4">
					<h6 className="font-semibold font-poppins">Education</h6>
					<div className="flex items-center">
						<AddEducationModal intro={intro?.education}>
							<AiOutlinePlus className="mr-4 text-lg hover:text-orange hover:cursor-pointer" />
						</AddEducationModal>
					</div>
				</div>
				<div>
					{intro?.education ? (
						<div>
							{intro?.education.map((education, index) => (
								<div key={education?._id}>
									{index < 3 && (
										<div className="flex items-start mt-4 mb-8">
											<div className="mt-1 p-2 bg-gray-200 mr-2">
												<IoIosSchool className="text-3xl text-gray-400" />
											</div>
											<div className="w-full">
												<div className="flex justify-between items-center w-full">
													<div>
														{education?.startDate && (
															<p className="font-dosis text-sm text-gray-400">
																{education?.startDate} - {education?.endDate}
															</p>
														)}
													</div>
												</div>
												<h3 className="font-poppins text-lg uppercase font-semibold">
													{education?.name}
												</h3>
												<p className="text-gray-600">
													{education?.degree} in {education?.fieldOfStudy}
												</p>
											</div>
											<UpdateEducation
												intro={intro.education}
												education={education}
											>
												<FiEdit2 className="hover:text-orange hover:cursor-pointer" />
											</UpdateEducation>
										</div>
									)}
								</div>
							))}
							<div className="flex items-center text-darkBlue justify-between w-[255px] font-semibold px-4 py-2 duration-500 hover:w-[260px] hover:cursor-pointer">
								<p>Show Full Education Profile</p>
								<AiOutlineArrowRight className="ml-2" />
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
			<ExperienceDetail intro={intro} />
			<Skills intro={intro} />
		</div>
	);
};

export default RightProfile;
