import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import logo from "../../assets/images/png/logo.png";
import VerificationModal from "../../components/Auth/VerificationModal";

const RegisterUser = () => {
	const [value, setValue] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div className="image-back">
			<form
				onSubmit={handleSubmit}
				className="h-screen flex items-center justify-center"
			>
				<div className="h-[550px] w-[450px] glassmorphism-card p-4">
					<Link
						to="/"
						className="flex items-center font-black font-semibold text-4xl"
					>
						<img className="w-12" src={logo} alt="" />
						<h1 className="ml-2">ProNet</h1>
					</Link>
					<p className="mt-2 font-dosis text-sm text-orange">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						Voluptatibus, sapiente!
					</p>
					<div className="mt-4 flex items-start flex-col">
						<input
							className="w-full h-[50px] mb-4 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							type="text"
							placeholder="First-Name"
						/>
						<input
							className="w-full h-[50px] mb-4 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							type="text"
							placeholder="Last-Name"
						/>
						<input
							className="w-full h-[50px] mb-4 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							type="email"
							placeholder="Your Email"
						/>
						<PhoneInput
							className={`custom-phone-input mb-4 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none`}
							placeholder="Enter phone number"
							value={value}
							international={true}
							onChange={setValue}
						/>
						<input
							className="w-full h-[50px] mb-2 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none"
							type="password"
							placeholder="Create password"
						/>
						<VerificationModal>
							<p>REGISTER</p>
						</VerificationModal>
						<Link
							to="/login"
							className="mt-2 font-dosis duration-500 hover:text-orange"
						>
							<p>Already have an account</p>
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default RegisterUser;
