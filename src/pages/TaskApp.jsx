/* eslint-disable react/prop-types */
import EachTask from "../components/EachTask";

export default function TaskApp({
	tasks,
	handleDelete,
	handleEdit,
	darkmode,
	markAsCompleted,
}) {
	return (
		<div className="flex flex-col gap-y-5">
			{tasks?.map((task) => (
				<EachTask
					key={task?.id}
					id={task?.id}
					taskName={task?.taskName}
					desc={task?.desc}
					deadline={task?.deadline}
					completed={task?.completed}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					darkmode={darkmode}
					markAsCompleted={markAsCompleted}
				/>
			))}
		</div>
	);
}
