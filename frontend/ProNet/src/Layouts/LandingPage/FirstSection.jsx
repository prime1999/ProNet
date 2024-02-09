import React from "react";
import { Link } from "react-router-dom";

const FirstSection = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-16">
			<div className="w-full text-3xl text-center font-poppins font-bold text-darkBlue leading-relaxed">
				<h1>Elevate your Career Trajectory with every Connection</h1>
			</div>
			<div className="w-2/3 text-center font-poppins text-gray-400 text-sm mt-2">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
					perspiciatis quod nam, laborum eaque maxime quisquam veniam eum odit
					ducimus nulla fugit officia nihil. Magni.
					<br /> <br />
					Aspernatur. Cupiditate facilis corrupti blanditiis unde, nesciunt,
					dolorum praesentium natus saepe incidunt minima vitae? Recusandae
					voluptas eveniet perferendis.
				</p>
			</div>
			<div className="w-[400px] font-poppins my-8 flex items-center justify-between text-center text-darkBlue md:w-[600px]">
				<div>
					<h1>
						over <br />
						<span className="text-3xl font-bold">300K</span>
					</h1>
					<p className="font-cour">jobs posted daily</p>
				</div>
				<div>
					<h1>
						over <br />
						<span className="text-3xl font-bold">50K</span>
					</h1>
					<p className="font-cour">Learning Resources</p>
				</div>
				<div>
					<h1>
						over <br />
						<span className="text-3xl font-bold">200K</span>
					</h1>
					<p className="font-cour">Users get hired monthly</p>
				</div>
			</div>
			<Link className="py-2 px-4 mb-4 font-bold text-md bg-gradient-to-r from-orange to-pink rounded-md duration-1000 ease-in-out hover:bg-gradient-to-r hover:from-pink hover:to-orange">
				Explore the App
			</Link>
		</div>
	);
};

export default FirstSection;
