/* eslint-disable react/prop-types */
import { useFormContext, get, Controller } from "react-hook-form";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
// import moment from "moment";

export default function TimePickerField({
	name,
	required,
	showErrMsg,
	errMsg,
	label,
}) {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const error = get(errors, name);
	return (
		<Controller
			name={name}
			control={control}
			rules={{ required: required ? "This field is required" : false }}
			render={({ field: { onChange } }) => (
				<MobileTimePicker
					label={label}
					onChange={onChange}
					// minTime={moment().format("HH:mm:ss")}
					error={Boolean(showErrMsg && error)}
					slotProps={{
						textField: {
							helperText: showErrMsg && error ? error.message || errMsg : "",
						},
					}}
				/>
			)}
		/>
	);
}

export function DatePickerField({ name, required, showErrMsg, errMsg, label }) {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const error = get(errors, name);
	return (
		<Controller
			name={name}
			control={control}
			rules={{ required: required ? "This field is required" : false }}
			render={({ field: { onChange } }) => (
				<MobileDatePicker
					label={label}
					onChange={onChange}
					disableOpenPicker={false}
					// minDate={moment().format("DD/MM/YYYY")}
					error={Boolean(showErrMsg && error)}
					slotProps={{
						textField: {
							helperText: showErrMsg && error ? error.message || errMsg : "",
						},
					}}
				/>
			)}
		/>
	);
}
