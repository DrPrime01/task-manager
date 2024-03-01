/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect, useReducer, useContext } from "react";
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
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

import TaskApp from "./TaskApp";
import TaskModal from "./TaskModal";
import { removeUnwanted } from "../utils";
import { DarkmodeContext } from "../context/Darkmode";
import { AuthContext } from "./../context/Auth";
import {
	firestore,
	getTokenForPushNotifications,
} from "../firebaseSetup/firebase";

export default function TaskManager() {
	const [openTaskModal, setOpenTaskModal] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [deviceToken, setDeviceToken] = useState(null);
	const [editedTaskId, setEditedTaskId] = useState("");
	const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
	const { checked } = useContext(DarkmodeContext);
	const { userId } = useContext(AuthContext);

	useEffect(() => {
		async function getToken() {
			const token = await getTokenForPushNotifications();
			setDeviceToken(token);
			return;
		}

		getToken();
	}, []);
	console.log(deviceToken);
	const usersDocRef = doc(firestore, "users", userId);
	const tasksColRef = collection(usersDocRef, "tasks");
	const q = query(tasksColRef, orderBy("createdAt", "desc"));

	function getTasks(dispatch) {
		return onSnapshot(q, (snapshot) => {
			const taskList = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			// console.log(taskList);

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
		const usersDocRef = doc(firestore, "users", userId);
		const tasksColRef = collection(usersDocRef, "tasks");
		const docRef = doc(tasksColRef, id);

		try {
			const res = await getDoc(docRef);

			if (res.exists()) {
				const resData = res.data();
				const updatedCompleted = !resData.completed;

				await updateDoc(docRef, {
					completed: updatedCompleted,
				});

				if (updatedCompleted) toast("Task completed!");
				else toast("Task status updated!");
			} else {
				toast.error("Document does not exist");
			}
		} catch (error) {
			toast.error("Error toggling completed");
		}
	};

	const deleteTask = async (id) => {
		const usersDocRef = doc(firestore, "users", userId);
		const tasksColRef = collection(usersDocRef, "tasks");
		const docRef = doc(tasksColRef, id);
		try {
			await deleteDoc(docRef);
			toast("Task deleted!");
		} catch (err) {
			toast.error("Errow while deleting task");
		}
	};

	const editTask = (id) => {
		setIsEditing(true);
		setEditedTaskId(id);
		setOpenTaskModal(true);
	};

	useEffect(() => {
		const editedData = tasks?.find((task) => task?.id === editedTaskId);
		// console.log(editedData);
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
		const inputDate = moment(
			`${data?.date?.$D}/${data?.date?.$M + 1}/${data?.date?.$y}, ${
				data?.time?.$H
			}:${data?.time?.$m}`,
			"DD/MM/YYYY, HH:mm"
		);
		const timestamp = Timestamp.fromDate(inputDate?._d);
		const originalObject = {
			deadline: timestamp,
			completed: false,
			createdAt: serverTimestamp(),
			...data,
		};
		const originalData = removeUnwanted(["date", "time"], originalObject);
		try {
			if (isEditing && editedTaskId) {
				const usersDocRef = doc(firestore, "users", userId);
				const tasksColRef = collection(usersDocRef, "tasks");
				const docRef = doc(tasksColRef, editedTaskId);
				updateDoc(docRef, { ...originalData });
				setIsEditing(false);
				setIsSubmitSuccessful(true);
				toast("Task updated succesfully!");
				setOpenTaskModal(false);
			} else {
				await addDoc(tasksColRef, originalData);
				setIsSubmitSuccessful(true);
				toast("Task added successfully!");
				setOpenTaskModal(false);
			}
		} catch (err) {
			toast.error("Error while updating/adding task");
		}
	};

	useEffect(() => {
		methods.reset({ taskName: "", desc: "", date: "", time: "" });
		console.log("reset");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSubmitSuccessful]);
	return (
		<div className="relative min-h-[85vh]">
			<TaskApp
				tasks={tasks}
				darkmode={checked}
				handleEdit={editTask}
				handleDelete={deleteTask}
				markAsCompleted={toggleCompleted}
			/>
			<div className="absolute right-4 md:right-0 bottom-16 md:bottom-10">
				<button
					className={`transition duration-300 md:bg-opacity-30 hover:bg-opacity-100 rounded-full shadow-lg h-10 w-10 ${
						checked ? "bg-[#ddd]" : "bg-slate-900"
					}`}
					onClick={() => setOpenTaskModal(true)}
				>
					<AddIcon
						sx={{
							color: checked ? "#94a3b8" : "#0f172a",
							transition: "color",
							transitionDuration: 300,
							"&:hover": {
								color: "#94a3b8",
							},
						}}
					/>
				</button>
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
