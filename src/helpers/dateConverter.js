export const dateConverter = (date) => {
	let day = date.slice(0, 2);
	let month = date.slice(3, 5) * 1;

	const uaMonth = ['січ.', 'лют.', 'берез.', 'квіт.', 'трав.', 'черв.', 'лип.', 'серп.', 'верес.', 'жовт.', 'листоп.', 'груд.'];

	return `${day} ${uaMonth[month - 1]}`;
};
