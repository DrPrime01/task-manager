/* eslint-disable react/prop-types */
import { useForm, FormProvider } from "react-hook-form";
import Button from "@mui/material/Button";

import Modal from "./components/Modals";
import ValidatedInput from "./components/Forms/ValidatedInput";
import ValidatedTextArea from "./components/Forms/ValidatedTextArea";
import TimePickerField, {
	DatePickerField,
} from "./components/Forms/DateTimePicker";

export default function TaskModal({
	openModal,
	closeModal,
	isEditing,
	onSubmit,
}) {
	const methods = useForm({
		mode: "all",
	});

	return (
		<Modal
			openModal={openModal}
			closeModal={closeModal}
			isEditing={isEditing}
			title={isEditing ? "Edit Task" : "Add Modal"}
		>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className="flex flex-col gap-y-4"
				>
					<ValidatedInput name="taskName" label="Task" required />
					<ValidatedTextArea name="desc" label="Description" required={false} />
					<DatePickerField name="date" label="Date" required />
					<TimePickerField name="time" label="Time" required />
					<Button variant="contained" type="submit">
						{isEditing ? "Update" : "Add task"}
					</Button>
				</form>
			</FormProvider>
		</Modal>
	);
}
