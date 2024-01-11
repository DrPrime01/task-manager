import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import TaskManager from "./TaskManager";

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<TaskManager />
		</LocalizationProvider>
	);
}

export default App;
