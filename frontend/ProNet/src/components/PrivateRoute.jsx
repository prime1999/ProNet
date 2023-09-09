import React from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	const { isLoggedIn, checkingStatus } = useAuthStatus();

	if (checkingStatus) {
		return <h3>Loading...</h3>;
	}
	return isLoggedIn ? <Outlet /> : <Navigate to="/home" />;
};

export default PrivateRoute;
