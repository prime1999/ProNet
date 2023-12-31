import { useEffect, lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed, reset } from "../../features/Post/PostSlice";
import FeedListsLazyLoader from "../miscellaneous/skeletons/FeedListsLazyLoader";
import Spinner from "../../components/Spinner/Spinner";

const FeedList = lazy(() => import("./FeedList"));

const FeedBody = ({ intro }) => {
	const [fetchFeedsAgain, setFetchFeedsAgain] = useState(false);
	const [feeds, setFeeds] = useState(null);
	const dispatch = useDispatch();

	const { feed, isLoading, isSuccess } = useSelector((state) => state.post);

	useEffect(() => {
		dispatch(getFeed());
	}, [fetchFeedsAgain]);

	useEffect(() => {
		if (isSuccess) {
			setFeeds(feed);
		}
		dispatch(reset());
	}, [isSuccess]);

	return (
		<div className="mt-8">
			{!feeds && <Spinner />}
			{feeds &&
				feeds?.map((post) => (
					<Suspense key={post.details._id} fallback={<FeedListsLazyLoader />}>
						<FeedList
							fetchFeedsAgain={fetchFeedsAgain}
							setFetchFeedsAgain={setFetchFeedsAgain}
							intro={intro}
							post={post}
						/>
					</Suspense>
				))}
		</div>
	);
};

export default FeedBody;
