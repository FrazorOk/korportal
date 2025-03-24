import s from './TodaySection.module.css';
import { memo, useEffect, useState } from 'react';
import { dayConverter, weekDayConverter, monthFullConverter, yearSeasonConverter } from '../../../helpers/dateConverter';

const TodaySection = () => {
	let [date, setDate] = useState({ day: '', month: '', dayWeekk: '' });

	useEffect(() => {
		let date = new Date();
		let day = date.getDate();
		let month = date.getMonth() + 1;
		let dayWeekk = date.getDay();

		setDate({
			day: dayConverter(day),
			month: monthFullConverter(month),
			dayWeekk: weekDayConverter(dayWeekk),
			img: yearSeasonConverter(month),
		});
	}, []);

	return (
		<div className={`${s.today_section} section-container`}>
			<img className={s.bg_img} src={date.img} alt="" />

			<div className={s.today_content}>
				<h3 style={{ color: 'white', padding: 0 }}>Сьогодні</h3>
				<h2>
					<b>{date.day}</b> <span>{date.dayWeekk}</span>
					<br />
					{date.month}
				</h2>
				<p>Гарного дня!</p>
			</div>
		</div>
	);
};

export default memo(TodaySection);
