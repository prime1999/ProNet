import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFeed } from "../../features/Post/PostSlice";
import FeedListsLazyLoader from "../miscellaneous/skeletons/FeedListsLazyLoader";

const FeedList = lazy(() => import("./FeedList"));

const FeedBody = () => {
	const dispatch = useDispatch();

	const { feed, isLoading, isSuccess } = useSelector((state) => state.post);

	useEffect(() => {
		dispatch(getFeed());
	}, []);

	return (
		<div className="mt-8">
			{feed &&
				feed?.map((post) => (
					<Suspense key={post.details._id} fallback={<FeedListsLazyLoader />}>
						<FeedList post={post} />
					</Suspense>
				))}
		</div>
	);
};

export default FeedBody;
