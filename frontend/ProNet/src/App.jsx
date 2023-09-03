import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Explore from "./pages/LandingPage/explore";
import RegisterUser from "./pages/Authorization/RegisterUser";
import LogIn from "./pages/Authorization/LogIn";
import Dashoboard from "./pages/NewFeed/Dashoboard";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			// route for the landing page
			<Route path="/" element={<Explore />} />
			// -------------------------- for authrorization --------------------- //
			// route for register users page
			<Route path="/register" element={<RegisterUser />} />
			// route for register users page
			<Route path="/login" element={<LogIn />} />
			// route for register users pagedashboard
			<Route path="/dashboard" element={<Dashoboard />} />
		</>
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
			<ToastContainer />
		</>
	);
}

export default App;
