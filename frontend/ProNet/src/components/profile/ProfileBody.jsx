import { Suspense, lazy } from "react";
import RightProfileDetails from "./RightProfileDetails";
import LeftSkeleton from "../miscellaneous/skeletons/profileSkeleton/LeftSkeleton";

const LeftProfileDetails = lazy(() => import("./LeftProfileDetails"));

const ProfileBody = ({ intro }) => {
	return (
		<div className="flex flex-col items-start justify-between w-11/12 mx-auto lg:w-full lg:flex-row">
			<div className="w-full md:w-8/12 md:mx-auto lg:mr-8 lg:w-1/4">
				<Suspense fallback={<LeftSkeleton />}>
					<LeftProfileDetails intro={intro} />
				</Suspense>
			</div>
			<div className="w-full lg:w-3/4">
				<RightProfileDetails intro={intro} />
			</div>
		</div>
	);
};

export default ProfileBody;
