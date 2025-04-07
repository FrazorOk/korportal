import { useRedirectDevs } from '../../hooks/useRedirectHook';
import LogsListSection from './LogsListSection/LogsListSection';

const LogsPage = () => {
	let { statusDev } = useRedirectDevs(true);

	return (
		<>
			{statusDev && (
				<div>
					<h1>Журнал запитів</h1>

					<div className="row">
						<LogsListSection />
					</div>
				</div>
			)}
		</>
	);
};

export default LogsPage;
