import React from "react";
import NavBar from "../../Layouts/LandingPage/NavBar";
import HeroSection from "../../Layouts/LandingPage/HeroSection";
import FirstSection from "../../Layouts/LandingPage/FirstSection";
import SecondSection from "../../Layouts/LandingPage/SecondSection";
import ThirdSection from "../../Layouts/LandingPage/ThirdSection";
import FourthSection from "../../Layouts/LandingPage/FourthSection";
import FifthSection from "../../Layouts/LandingPage/FIfthSection";
import Footer from "../../Layouts/Footer";

const Explore = () => {
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

export default Explore;
