/* eslint-disable react/prop-types */
import EachTask from "./components/EachTask";

export default function TaskApp({ tasks, handleDelete, handleEdit, darkmode }) {
	return (
		<div className="flex flex-col gap-y-5">
			{tasks?.map((task) => (
				<EachTask
					key={task?.id}
					id={task?.id}
					name={task?.name}
					desc={task?.desc}
					deadline={task?.deadline}
					status={task?.status}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					darkmode={darkmode}
				/>
			))}
		</div>
	);
}
