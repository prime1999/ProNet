import LeftProfileDetails from "./LeftProfileDetails";
import RightProfileDetails from "./RightProfileDetails";

const ProfileBody = ({ intro }) => {
	return (
		<div>
			<div className="flex items-start">
				<div className="mt-16 mr-4 w-1/4">
					<LeftProfileDetails intro={intro} />
				</div>
				<div className="ml-8 w-3/4">
					<RightProfileDetails intro={intro} />
				</div>
			</div>
		</div>
	);
};

export default ProfileBody;
