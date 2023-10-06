import { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
	reset,
	getProfileIntro,
} from "../../features/Profile/ProfileIntro/ProfileIntroSlice";

import { Grid } from "@mui/material";
import PostFeed from "../../components/NewFeed/PostFeed";
import LeftFeedComponentLoader from "../../components/miscellaneous/skeletons/LeftFeedComponentLoader";
import RightFeedComponentLoader from "../../components/miscellaneous/skeletons/RightFeedComponentLoader";

const LeftComponent = lazy(() =>
	import("../../components/NewFeed/LeftComponent")
);
const RightComponent = lazy(() =>
	import("../../components/NewFeed/RightComponent")
);

const Dashboard = () => {
	const [intro, setIntro] = useState(null);
	// init the dispatch function
	const dispatch = useDispatch();

	// get the user's profile intro from the redux store
	const { profileIntro, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.profileIntro
	);

	// for design below small screen size
	const isSmallerThanMd = useMediaQuery((theme) =>
		theme.breakpoints.down("sm")
	);

	// dispatch the getProfileIntro function
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
		dispatch(reset());
	}, [isSuccess]);
	return (
		<div className="bg-gray-50 pb-8">
			<div className="w-11/12 mx-auto mt-4">
				<Grid container spacing={2}>
					<Grid item xs={12} md={3}>
						<div className="hidden lg:flex">
							{!isLoading && intro && (
								<div className="w-full">
									<Suspense fallback={<LeftFeedComponentLoader />}>
										<LeftComponent intro={intro} />
									</Suspense>
								</div>
							)}
						</div>
					</Grid>
					<Grid item xs={12} md={6}>
						<div>
							<PostFeed intro={intro} />
						</div>
					</Grid>
					<Grid item xs={12} md={3}>
						<Suspense fallback={<RightFeedComponentLoader />}>
							<RightComponent />
						</Suspense>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default Dashboard;
