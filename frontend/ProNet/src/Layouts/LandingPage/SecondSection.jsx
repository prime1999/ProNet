import React from "react";
import { Link } from "react-router-dom";
import jobHunt from "../../assets/images/png/job hunt.png";
import { motion } from "framer-motion";

// for the bouncy effect on the hero image
const bounceVariants = {
	initial: { y: 0 },
	animate: {
		y: [-7, 0, -7],
		transition: { duration: 1.5, repeat: Infinity },
	},
};

const SecondSection = () => {
	return (
		<div className="flex flex-col justify-between items-center mt-16 md:flex-row">
			<div className="font-poppin w-[400px] leading-normal md:w-[500px]">
				<h1 className="text-4xl  text-darkBlue font-semibold">
					Let the right people know you are open to work
				</h1>
				<p className="text-md mt-4 leading-normal text-gray-400 mb-8">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, in
					et blanditiis eum magni maxime voluptates eaque laboriosam neque quae
					provident velit fuga id temporibus?
				</p>
				<Link className="py-2 px-4 font-bold text-md bg-gradient-to-r from-orange to-pink rounded-md duration-1000 ease-in-out hover:bg-gradient-to-r hover:from-pink hover:to-orange">
					See Job Postings
				</Link>
			</div>
			<motion.div
				variants={bounceVariants}
				initial="initial"
				animate="animate"
				className="w-[400px]"
			>
				<img src={jobHunt} alt="job-hunt-image" />
			</motion.div>
		</div>
	);
};

export default SecondSection;
