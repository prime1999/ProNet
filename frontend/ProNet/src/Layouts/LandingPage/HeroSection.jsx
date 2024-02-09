import React from "react";
import hero from "../../assets/images/png/hero.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// for the bouncy effect on the hero image
const bounceVariants = {
	initial: { y: 0 },
	animate: {
		y: [-7, 0, -7],
		transition: { duration: 1.5, repeat: Infinity },
	},
};

const HeroSection = () => {
	return (
		<div className="w-10/12 mx-auto flex flex-col-reverse items-center justify-between mt-8 md:flex-row md:w-full">
			<div className="w-96">
				<h1 className="font-poppins font-bold text-4xl leading-relaxed mb-8">
					Forge Connections, Fuel Careers: <br />
					Your Professional Journey Starts Here.
				</h1>
				<Link className="py-2 px-4 font-bold text-md bg-gradient-to-r from-orange to-pink rounded-md duration-1000 ease-in-out hover:bg-gradient-to-r hover:from-pink hover:to-orange">
					Get Started
				</Link>
			</div>
			<div>
				<motion.div
					variants={bounceVariants}
					initial="initial"
					animate="animate"
					className="w-[400px] md:w-[500px]"
				>
					<img src={hero} alt="hero image" />
				</motion.div>
			</div>
		</div>
	);
};

export default HeroSection;
