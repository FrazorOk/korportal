import winterImg from '../assets/img/winter.jpg';
import springImg from '../assets/img/spring.jpg';
import summerImg from '../assets/img/summer.jpg';
import autumnImg from '../assets/img/osin.jpg';

const days = ['нд.', 'пн.', 'вт.', 'ср.', 'чт.', 'пт.', 'сб.'];
const uaMonths = [
	'січня',
	'лютого',
	'березня',
	'квітня',
	'травня',
	'червня',
	'липня',
	'серпня',
	'вересня',
	'жовтня',
	'листопада',
	'грудня',
];
const uaMonthsSliced = ['січ.', 'лют.', 'берез.', 'квіт.', 'трав.', 'черв.', 'лип.', 'серп.', 'верес.', 'жовт.', 'лист.', 'груд.'];

export const dateConverter = (date) => {
	let day = date.slice(0, 2);
	let month = date.slice(3, 5) * 1;

	return `${day} ${uaMonthsSliced[month - 1]}`;
};
export const dateConverterFromYMD = (date) => {
	let day = date.slice(8, 10);
	let month = date.slice(5, 7) * 1;

	return { day: day, month: uaMonthsSliced[month - 1] };
};
export const monthFullConverter = (date) => {
	return uaMonths[date - 1];
};
export const weekDayConverter = (date) => {
	return days[date];
};
export const dayConverter = (date) => {
	if (date < 10) {
		return `0${date}`;
	}
	return date;
};
export const yearSeasonConverter = (month) => {
	if (month === 1 || month === 2 || month === 12) {
		return winterImg;
	}
	if (month === 3 || month === 4 || month === 5) {
		return springImg;
	}
	if (month === 6 || month === 7 || month === 8) {
		return summerImg;
	}
	if (month === 9 || month === 10 || month === 11) {
		return autumnImg;
	}
};
