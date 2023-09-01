/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				black: ["ADLaM Display", "cursive"],
				poppins: ["poppins", "sans-serif"],
				dosis: ["dosis", "cursive"],
				cour: ["Courgette", "cursive"],
			},
			colors: {
				darkBlue: "#3E3B6F",
				light: "#F6E8DF",
				orange: "#FEAE96",
				pink: "#FE979C",
				black: "#252243",
			},
		},
	},
	plugins: [],
};
