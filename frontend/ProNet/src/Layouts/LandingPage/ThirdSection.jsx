import React from "react";
import { Link } from "react-router-dom";

const ThirdSection = () => {
	return (
		<div className="w-full h-[400px]">
			<div
				id="bg"
				style={{
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundAttachment: "fixed",
				}}
				className="relative w-full h-full"
			>
				<div
					className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust the alpha value to control transparency
					}}
				>
					<div className="flex flex-col justify-center items-center">
						<h1 className="text-4xl  text-white font-semibold text-center">
							Join communities of people with the same interest.
						</h1>
						<div className="mt-8 text-white">
							<p className="w-[400px] text-center md:w-[500px]">
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Temporibus sequi incidunt velit modi tempore? Debitis id,
								voluptatum quas explicabo enim molestiae consequuntur, nemo,
								eaque deleniti sunt quos amet nostrum cupiditate.
							</p>
						</div>
						<div className="mt-8">
							<Link className="py-2 px-4 font-bold text-md bg-gradient-to-r from-orange to-pink rounded-md duration-1000 ease-in-out hover:bg-gradient-to-r hover:from-pink hover:to-orange">
								Join Community
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThirdSection;
