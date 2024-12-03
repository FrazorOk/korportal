import s from './HolidayCalendarItem.module.css';
import calendarIcon from '../../assets/img/icons/calendar-icon.svg';
import editIcon from '../../assets/img/icons/pencil-icon.svg';
import { Link } from 'react-router-dom';
import { dateConverterFromYMD } from '../../helpers/dateConverter';

const HolidayCalendarItem = ({ data, adminStatus, allLink, color }) => {
	return (
		<div style={{ backgroundColor: `${color}` }} className={s.events_item}>
			<p>{data.title}</p>
			<div className={s.events_bottom}>
				{adminStatus && (
					<Link className={s.edit_btn} to={`./add-change-holiday-calendar/${data.id}`}>
						<img src={editIcon} />
					</Link>
				)}
				<div className={s.events_date_row}>
					<p>
						{dateConverterFromYMD(data.pub_date).day} <span> {dateConverterFromYMD(data.pub_date).month}</span>
					</p>
					<a
						title={'Додати до календаря'}
						target="_blank"
						href={`https://outlook.office.com/calendar/action/compose?allday=true&body=${encodeURI(data.title)}&enddt=${
							data.dateForCalendar.after
						}T24%3A00%3A00%2B00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${
							data.dateForCalendar.befor
						}T24%3A00%3A00%2B00%3A00&subject=${encodeURI(data.title)}`}>
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
