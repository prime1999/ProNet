import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, []);
	return (
		<>
			<h1>test</h1>
		</>
	);
};

export default Home;
