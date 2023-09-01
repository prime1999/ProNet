import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Explore from "./pages/LandingPage/explore";

const router = createBrowserRouter(
	createRoutesFromElements(
		// route for the landing page
		<Route path="/" element={<Explore />} />
	)
);

function App() {
	const theme = createTheme({
		palette: {
			primary: {
				main: "#3E3B6F", // Set your desired primary color
			},
			light: {
				main: "#F6E8DF",
			},
			orange: {
				main: "#FEAE96",
			},
		},
	});
	return (
		<>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
			</ThemeProvider>
		</>
	);
}

export default App;
