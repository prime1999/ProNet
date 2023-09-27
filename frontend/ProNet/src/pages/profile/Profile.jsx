import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileBody from "../../components/profile/ProfileBody";
import {
	getProfileIntro,
	reset,
} from "../../features/Profile/ProfileIntro/ProfileIntroSlice";
import Spinner from "../../components/Spinner/Spinner";
import ProfilePics from "../../components/profile/ProfilePics";
import ProfilePageFooter from "../../components/profile/ProfilePageFooter";

const Profile = () => {
	const [intro, setIntro] = useState(null);
	const [fetchProfileIntroAgain, setFetchProfileIntroAgain] = useState(false);
	// init the dispatch function
	const dispatch = useDispatch();

	// get the user's profile intro from the redux store
	const { profileIntro, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.profileIntro
	);

	// dispatch the getProfileIntro function
	useEffect(() => {
		dispatch(getProfileIntro());
	}, [fetchProfileIntroAgain]);

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
		dispatch(reset());
	}, [isSuccess, fetchProfileIntroAgain]);

	// if the dispatched function is still pending (loading), then show a spinner
	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			{intro && (
				<div
					key={intro._id}
					className="w-full h-[350px]"
					style={{
						backgroundImage: `url(${intro?.backgroundPhoto})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<ProfilePics
						fetchProfileIntroAgain={fetchProfileIntroAgain}
						setFetchProfileIntroAgain={setFetchProfileIntroAgain}
						intro={intro}
					/>
				</div>
			)}
			<div className="container mx-auto mt-4 xl:w-10/12 ">
				<ProfileBody intro={intro} />
			</div>
			<ProfilePageFooter />
		</>
	);
};

export default Profile;
