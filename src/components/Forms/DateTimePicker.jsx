import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function TimePickerField() {
	return <TimePicker />;
}

export function DatePickerField() {
	return <MobileDatePicker />;
}
