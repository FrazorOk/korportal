import s from './EventSection.module.css';
import calendarIcon from '../../../assets/img/icons/calendar-icon.svg';
import { memo, useEffect, useState } from 'react';
import { getNews } from '../../../api/api';
import { dateConverterFromYMD } from '../../../helpers/dateConverter';
import { getNewsList } from '../../../api/apiNews';

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

const EventSection = () => {
	let [data, setData] = useState(null);
	let [formatedData, setFormatedData] = useState(null);

	useEffect(() => {
		// getNews(setData, 1, 2);
		getNewsList({ limitNumber: 4, all: 1, categoryID: 2 }).then((result) => setData(result));
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
		<>
			{data && (
				<div className={s.events}>
					{formatedData &&
						formatedData.length > 0 &&
						formatedData.map((eventDate, index) => {
							if (eventDate && index < 4) {
								return (
									<div className={s.events_item}>
										<p>{eventDate.title}</p>
										<div className={s.events_bottom}>
											<div className={s.events_date_row}>
												<p>
													{dateConverterFromYMD(eventDate.pub_date).day} <span> {dateConverterFromYMD(eventDate.pub_date).month}</span>
												</p>
												<a
													title={'Додати до календаря'}
													target="_blank"
													href={`https://outlook.office.com/calendar/action/compose?allday=true&body=${encodeURI(eventDate.title)}&enddt=${
														eventDate.dateForCalendar.after
													}T24%3A00%3A00%2B00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${
														eventDate.dateForCalendar.befor
													}T24%3A00%3A00%2B00%3A00&subject=${encodeURI(eventDate.title)}`}>
													<img src={calendarIcon} alt="" />
												</a>
											</div>

											{/* <a href="#" className={s.events_link}>
												Усі
											</a> */}
										</div>

										<span className={s.figures}></span>
									</div>
								);
							}
						})}
				</div>
			)}
		</>
	);
};

export default memo(EventSection);
