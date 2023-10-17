import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterUser from "./pages/Authorization/RegisterUser";
import LogIn from "./pages/Authorization/LogIn";
import Home from "./pages/LandingPage/Home";
import RootLayout from "./Layouts/RootLayout/RootLayout";
import Profile from "./pages/profile/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/NewFeed/Dashboard";
import JobDashboard from "./pages/jobs/JobDashboard";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{/* // ------------------------- route for the app --------------------------- */}
			<Route path="/" element={<RootLayout />}>
				<Route path="/" element={<PrivateRoute />}>
					<Route index element={<Dashboard />} />
					<Route path="/profile" element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
					</Route>
					<Route path="/jobs" element={<PrivateRoute />}>
						<Route path="/jobs" element={<JobDashboard />} />
					</Route>
				</Route>
			</Route>
			{/* // route for the landing page */}
			<Route path="/home" element={<Home />} />
			{/* // -------------------------- for authrorization --------------------- // */}
			{/* // route for register users page */}
			<Route path="/register" element={<RegisterUser />} />
			{/* // route for register users page */}
			<Route path="/login" element={<LogIn />} />
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
