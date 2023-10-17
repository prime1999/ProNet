import React from "react";
import { Grid } from "@mui/material";
import LeftComponent from "../../components/jobs/LeftComponent";
import JobSection from "../../components/jobs/JobSection";

const JobDashboard = () => {
	return (
		<div className="bg-gray-50 pb-8">
			<div className="w-11/12 mx-auto mt-4">
				<Grid container spacing={2}>
					<Grid item xs={12} md={3}>
						<div>
							<LeftComponent />
						</div>
					</Grid>
					<Grid item xs={12} md={9}>
						<JobSection />
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default JobDashboard;
