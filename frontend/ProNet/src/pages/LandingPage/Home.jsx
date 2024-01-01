import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Layouts/LandingPage/NavBar";
import HeroSection from "../../Layouts/LandingPage/HeroSection";
import FirstSection from "../../Layouts/LandingPage/FirstSection";
import SecondSection from "../../Layouts/LandingPage/SecondSection";
import ThirdSection from "../../Layouts/LandingPage/ThirdSection";
import FourthSection from "../../Layouts/LandingPage/FourthSection";
import FifthSection from "../../Layouts/LandingPage/FIfthSection";
import Footer from "../../Layouts/Footer";

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
