import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import {
	getProfileIntro,
	resetProfile,
} from "../features/Profile/ProfileIntro/ProfileIntroSlice";
import ComponentLoader from "./Spinner/ComponentLoader";

const CurrentUser = () => {
	const dispatch = useDispatch();
	const [intro, setIntro] = useState(null);

	const { profileIntro, isLoading, isSuccess } = useSelector(
		(state) => state.profileIntro
	);

	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getProfileIntro());
	}, []);

	// to run anytime the isSuccess variable changes
	useEffect(() => {
		// check if the isSuccess variable from the redux store is true (that is the getProfileIntro was fulfilled)
		if (isSuccess) {
			if (Array.isArray(profileIntro)) {
				setIntro(profileIntro[0]);
			} else {
				setIntro(profileIntro);
			}
		}
		// clear the redux store
		dispatch(resetProfile());
	}, [isSuccess]);

	if (isLoading) {
		return <ComponentLoader />;
	}
	return (
		<div>
			<Link className="flex items-center mb-4">
				<Avatar src={user?.pic} />
				<div className="ml-2">
					<h6 className="font-poppins font-bold text-darkBlue">{`${user.firstName} ${user?.lastName}`}</h6>
					<p className="font-cour text-sm text-darakBlue">{intro?.headLine}</p>
				</div>
			</Link>
			<hr />
			<div className="mt-4">
				<div>
					<h6 className="text-sm font-bold text-darkBlue mb-2">
						Views <span className="text-gray-400">1k</span>
					</h6>
					<hr className="w-12 mb-2" />
					<h6 className="text-sm font-bold text-darkBlue">
						Connections <span className="text-gray-400">3k</span>
					</h6>
				</div>
			</div>
		</div>
	);
};

export default CurrentUser;
