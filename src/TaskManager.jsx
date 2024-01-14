/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";

import Navbar from "./components/Navbar";
import TaskApp from "./TaskApp";
import TaskModal from "./TaskModal";
import { setStatus } from "./utils";

export default function TaskManager() {
	const [checked, setChecked] = useState(false);
	const [openTaskModal, setOpenTaskModal] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editedTaskId, setEditedTaskId] = useState("");
	const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	useEffect(() => {
		setChecked(prefersDark);
	}, [prefersDark]);

	const methods = useForm({
		mode: "all",
		defaultValues: {
			taskName: "",
			desc: "",
			date: "",
			time: "",
		},
	});

	const defaultTasks = [
		{
			id: 1,
			taskName: "Task One",
			desc: "The beginning of tasks",
			deadline: new Date(),
			status: "Ongoing",
			completed: false,
		},
	];

	const [tasks, dispatch] = useReducer(reducer, defaultTasks);

	function reducer(state, action) {
		switch (action.type) {
			case "TOGGLE": {
				return state.map((task) => {
					const dateTime = { ...task?.date, ...task?.time };
					return task.id === action.payload.id
						? {
								...task,
								completed: !task?.completed,
								status: setStatus(dateTime?.$d, task.completed),
						  }
						: task;
				});
			}
			case "DELETE": {
				return state.filter((task) => task?.id !== action.payload.id);
			}
			case "UPDATE": {
				return state.map((prevTask) =>
					prevTask?.id === action.payload.id
						? {
								id: editedTaskId,
								deadline: action.payload.dateTime?.$d,
								completed: false,
								status: setStatus(action.payload.dateTime?.$d),
								...action.payload.data,
						  }
						: prevTask
				);
			}
			case "ADD": {
				return [
					...state,
					{
						id: state?.length + 1,
						deadline: action.payload.dateTime?.$d,
						completed: false,
						status: setStatus(action.payload.dateTime?.$d),
						...action.payload.data,
					},
				];
			}
			case "UPDATETASKSTATUS":
				{
					const updatedTask = state.find(
						(task) => task.id === action.payload.id
					);
					if (updatedTask) {
						return state.map((task) => {
							const dateTime = { ...task?.date, ...task?.time };
							return task.id === action.payload.id
								? {
										...task,
										status: setStatus(dateTime?.$d, updatedTask?.completed),
								  }
								: task;
						});
					}
				}
				break;
			default:
				return state;
		}
	}

	useEffect(() => {}, []);

	const toggleCompleted = (id) => {
		dispatch({ type: "TOGGLE", payload: { id } });
		dispatch({ type: "UPDATETASKSTATUS", payload: { id } });
	};
	const deleteTask = (id) => dispatch({ type: "DELETE", payload: { id } });

	const editTask = (id) => {
		setIsEditing(true);
		setEditedTaskId(id);
		setOpenTaskModal(true);
	};

	useEffect(() => {
		const editedData = tasks?.find((task) => task?.id === editedTaskId);
		console.log(editedData);
		if (editedData) {
			methods.reset({
				taskName: editedData?.taskName || "",
				desc: editedData?.desc || "",
				date: editedData?.date || "",
				time: editedData?.time || "",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEditing]);

	const onSubmitTask = async (data) => {
		setIsSubmitSuccessful(false);
		const dateTime = { ...data?.date, ...data?.time };
		if (isEditing && editedTaskId) {
			await dispatch({
				type: "UPDATE",
				payload: { id: editedTaskId, dateTime, data },
			});
			setIsEditing(false);
			setIsSubmitSuccessful(true);
			setOpenTaskModal(false);
		} else {
			await dispatch({
				type: "ADD",
				payload: {
					dateTime,
					data,
				},
			});
			setIsSubmitSuccessful(true);
			setOpenTaskModal(false);
		}
	};

	useEffect(() => {
		methods.reset({ taskName: "", desc: "", date: "", time: "" });
		console.log("reset");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSubmitSuccessful]);
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
					markAsCompleted={toggleCompleted}
				/>
				<div className="absolute right-0 bottom-10">
					<button
						className={`transition duration-300 bg-opacity-30 hover:bg-opacity-100 rounded-full shadow-lg h-10 w-10 bg-slate-900 ${
							checked ? "bg-[#94a3b8]" : ""
						}`}
						onClick={() => setOpenTaskModal(true)}
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
				closeModal={() => {
					if (isEditing) {
						setIsEditing(false);
					}
					setOpenTaskModal(false);
				}}
				isEditing={isEditing}
				onSubmit={onSubmitTask}
			/>
		</div>
	);
}
