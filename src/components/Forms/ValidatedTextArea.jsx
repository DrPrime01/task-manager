/* eslint-disable react/prop-types */
import { useFormContext, get } from "react-hook-form";
import TextField from "@mui/material/TextField";

export default function ValidatedTextArea({
	name,
	required,
	label,
	errMsg,
	showErrMsg = true,
}) {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const error = get(errors, name);

	return (
		<div className="w-full">
			<TextField
				label={label}
				fullWidth
				variant="outlined"
				multiline
				rows={4}
				{...register(name, {
					required: required ? "This field is required" : false,
				})}
				error={Boolean(showErrMsg && error)}
				helperText={showErrMsg && error ? error.message || errMsg : ""}
			/>
		</div>
	);
}
