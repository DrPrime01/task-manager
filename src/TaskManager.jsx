/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect, useReducer } from "react";
import {
	collection,
	onSnapshot,
	addDoc,
	getDoc,
	Timestamp,
	doc,
	deleteDoc,
	updateDoc,
	query,
	serverTimestamp,
	orderBy,
} from "@firebase/firestore";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";

import Navbar from "./components/Navbar";
import TaskApp from "./TaskApp";
import TaskModal from "./TaskModal";
import { removeUnwanted } from "./utils";
import { firestore } from "./firebaseSetup/firebase";

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

	const tasksColRef = collection(firestore, "tasks");
	const q = query(tasksColRef, orderBy("createdAt", "desc"));

	function getTasks(dispatch) {
		return onSnapshot(q, (snapshot) => {
			const taskList = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			console.log(taskList);

			dispatch({ type: "ADDTASKSFROMDB", payload: { data: taskList } });
		});
	}

	const initialState = [];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const unsubscribe = getTasks(dispatch);
				return () => unsubscribe();
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [tasks, dispatch] = useReducer(reducer, initialState);

	function reducer(state, action) {
		switch (action.type) {
			case "ADDTASKSFROMDB": {
				return action.payload.data;
			}
			default:
				return state;
		}
	}

	const methods = useForm({
		mode: "all",
		defaultValues: {
			taskName: "",
			desc: "",
			date: "",
			time: "",
		},
	});

	const toggleCompleted = async (id) => {
		const docRef = doc(firestore, "tasks", id);

		try {
			const res = await getDoc(docRef);

			if (res.exists()) {
				const resData = res.data();
				const updatedCompleted = !resData.completed;

				await updateDoc(docRef, {
					completed: updatedCompleted,
				});
			} else {
				console.log("Document does not exist");
			}
		} catch (error) {
			console.error("Error toggling completed:", error);
		}
	};

	const deleteTask = async (id) => {
		const docRef = doc(firestore, "tasks", id);
		await deleteDoc(docRef);
	};

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
		const dateObject = new Date(dateTime?.$d);
		const timestamp = Timestamp.fromDate(dateObject);
		const originalObject = {
			deadline: timestamp,
			completed: false,
			createdAt: serverTimestamp(),
			...data,
		};
		const originalData = removeUnwanted(["date", "time"], originalObject);
		if (isEditing && editedTaskId) {
			const docRef = doc(firestore, "tasks", editedTaskId);
			updateDoc(docRef, { ...originalData });
			setIsEditing(false);
			setIsSubmitSuccessful(true);
			setOpenTaskModal(false);
		} else {
			await addDoc(tasksColRef, originalData);
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
							checked ? "bg-[#ddd]" : ""
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

// const defaultTasks = [
// 	{
// 		id: 1,
// 		taskName: "Task One",
// 		desc: "The beginning of tasks",
// 		deadline: new Date(),
// 		status: "Ongoing",
// 		completed: false,
// 	},
// ];
