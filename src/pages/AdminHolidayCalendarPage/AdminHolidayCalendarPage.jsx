import HolidayCalendarList from '../../components/HolidayCalendarList/HolidayCalendarList';
import { useRedirectAdmin } from '../../hooks/useRedirectHoook';

const AdminHolidayCalendarPage = () => {
	let { statusAdmin } = useRedirectAdmin();

	return (
		<>
			{statusAdmin && (
				<div>
					<h1>Налаштування календаря свят</h1>
					<div className="row">
						<HolidayCalendarList />
					</div>
				</div>
			)}
		</>
	);
};

export default AdminHolidayCalendarPage;
