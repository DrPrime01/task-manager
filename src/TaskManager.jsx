import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";

import Navbar from "./components/Navbar";
import TaskApp from "./TaskApp";
import TaskModal from "./TaskModal";

export default function TaskManager() {
	const [checked, setChecked] = useState(false);
	const [openTaskModal, setOpenTaskModal] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editedTaskId, setEditedTaskId] = useState("");

	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	useEffect(() => {
		setChecked(prefersDark);
	}, [prefersDark]);

	const defaultTasks = [
		{
			id: 1,
			name: "Task One",
			desc: "The beginning of tasks",
			deadline: new Date(),
			status: "Ongoing",
		},
	];

	const [tasks, setTasks] = useState(defaultTasks);

	const editTask = (id) => {
		setIsEditing(true);
		setEditedTaskId(id);
	};

	const deleteTask = (id) => {
		const updatedTask = tasks?.filter((task) => task?.id !== id);
		setTasks(updatedTask);
	};

	const addTask = (newTask) => {
		setOpenTaskModal(true);
		setTasks((prevTasks) => {
			[...prevTasks, { id: prevTasks?.length + 1, ...newTask }];
		});
	};

	const onSubmitTask = async (data) => {
		if (isEditing && editedTaskId) {
			setTasks((prevTasks) =>
				prevTasks?.map((prevTask) =>
					prevTask?.id === editedTaskId
						? { id: editedTaskId, ...data }
						: prevTask
				)
			);
			setIsEditing(false);
		} else addTask(data);
	};

	return (
		<div
			className={`min-h-screen transition duration-300 ${
				checked ? "bg-slate-900" : ""
			}`}
		>
			<div
				className={`min-h-screen max-w-screen-md mx-auto px-6 flex flex-col gap-y-8 relative`}
			>
				<Navbar checked={checked} setChecked={setChecked} darkmode={checked} />
				<TaskApp
					tasks={tasks}
					darkmode={checked}
					handleEdit={editTask}
					handleDelete={deleteTask}
				/>
				<div className="absolute right-0 bottom-10">
					<button
						className={`transition duration-300 rounded-full shadow-lg h-10 w-10 bg-slate-900 ${
							checked ? "bg-[#94a3b8]" : ""
						}`}
						onClick={addTask}
					>
						<AddIcon
							sx={{
								color: checked ? "#0f172a" : "#94a3b8",
								transition: "color",
								transitionDuration: 300,
							}}
						/>
					</button>
				</div>
			</div>
			<TaskModal
				openModal={openTaskModal}
				closeModal={() => setOpenTaskModal(false)}
				isEditing={isEditing}
				onSubmit={onSubmitTask}
			/>
		</div>
	);
}
