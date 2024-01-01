import { useState } from "react";
import CreateProfileIntro from "./CreateProfileIntro";
import CreateContactInfo from "./CreateContactInfo";
import CreateJobProfile from "./CreateJobProfile";
import CreateSkillProfile from "./CreateSkillProfile";
import CreateEducationProfile from "./CreateEducationProfile";
import CreateExperience from "./CreateExperience";
import Welcome from "../../Welcome";

const CreateProfile = () => {
	const [step, setStep] = useState(1);
	const [profileIntroState, setProfileIntroState] = useState({
		headLine: "",
		summary: "",
		location: "",
		name: "",
		degree: "",
		fieldOfStudy: "",
		grade: "",
		company: "",
		position: "",
		details: "",
		startDate: "",
		endDate: "",
	});

	const [contactProfileState, setContactProfileState] = useState({
		address: "",
		birthDay: "",
		website: "",
	});

	const [jobProfileState, setJobProfileState] = useState({
		jobTitles: [],
		jobTypes: [],
		jobLocations: [],
	});

	const [skillProfileState, setSkillProfileState] = useState({
		skills: [],
	});

	// function to go to the next step
	const nextStep = () => {
		setStep(step + 1);
	};
	// function to go to the prev step
	const prevStep = () => {
		setStep(step - 1);
	};

	switch (step) {
		case 1:
			return (
				<CreateProfileIntro
					values={{
						profileIntroState,
						setProfileIntroState,
						nextStep,
						prevStep,
					}}
				/>
			);
		case 2:
			return (
				<CreateEducationProfile
					values={{
						profileIntroState,
						setProfileIntroState,
						nextStep,
						prevStep,
					}}
				/>
			);
		case 3:
			return (
				<CreateExperience
					values={{
						profileIntroState,
						setProfileIntroState,
						nextStep,
						prevStep,
					}}
				/>
			);
		case 4:
			return (
				<CreateContactInfo
					values={{
						contactProfileState,
						setContactProfileState,
						nextStep,
						prevStep,
					}}
				/>
			);
		case 5:
			return (
				<CreateJobProfile
					values={{ jobProfileState, setJobProfileState, nextStep, prevStep }}
				/>
			);
		case 6:
			return (
				<CreateSkillProfile
					values={{
						skillProfileState,
						setSkillProfileState,
						nextStep,
						prevStep,
					}}
				/>
			);
		case 7:
			return <Welcome />;
	}
};

export default CreateProfile;
