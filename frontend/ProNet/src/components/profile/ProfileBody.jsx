import LeftProfileDetails from "./LeftProfileDetails";

const ProfileBody = ({ intro }) => {
	return (
		<div>
			<div className="flex items-start">
				<div className="flex items-start justify-between mr-4 w-1/4">
					<LeftProfileDetails intro={intro} />
				</div>
				svh
			</div>
		</div>
	);
};

export default ProfileBody;
