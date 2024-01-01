import { Link } from "react-router-dom";

const FIfthSection = () => {
	return (
		<div className="flex flex-col justify-center items-center mt-16">
			<div className="font-poppin w-[400px] leading-normal md:w-[500px]">
				<h1 className="text-4xl text-center text-darkBlue font-semibold">
					Who is ProNet for? <br />
					<span className="text-3xl">ProNet is for those that want</span>
				</h1>
				<div className="flex justify-center items-center flex-wrap font-cour mt-2">
					<div className="py-2 px-4 bg-light rounded-full mx-2 shadow-md mt-4">
						<p>Internship</p>
					</div>
					<div className="py-2 px-4 bg-light rounded-full mx-2 shadow-md mt-4">
						<p>Full-time Jobs</p>
					</div>
					<div className="py-2 px-4 bg-light rounded-full mx-2 shadow-md mt-4">
						<p>To Network</p>
					</div>
					<div className="py-2 px-4 bg-light rounded-full mx-2 shadow-md mt-4">
						<p>Learn</p>
					</div>
					<div className="py-2 px-4 bg-light rounded-full mx-2 shadow-md mt-4">
						<p>Meet New People</p>
					</div>
					<div className="py-2 px-4 bg-light rounded-full mx-2 shadow-md mt-4">
						<p>Connect with old friends</p>
					</div>
					<div className="py-2 px-4 bg-light rounded-full mx-2 shadow-md mt-4">
						<p>And so much more</p>
					</div>
				</div>
			</div>
			<Link className="py-2 px-4 mt-4 font-bold text-md bg-gradient-to-r from-orange to-pink rounded-full duration-1000 ease-in-out hover:bg-gradient-to-r hover:from-pink hover:to-orange">
				Get Started
			</Link>
		</div>
	);
};

export default FIfthSection;
