export const setStatus = (deadline, completed = false) => {
	const currentTime = new Date();

	if (completed) {
		return "Completed";
	} else if (currentTime <= deadline) {
		return "Ongoing";
	} else if (currentTime > deadline) {
		return "Overdue";
	}
};
