import React, { lazy, Suspense } from "react";
import { AiFillCalendar } from "react-icons/ai";
import { BiPhotoAlbum, BiSolidBookAlt } from "react-icons/bi";
import { Avatar } from "@mui/material";
import CreatePostModal from "../Modals/CreatePostModal";

const CreatePostSection = ({ intro }) => {
	return (
		<div className="w-full bg-white shadow-sm p-4">
			<div className="text-xs font-semibold md:text-sm">
				<ul className="flex items-center justify-between">
					<li className="flex items-center w-1/4 justify-center text-gray-400 border-darkBlue pb-4 duration-300 ease-in-out hover:cursor-pointer hover:text-black hover:border-b">
						<AiFillCalendar className="text-blue-500 mr-1" />
						<p>Event</p>
					</li>
					<li className="flex items-center justify-center w-1/3 text-gray-400 border-darkBlue pb-4 duration-300 ease-in-out hover:cursor-pointer hover:text-black hover:border-b">
						<BiPhotoAlbum className="text-yellow-500" />
						<p>Upload a photo</p>
					</li>
					<li className="flex items-center justify-center w-1/3 text-gray-400 border-darkBlue pb-4 duration-300 ease-in-out hover:cursor-pointer hover:text-black hover:border-b">
						<BiSolidBookAlt className="text-green-500 mr-1" />
						<p>Write an article</p>
					</li>
				</ul>
			</div>
			<div className="flex items-center w-f justify-start mt-8 px-2 md:px-4 lg:px-8">
				<Avatar src={intro?.pic} />
				<CreatePostModal intro={intro}>
					<button className="ml-4 bg-light rounded-3xl w-full py-2 px-4 text-left font-semibold duration-300 hover:bg-orange">
						Start a post
					</button>
				</CreatePostModal>
			</div>
		</div>
	);
};

export default CreatePostSection;
