import LeftProfileDetails from "./LeftProfileDetails";
import RightProfileDetails from "./RightProfileDetails";

const ProfileBody = ({ intro }) => {
	return (
		<div className="flex items-start justify-betweenw-full">
			<div className="w-1/4 mr-8">
				<LeftProfileDetails intro={intro} />
			</div>
			<div className="w-3/4">
				<RightProfileDetails intro={intro} />
			</div>
		</div>
	);
};

export default ProfileBody;
