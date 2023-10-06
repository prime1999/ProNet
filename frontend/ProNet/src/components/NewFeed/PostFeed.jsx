import React, { lazy, Suspense } from "react";
import FeedBody from "./FeedBody";
import CreatePostSectionLoader from "../miscellaneous/skeletons/CreatePostSectionLoader";

const CreatePostSection = lazy(() => import("./CreatePostSection"));

const PostFeed = ({ intro }) => {
	return (
		<div className="w-full">
			<Suspense fallback={<CreatePostSectionLoader />}>
				<CreatePostSection intro={intro} />
			</Suspense>
			<div className="mt-4 w-full">
				<FeedBody />
			</div>
		</div>
	);
};

export default PostFeed;
