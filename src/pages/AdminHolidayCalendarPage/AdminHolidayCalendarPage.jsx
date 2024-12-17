import HolidayCalendarList from '../../components/HolidayCalendarList/HolidayCalendarList';
import { useScrollToTop } from '../../hooks/scrollToTop';
import { useRedirectAdmin } from '../../hooks/useRedirectHoook';

const AdminHolidayCalendarPage = () => {
	let { statusAdmin } = useRedirectAdmin();

	useScrollToTop();

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
