import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import MenuBarLoader from "../../components/miscellaneous/skeletons/MenuBarLoader";

const MenuBar = lazy(() => import("./MenuBar"));

const RootLayout = () => {
	return (
		<div>
			<Suspense fallback={<MenuBarLoader />}>
				<MenuBar />
			</Suspense>
			<div className="">
				<Outlet />
			</div>
		</div>
	);
};

export default RootLayout;
