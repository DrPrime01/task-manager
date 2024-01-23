import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import { DarkmodeContext } from "./context/Darkmode";

export default function SharedLayout() {
	const { checked, setChecked } = useContext(DarkmodeContext);
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	useEffect(() => {
		setChecked(prefersDark);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prefersDark]);
	return (
		<div
			className={`min-h-screen transition duration-300 ${
				checked ? "bg-slate-900" : ""
			}`}
		>
			<div
				className={`min-h-screen max-w-screen-md mx-auto px-6 flex flex-col gap-y-8 relative`}
			>
				<Navbar checked={checked} setChecked={setChecked} darkmode={checked} />
				<Outlet />
			</div>
		</div>
	);
}
