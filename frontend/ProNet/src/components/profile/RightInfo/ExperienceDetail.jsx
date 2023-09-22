import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineArrowRight } from "react-icons/ai";
import { BiBriefcase } from "react-icons/bi";
import UpdateExperience from "../../UpdateComponents/UpdateExperience";
import AddExperienceModal from "./AddExperienceModal";

const ExperienceDetail = ({ intro }) => {
	return (
		<div className="w-full border shadow-md bg-white rounded-sm p-4 my-8">
			<div>
				<div className="flex items-start justify-between mb-4">
					<h6 className="font-semibold font-poppins">Experience</h6>
					<div className="flex items-center">
						<AddExperienceModal intro={intro?.experience}>
							<AiOutlinePlus className="mr-4 text-lg hover:text-orange hover:cursor-pointer" />
						</AddExperienceModal>
					</div>
				</div>
				<div>
					<div>
						{intro?.experience ? (
							<div>
								{intro?.experience.map((experience, index) => (
									<div key={experience?._id}>
										{index < 2 && (
											<div className="flex items-start justify-between">
												<div className="flex items-start mt-4 mb-8">
													<div className="mt-1 p-2 bg-gray-200 mr-2">
														<BiBriefcase className="text-3xl text-gray-400" />
													</div>
													<div className="">
														<p className="font-dosis text-sm text-gray-400">
															{experience?.startDate} - {experience?.endDate}
														</p>
														<h3 className="font-poppins text-lg uppercase font-semibold">
															{experience?.position}
														</h3>
														<p className="text-gray-600 font-bold">
															{experience?.company}
														</p>
														<p className="text-md text-gray-400">
															{experience?.details}
														</p>
													</div>
												</div>
												<UpdateExperience
													intro={intro?.experience}
													experience={experience}
												>
													<FiEdit2 className="hover:text-orange hover:cursor-pointer" />
												</UpdateExperience>
											</div>
										)}
									</div>
								))}
								<div className="flex items-center text-darkBlue justify-between w-[255px] font-semibold px-4 py-2 duration-500 hover:w-[260px] hover:cursor-pointer">
									<p>Show Full Work Experience</p>
									<AiOutlineArrowRight className="ml-2" />
								</div>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExperienceDetail;
