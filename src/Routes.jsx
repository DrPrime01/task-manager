import { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import SharedLayout from "./SharedLayout";
import TaskManager from "./pages/TaskManager";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import { AuthContext } from "./context/Auth";

export default function AllRoutes() {
	const { isLoggedin } = useContext(AuthContext);
	const location = useLocation();

	return (
		<Routes>
			<Route path="/" element={<SharedLayout />}>
				<Route
					index
					element={
						isLoggedin ? (
							<TaskManager />
						) : (
							<Navigate to="/login" state={{ from: location }} />
						)
					}
				/>
				<Route path="signup" element={<Signup />} />
				<Route path="login" element={<Login />} />
			</Route>
		</Routes>
	);
}
