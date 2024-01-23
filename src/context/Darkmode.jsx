/* eslint-disable react/prop-types */
import { useState, createContext } from "react";

export const DarkmodeContext = createContext();

export default function DarkmodeProvider({ children }) {
	const [checked, setChecked] = useState(false);
	return (
		<DarkmodeContext.Provider value={{ checked, setChecked }}>
			{children}
		</DarkmodeContext.Provider>
	);
}
