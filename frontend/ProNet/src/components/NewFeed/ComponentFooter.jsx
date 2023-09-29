import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/png/logo.png";

const ComponentFooter = () => {
	return (
		<div className="bg-white mt-4 shadow-sm p-4 w-full">
			<div className="flex items-center justify-between w-full">
				<ul className="text-xs text-gray-300 w-full">
					<li className="mb-2">
						<Link>About</Link>
					</li>
					<li className="mb-2">
						<Link>Privacy & terms</Link>
					</li>
					<li className="mb-2">
						<Link>Advertising</Link>
					</li>
					<li>
						<Link>ProNet App</Link>
					</li>
				</ul>
				<ul className="text-xs mr-4 text-gray-300 w-full">
					<li className="mb-2">
						<Link>Help Center</Link>
					</li>
					<li className="mb-2">
						<Link>Accesibility</Link>
					</li>
					<li className="mb-2">
						<Link>Business Services</Link>
					</li>
					<li>
						<Link>More</Link>
					</li>
				</ul>
			</div>
			<div className="mt-4">
				<Link
					to="/"
					className="flex items-center justify-between font-black font-semibold text-md rounded-md bg-light p-2"
				>
					<div className="flex items-center">
						<img className="w-4" src={logo} alt="" />
						<h1 className="ml-2">ProNet</h1>
					</div>
					<p className="font-bold text-orange font-poppins text-xs">
						Eminence &copy; 2023
					</p>
				</Link>
			</div>
		</div>
	);
};

export default ComponentFooter;
