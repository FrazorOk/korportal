import s from './HolidayCalendarItem.module.css';
import calendarIcon from '../../assets/img/icons/calendar-icon.svg';
import editIcon from '../../assets/img/icons/pencil-icon.svg';
import { Link } from 'react-router-dom';

const HolidayCalendarItem = ({ adminStatus, allLink, color }) => {
	return (
		<div style={{ backgroundColor: `${color}` }} className={s.events_item}>
			<p>День Програміста</p>
			<div className={s.events_bottom}>
				{adminStatus && (
					<Link className={s.edit_btn} to={'/'}>
						<img src={editIcon} />
					</Link>
				)}
				<div className={s.events_date_row}>
					<p>
						13<span> жовт.</span>
					</p>
					<a href="#">
						<img src={calendarIcon} alt="" />
					</a>
				</div>

				{allLink && (
					<a href="#" className={s.events_link}>
						Усі
					</a>
				)}
			</div>

			<span className={s.figures}></span>
		</div>
	);
};

export default HolidayCalendarItem;
