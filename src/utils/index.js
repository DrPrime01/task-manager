export function removeUnwanted(unwanted, data) {
	if (Array.isArray(unwanted)) {
		unwanted.forEach((unwantedField) => delete data[unwantedField]);
	} else delete data[unwanted];
	return data;
}
