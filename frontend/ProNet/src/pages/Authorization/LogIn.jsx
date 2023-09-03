import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/png/logo.png";

const LogIn = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div className="image-back">
			<form
				onSubmit={handleSubmit}
				className="h-screen flex items-center justify-center"
			>
				<div className="w-[420px] h-[420px] glassmorphism-card p-4">
					<Link
						to="/"
						className="flex items-center font-black font-semibold text-4xl"
					>
						<img className="w-12" src={logo} alt="" />
						<h1 className="ml-2">ProNet</h1>
					</Link>
					<p className="mt-4 font-dosis text-sm text-orange">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						Voluptatibus, sapiente!
					</p>
					<div className="mt-8 flex items-start flex-col">
						<input
							className="w-full h-[50px] mb-4 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							type="email"
							placeholder="Your Email"
						/>

						<input
							className="w-full h-[50px] mb-2 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							type="password"
							placeholder="Password"
						/>
						<div className="font-cour font-semibold mt-2 px-4">
							<button className="flex justify-end duration-500 hover:text-orange">
								Forgot password?
							</button>
						</div>
						<button className="py-2 px-4 mt-2 font-bold w-full text-md bg-gradient-to-r from-orange to-pink rounded-md duration-1000 ease-in-out hover:bg-gradient-to-r hover:from-pink hover:to-orange">
							LOG-IN
						</button>
						<Link
							to="/register"
							className="mt-4 font-dosis duration-500 hover:text-orange"
						>
							<p>Don't have an Account?</p>
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default LogIn;
