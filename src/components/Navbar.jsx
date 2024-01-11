/* eslint-disable react/prop-types */
import { MaterialUISwitch } from "./CustomizedSwitch";

export default function Navbar({ checked, setChecked, darkmode }) {
	return (
		<nav className="py-2 flex items-center justify-between">
			<span
				className={`text-2xl transition duration-300 font-semibold ${
					darkmode ? "text-white" : ""
				}`}
			>
				Task Manager
			</span>
			<MaterialUISwitch
				sx={{ m: 1 }}
				checked={checked}
				onChange={(e) => setChecked(e.target.checked)}
			/>
		</nav>
	);
}
