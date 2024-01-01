import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Layouts/LandingPage/NavBar";
import FirstSection from "../../Layouts/LandingPage/FirstSection";
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
			<div>
				<div className="container w-10/12 mx-auto">
					<NavBar />
					<HeroSection />
					<FirstSection />
					<SecondSection />
				</div>
				<ThirdSection />
				<div className="container w-10/12 mx-auto">
					<FourthSection />
					<FifthSection />
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Home;
