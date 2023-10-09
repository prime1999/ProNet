import { useEffect, lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed, reset } from "../../features/Post/PostSlice";
import FeedListsLazyLoader from "../miscellaneous/skeletons/FeedListsLazyLoader";

const FeedList = lazy(() => import("./FeedList"));

const FeedBody = ({ intro }) => {
	const [feeds, setFeeds] = useState(null);
	const dispatch = useDispatch();

	const { feed, isLoading, isSuccess } = useSelector((state) => state.post);

	useEffect(() => {
		dispatch(getFeed());
	}, []);

	useEffect(() => {
		if (isSuccess) {
			setFeeds(feed);
		}
		dispatch(reset());
	}, [isSuccess]);

	return (
		<div className="mt-8">
			{feeds &&
				feeds?.map((post) => (
					<Suspense key={post.details._id} fallback={<FeedListsLazyLoader />}>
						<FeedList intro={intro} post={post} />
					</Suspense>
				))}
		</div>
	);
};

export default FeedBody;
