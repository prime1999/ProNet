import React from "react";
import ProfileBody from "../../components/profile/ProfileBody";

const Profile = () => {
	return (
		<>
			<div
				className="relative w-full h-[400px]"
				style={{
					backgroundImage:
						"URL(https://img.freepik.com/free-vector/3d-earth-graphic-symbolizing-global-trade-illustration_456031-131.jpg?w=826&t=st=1694248755~exp=1694249355~hmac=4e4ff0c40603f49763f2c4dc3d5b78664aa2de39464ad31532a620cd78055a07)",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div
					className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.5)",
					}}
				>
					<div className="absolute w-96 rounded-full left-36 top-40 flex items-center">
						<div>
							<img
								className="w-20 rounded-full"
								src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
								alt=""
							/>
						</div>
						<h3 className="font-cour text-light font-semiBold text-2xl ml-8">
							Jane Doe
						</h3>
					</div>
				</div>
			</div>
			<div className="w-10/12 mx-auto">
				<ProfileBody />
			</div>
		</>
	);
};

export default Profile;
