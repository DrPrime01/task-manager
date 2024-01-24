import { BrowserRouter } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AllRoutes from "./Routes";
import AuthProvider from "./context/Auth";
import DarkmodeProvider from "./context/Darkmode";

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DarkmodeProvider>
				<AuthProvider>
					<BrowserRouter>
						<AllRoutes />
						<ToastContainer />
					</BrowserRouter>
				</AuthProvider>
			</DarkmodeProvider>
		</LocalizationProvider>
	);
}

export default App;
