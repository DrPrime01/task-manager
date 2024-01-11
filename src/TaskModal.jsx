/* eslint-disable react/prop-types */
import { useForm, FormProvider } from "react-hook-form";

import Modal from "./components/Modals";

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
				></form>
			</FormProvider>
		</Modal>
	);
}
