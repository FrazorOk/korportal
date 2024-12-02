import HolidayCalendarItem from '../HolidayCalendarItem/HolidayCalendarItem';
import AddEventButton from '../UI/AddEventButton/AddEventButton';
import s from './HolidayCalendarList.module.css';

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let colors = ['#6a5fff', '#07b3ee', '#5182fe', '#ff888a', '#5da15d'];

const HolidayCalendarList = () => {
	return (
		<div className={s.list}>
			<div title="Створити нову святкову дату" className={s.add_button}>
				<AddEventButton path={'add-change-holiday-calendar'} />
			</div>
			{array.map((item, index) => {
				let step = (index * 1) / colors.length;

				return (
					<HolidayCalendarItem
						adminStatus={true}
						allLink={false}
						color={index == 0 ? colors[0] : colors[index * 1 - Math.floor(step) * colors.length]}
					/>
				);
			})}
		</div>
	);
};

export default HolidayCalendarList;
