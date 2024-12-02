import HolidayCalendarList from '../../components/HolidayCalendarList/HolidayCalendarList';
import s from './AdminHolidayCalendarPage.module.css';

const AdminHolidayCalendarPage = () => {
	return (
		<div>
			<h1>Налаштування календаря свят</h1>
			<div className="row">
				<HolidayCalendarList />
			</div>
		</div>
	);
};

export default AdminHolidayCalendarPage;
