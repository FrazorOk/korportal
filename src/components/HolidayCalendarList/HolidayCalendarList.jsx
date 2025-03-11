import { useEffect, useState } from 'react';
import HolidayCalendarItem from '../HolidayCalendarItem/HolidayCalendarItem';
import AddEventButton from '../UI/AddEventButton/AddEventButton';
import s from './HolidayCalendarList.module.css';
import { getNews } from '../../api/api';

const dateToYMD = (date, year) => {
	let d = date.getDate();
	let m = date.getMonth() + 1;
	return new Date('' + year + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d));
};
const dateToYMDArray = (date, year) => {
	let d = date.slice(8, 10);
	let m = date.slice(5, 7);
	return new Date('' + year + '-' + m + '-' + d);
};

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let colors = ['#004795', '#6589b8', '#b87f8f', '#8a6098', '#5da15d'];

const HolidayCalendarList = () => {
	let [data, setData] = useState(null);
	let [formatedData, setFormatedData] = useState(null);

	useEffect(() => {
		getNews(setData, 1, 2);
	}, []);
	useEffect(() => {
		if (data && data.length > 1) {
			// Константи для дат
			let year = new Date().getFullYear();
			let nulledDay = new Date(`${year}-01-01`);
			let today = new Date(); // сегодня

			// Створення індексу сортування та дат (для додавання у календар)
			let filteredArrayFromNull = data.filter((item) => item && true);

			let filteredArray = filteredArrayFromNull.map((item) => {
				if (item) {
					// днів до сьогодні
					let daysToday = Math.ceil(Math.abs(dateToYMD(today, year).getTime() - nulledDay.getTime()) / (1000 * 3600 * 24));
					let allDaysInYear = Math.ceil(Math.abs(new Date(`${year}-12-31`).getTime() - nulledDay.getTime()) / (1000 * 3600 * 24));
					let daysA = Math.ceil(Math.abs(dateToYMDArray(item.pub_date, year).getTime() - nulledDay.getTime()) / (1000 * 3600 * 24));

					// date for calendar ms
					const dayMilliseconds = 24 * 60 * 60 * 1000;

					if (daysA - daysToday < 0) {
						// date for calendar ms
						let dateInSeconds = dateToYMDArray(item.pub_date, year * 1 + 1).setTime(
							dateToYMDArray(item.pub_date, year * 1 + 1).getTime() - dayMilliseconds
						);

						let dateForCalendarBefor = encodeURI(new Date(dateInSeconds).toISOString()).slice(0, 10);
						let dateForCalendarAfter = encodeURI(dateToYMDArray(item.pub_date, year * 1 + 1).toISOString()).slice(0, 10);

						return {
							...item,
							index: allDaysInYear + 1 + daysA - daysToday,
							dateForCalendar: { befor: dateForCalendarBefor, after: dateForCalendarAfter },
						};
					}

					// date for calendar ms
					let dateInSeconds = dateToYMDArray(item.pub_date, year).setTime(dateToYMDArray(item.pub_date, year).getTime() - dayMilliseconds);

					let dateForCalendarBefor = encodeURI(new Date(dateInSeconds).toISOString()).slice(0, 10);
					let dateForCalendarAfter = encodeURI(dateToYMDArray(item.pub_date, year).toISOString()).slice(0, 10);

					return {
						...item,
						index: daysA - daysToday,
						dateForCalendar: { befor: dateForCalendarBefor, after: dateForCalendarAfter },
					};
				} else {
					return null;
				}
			});

			filteredArray.sort((a, b) => a.index - b.index);

			setFormatedData(filteredArray);
		}
	}, [data]);

	return (
		<div className={s.list}>
			<div title="Створити нову святкову дату" className={s.add_button}>
				<AddEventButton path={'add-change-holiday-calendar'} />
			</div>
			{formatedData &&
				formatedData.length > 0 &&
				formatedData.map((eventDate, index) => {
					let step = (index * 1) / colors.length;

					if (eventDate) {
						return (
							<HolidayCalendarItem
								data={eventDate}
								adminStatus={true}
								allLink={false}
								color={index == 0 ? colors[0] : colors[index * 1 - Math.floor(step) * colors.length]}
							/>
						);
					}
				})}
		</div>
	);
};

export default HolidayCalendarList;
