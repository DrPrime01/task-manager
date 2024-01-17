import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import moment from "moment";

/* eslint-disable react/prop-types */
export default function EachTask({
	id,
	taskName,
	desc,
	deadline,
	handleDelete,
	handleEdit,
	darkmode,
	completed,
	markAsCompleted,
}) {
	const isDeadlinePassed = moment(new Date()) > moment(deadline.toDate());
	return (
		<div
			className={`border rounded-[10px] py-2 px-4 transition duration-300 flex justify-between h-[160px] w-full ${
				completed ? "bg-opacity-50" : ""
			} ${!darkmode && "bg-[#ddd]"}`}
		>
			<div className="flex flex-col justify-between">
				<div>
					<h3
						className={`text-2xl transition duration-300 font-semibold text-[#444444] ${
							completed ? "line-through" : ""
						} ${darkmode ? "text-slate-200" : ""} mb-3`}
					>
						{taskName || "Task Name"}
					</h3>
					<p
						className={`text-sm transition duration-300 text-medium text-[#aaa] truncate ${
							darkmode ? "text-[#94a3b8]" : ""
						}`}
					>
						{desc || "This is a new task"}
					</p>
				</div>
				<span
					className={`font-medium transition duration-300 text-[#444444] ${
						darkmode ? "text-slate-200" : ""
					} ${isDeadlinePassed ? "!text-red-500" : ""}`}
				>
					{moment(deadline.toDate()).format("DD/MM/YY, h:mm A")}
				</span>
			</div>
			<div className="flex flex-col justify-between text-end">
				<span
					className={`font-medium ${
						completed ? "text-green-500" : "text-blue-500"
					}`}
				>
					{completed ? "Completed" : "Ongoing"}
				</span>
				<div className="flex items-center gap-x-1">
					<IconButton onClick={() => markAsCompleted(id)}>
						<DoneAllIcon
							sx={{
								color: darkmode ? "#94a3b8" : "",
								transition: "color",
								transitionDuration: 300,
							}}
						/>
					</IconButton>
					<IconButton onClick={() => handleDelete(id)}>
						<DeleteIcon
							sx={{
								color: darkmode ? "#94a3b8" : "",
								transition: "color",
								transitionDuration: 300,
							}}
						/>
					</IconButton>
					<IconButton onClick={() => handleEdit(id)}>
						<EditIcon
							sx={{
								color: darkmode ? "#94a3b8" : "",
								transition: "color",
								transitionDuration: 300,
							}}
						/>
					</IconButton>
				</div>
			</div>
		</div>
	);
}
