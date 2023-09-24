import React from "react";
import welcome from "../assets/images/png/welcome.png";
import { Link } from "react-router-dom";

const Welcome = () => {
	return (
		<div className="flex items-center justify-center">
			<div>
				<div className="w-96">
					<img className="w-full" src={welcome} alt="" />
				</div>
				<div className="flex items-center justify-between">
					<Link
						to="/"
						className="py-2 px-4 text-sm font-dosis font-bold duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:bg-gradient-to-r hover:from-pink hover:to-orange"
					>
						Go to Dashboard
					</Link>
					<Link
						to="/profile"
						className="py-2 px-4 ml-4 text-sm font-dosis font-bold duration-500 bg-gradient-to-r from-orange to-pink rounded-md hover:bg-gradient-to-r hover:from-pink hover:to-orange"
					>
						Continue building your profile
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
