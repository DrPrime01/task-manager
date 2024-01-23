/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { signOut } from "firebase/auth";

import { MaterialUISwitch } from "./CustomizedSwitch";
import { auth } from "../firebaseSetup/firebase";
import { AuthContext } from "../context/Auth";

export default function Navbar({ checked, setChecked, darkmode }) {
	const { setToken, setUserId, setIsLoggedIn, isLoggedin } =
		useContext(AuthContext);
	const navigate = useNavigate();
	const handleLogout = async () => {
		await signOut(auth);
		setToken("");
		setUserId("");
		setIsLoggedIn(false);
	};
	return (
		<nav className="py-2 flex items-center justify-between">
			<span
				className={`text-2xl transition duration-300 font-semibold ${
					darkmode ? "text-white" : ""
				}`}
			>
				Task Manager
			</span>
			<div className="flex items-center gap-x-3">
				<MaterialUISwitch
					sx={{ m: 1 }}
					checked={checked}
					onChange={(e) => setChecked(e.target.checked)}
				/>
				{isLoggedin ? (
					<Button variant="contained" onClick={handleLogout}>
						Logout
					</Button>
				) : (
					<Button variant="contained" onClick={() => navigate("/login")}>
						Login
					</Button>
				)}
			</div>
		</nav>
	);
}
