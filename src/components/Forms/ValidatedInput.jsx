/* eslint-disable react/prop-types */
import { useFormContext, get } from "react-hook-form";
import TextField from "@mui/material/TextField";

export default function ValidatedInput({
	name,
	label,
	required,
	errMsg,
	type,
	rules,
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
				{...register(name, {
					required: required ? "This field is required" : false,
					...rules,
				})}
				type={type || "text"}
				error={Boolean(showErrMsg && error)}
				helperText={showErrMsg && error ? error.message || errMsg : ""}
			/>
		</div>
	);
}
