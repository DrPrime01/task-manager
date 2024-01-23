/* eslint-disable react/prop-types */
import { useState, createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [isLoggedin, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState("");
	const [userId, setUserId] = useState("");
	return (
		<AuthContext.Provider
			value={{ isLoggedin, setIsLoggedIn, token, setToken, userId, setUserId }}
		>
			{children}
		</AuthContext.Provider>
	);
}
