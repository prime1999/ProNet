import React from "react";
import { Link } from "react-router-dom";
import recruit from "../../assets/images/png/search-job-seekers.png";
import { motion } from "framer-motion";

// for the bouncy effect on the hero image
const bounceVariants = {
	initial: { y: 0 },
	animate: {
		y: [-7, 0, -7],
		transition: { duration: 1.5, repeat: Infinity },
	},
};

const FourthSection = () => {
	return (
		<div className="flex flex-col justify-between items-center mt-16 md:flex-row">
			<motion.div
				variants={bounceVariants}
				initial="initial"
				animate="animate"
				className="w-[400px]"
			>
				<img src={recruit} alt="" />
			</motion.div>
			<div className="font-poppin w-[400px] leading-normal md:w-[500px]">
				<h1 className="text-4xl  text-darkBlue font-semibold">
					Post your job for millions of professionals to see
				</h1>
				<p className="text-md mt-4 leading-normal text-gray-400 mb-8">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
					voluptatem est quasi, sapiente beatae possimus nesciunt quam eligendi
					fugiat deserunt eius reprehenderit reiciendis dolores vero.
				</p>
				<Link className="py-2 px-4 font-bold text-md bg-gradient-to-r from-orange to-pink rounded-md duration-1000 ease-in-out hover:bg-gradient-to-r hover:from-pink hover:to-orange">
					Post Jobs
				</Link>
			</div>
		</div>
	);
};

export default FourthSection;
