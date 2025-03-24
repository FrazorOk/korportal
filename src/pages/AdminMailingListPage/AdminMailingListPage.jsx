import { useRedirectDevs } from '../../hooks/useRedirectHook';
import AdminMailListFormSection from './AdminMailListFormSection/AdminMailListFormSection';
import TimeMailingSection from './TimeMailingSection/TimeMailingSection';

const AdminMailingListPage = () => {
	let { statusDev } = useRedirectDevs(true);

	return (
		<>
			{statusDev && (
				<div>
					<h1>Розсилка</h1>

					<div className="row">
						<TimeMailingSection />
					</div>

					<div className="row">
						<AdminMailListFormSection />
					</div>
				</div>
			)}
		</>
	);
};

export default AdminMailingListPage;
