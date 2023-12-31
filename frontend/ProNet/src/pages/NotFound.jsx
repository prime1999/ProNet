import { Link } from "react-router-dom";
import worker from "../assets/images/png/Bricklayer-amico.png";

const NotFound = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="w-11/12 mx-auto flex flex-col justify-center items-center py-4 md:flex-row lg:w-full">
				<img src={worker} alt="worker" className="w-96" />
				<div>
					<h1 className="font-black text-black text-center text-[100px] md:text-left">
						404
					</h1>
					<h4 className="font-semibold text-2xl text-center md:text-left">
						UH OH! You're lost.
					</h4>
					<p className="text-gray-500 my-4">
						The site is still under development, So this page is still to be
						built <br /> Our engineers are on it.
					</p>
					<Link
						to="/"
						className="border-2 border-darkBlue font-semibold text-darkBlue rounded-3xl mt-8 px-4 py-2 duration-500 hover:bg-darkBlue hover:text-white"
					>
						Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
