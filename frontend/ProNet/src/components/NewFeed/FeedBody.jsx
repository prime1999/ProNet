import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import FileSwiper from "../FileSwiper";
import { getFeed } from "../../features/Post/PostSlice";

const FeedBody = () => {
	const dispatch = useDispatch();

	const { feed, isLoading, isSuccess } = useSelector((state) => state.post);

	useEffect(() => {
		dispatch(getFeed());
	}, []);
	return (
		<div className="mt-8">
			{feed &&
				feed.map((post) => (
					<div key={post._id} className="w-full mt-4 bg-white shadow-sm p-4">
						<div className="w-full">
							<div>
								<Avatar src={post.author.pic} />
							</div>
							{/* <FileSwiper /> */}
						</div>
					</div>
				))}
		</div>
	);
};

export default FeedBody;
