import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileBody from "../../components/profile/ProfileBody";
import {
	getProfileIntro,
	reset,
} from "../../features/Profile/ProfileIntro/ProfileIntroSlice";
import Spinner from "../../components/Spinner/Spinner";

const Profile = () => {
	const [intro, setIntro] = useState(null);
	// init the dispatch function
	const dispatch = useDispatch();

	// get the user's profile intro from the redux store
	const { profileIntro, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.profileIntro
	);

	// dispatch the getProfileIntro function
	useEffect(() => {
		dispatch(getProfileIntro());
	}, [dispatch]);

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
	}, [isSuccess]);

	// if the dispatched function is still pending (loading), then show a spinner
	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			{intro && (
				<div
					key={intro._id}
					className="relative w-full h-[350px]"
					style={{
						backgroundImage: `url(${intro?.backgroundPhoto})`,
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
						<div className="relative top-48 w-10/12 mx-auto mt-32">
							<ProfileBody intro={intro} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Profile;
