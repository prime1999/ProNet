import React from "react";
import { AiOutlinePlus, AiOutlineArrowRight } from "react-icons/ai";
import { GiSkills } from "react-icons/gi";
import { FiEdit2 } from "react-icons/fi";
import UpdateSkills from "../../UpdateComponents/UpdateSkills";

const Skills = ({ intro }) => {
	return (
		<div className="w-full border shadow-md bg-white rounded-sm p-4 my-8">
			<div className="flex items-start justify-between mb-4">
				<h6 className="font-semibold font-poppins">Skills</h6>
				<div className="flex items-center">
					<AiOutlinePlus className="mr-4 text-lg hover:text-orange hover:cursor-pointer" />
					<UpdateSkills intro={intro}>
						<FiEdit2 className="hover:text-orange hover:cursor-pointer" />
					</UpdateSkills>
				</div>
			</div>
			<div>
				{intro?.skills ? (
					<>
						{intro?.skills.map((skill, index) => (
							<div key={index} className="flex items-center mb-4">
								<GiSkills className="text-gray-500" />
								<h6 className="ml-2 font-semibold">{skill}</h6>
							</div>
						))}
						<div className="flex items-center text-darkBlue justify-between w-[190px] font-semibold px-4 py-2 duration-500 hover:w-[195px] hover:cursor-pointer">
							<p>Show All my skills</p>
							<AiOutlineArrowRight className="ml-2" />
						</div>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Skills;
