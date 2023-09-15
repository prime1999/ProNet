import React from "react";

const Spinner = () => {
	return (
		<div className="absolute left-0 top-0 bottom-0 right-0">
			<div className="flex items-center justify-center h-screen">
				<div className="lds-spinner">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default Spinner;
