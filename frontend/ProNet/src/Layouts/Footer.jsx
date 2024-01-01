import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/svg/Online-world-bro.svg";

const Footer = () => {
	return (
		<div className="mt-16 w-full bg-light">
			<footer className="flex flex-col justify-between items-start px-16 py-8 md:flex-row">
				<div>
					<Link
						to="/"
						className="flex items-center font-black font-semibold text-4xl"
					>
						<img className="w-12" src={logo} alt="" />
						<h1 className="ml-2">ProNet</h1>
					</Link>
				</div>
				<div className="font-poppins">
					<h4 className="font-bold">General</h4>
					<ul className="text-gray-400 text-sm">
						<li>
							<Link>Sign Up</Link>
						</li>
						<li>
							<Link>Help Center</Link>
						</li>
						<li>
							<Link>About</Link>
						</li>
						<li>
							<Link>Press</Link>
						</li>
						<li>
							<Link>Blog</Link>
						</li>
						<li>
							<Link>Careers</Link>
						</li>
						<li>
							<Link>Developers</Link>
						</li>
					</ul>
				</div>
				<div className="font-poppins">
					<h4 className="font-bold">Browse ProNet</h4>
					<ul className="text-gray-400">
						<li>
							<Link>Learning</Link>
						</li>
						<li>
							<Link>Jobs</Link>
						</li>
						<li>
							<Link>Salary</Link>
						</li>
						<li>
							<Link>Mobile</Link>
						</li>
						<li>
							<Link>Services</Link>
						</li>
						<li>
							<Link>Products</Link>
						</li>
					</ul>
				</div>
				<div className="font-poppins">
					<h4 className="font-bold">Business Solutions</h4>
					<ul className="text-gray-400">
						<li>
							<Link>Talent</Link>
						</li>
						<li>
							<Link>Marketing</Link>
						</li>
						<li>
							<Link>Sales</Link>
						</li>
						<li>
							<Link>Learning</Link>
						</li>
					</ul>
				</div>
				<div className="font-poppins">
					<h4 className="font-bold">Directories</h4>
					<ul className="text-gray-400">
						<li>
							<Link>Members</Link>
						</li>
						<li>
							<Link>Jobs</Link>
						</li>
						<li>
							<Link>Companies</Link>
						</li>
						<li>
							<Link>Features</Link>
						</li>
						<li>
							<Link>Leaarning</Link>
						</li>
						<li>
							<Link>Posts</Link>
						</li>
						<li>
							<Link>Articles</Link>
						</li>
					</ul>
				</div>
			</footer>
			<div className="w-full h-12 bg-pink flex items-center justify-center">
				<h4 className="font-cour font-bold text-center text-md text-darkBlue my-4">
					&copy; 2023 EMINENCE, All rights reserved
				</h4>
			</div>
		</div>
	);
};

export default Footer;
