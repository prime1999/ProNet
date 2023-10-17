import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { BsFillBookmarkFill, BsYoutube } from "react-icons/bs";
import { IoIosNotifications, IoMdCheckmark, IoMdPaper } from "react-icons/io";
import CreateJobPosting from "../Modals/CreateJobPosting";

const LeftComponent = () => {
	return (
		<div className="bg-white shadow-sm p-8 text-darkBlue">
			<div>
				<ul className="font-bold">
					<li className="flex items-center hover:cursor-pointer">
						<BsFillBookmarkFill className="text-md" />{" "}
						<p className="ml-2">My jobs</p>
					</li>
					<li className="flex items-center mt-8 hover:cursor-pointer">
						<IoIosNotifications className="text-md" />{" "}
						<p className="ml-2">Job alerts</p>
					</li>
					<li className="flex items-center mt-8 hover:cursor-pointer">
						<IoMdCheckmark className="text-md" />{" "}
						<p className="ml-2">Demonstrative skills</p>
					</li>
					<li className="flex items-center mt-8 hover:cursor-pointer">
						<IoMdPaper className="text-md" />{" "}
						<p className="ml-2">Interview Prep</p>
					</li>
					<li className="flex items-center mt-8 hover:cursor-pointer">
						<IoMdPaper className="text-md" />{" "}
						<p className="ml-2">Resume builder</p>
					</li>
					<li className="flex items-center mt-8 hover:cursor-pointer">
						<BsYoutube className="text-md" />{" "}
						<p className="ml-2">Job seeker guidiance</p>
					</li>
					<li className="flex items-center mt-8 hover:cursor-pointer">
						<AiOutlineSetting className="text-md" />{" "}
						<p className="ml-2">Application settings</p>
					</li>
				</ul>
				<div className="mt-8 flex items-center justify-center">
					<CreateJobPosting>
						<button className="py-2 px-4 font-dosis w-full text-center text-lg font-bold duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:bg-gradient-to-r hover:from-pink hover:to-orange">
							Post a job
						</button>
					</CreateJobPosting>
				</div>
			</div>
		</div>
	);
};

export default LeftComponent;
