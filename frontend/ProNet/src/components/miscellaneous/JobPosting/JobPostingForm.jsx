import { useState } from "react";
import PrevFormState from "./PrevFormState";
import NextFormState from "./NextFormState";

const JobPostingForm = () => {
	// state to show next step
	const [step, setStep] = useState(1);
	// state for the the job posting
	const [jobPostingData, setJobPostingData] = useState({
		title: "",
		company: "",
		location: "",
		description: "",
		skills: [],
		jobType: [],
		employmentType: [],
		requirements: [],
		skills: [],
		salary: "",
	});

	switch (step) {
		case 1:
			return (
				<PrevFormState
					jobPostingData={jobPostingData}
					setJobPostingData={setJobPostingData}
					setStep={setStep}
				/>
			);
		case 2:
			return (
				<NextFormState
					jobPostingData={jobPostingData}
					setJobPostingData={setJobPostingData}
					setStep={setStep}
				/>
			);
	}
};

export default JobPostingForm;
