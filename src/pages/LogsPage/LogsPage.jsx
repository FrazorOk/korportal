import { useState } from 'react';
import UserInfoModalWindow from '../../components/UserInfoModalWindow/UserInfoModalWindow';
import { useRedirectDevs } from '../../hooks/useRedirectHook';
import LogsListSection from './LogsListSection/LogsListSection';

const LogsPage = () => {
	let { statusDev } = useRedirectDevs(true);

	let [visibleStatus, setVisibleStatus] = useState(false);

	const visibleButtonOnClickHandler = () => {
		setVisibleStatus((status) => !status);
	};

	return (
		<>
			{statusDev && (
				<div>
					<h1>Журнал запитів</h1>

					<div className="row">
						<button onClick={visibleButtonOnClickHandler}>onClick</button>
						{visibleStatus && (
							<UserInfoModalWindow
								closeModal={visibleButtonOnClickHandler}
								visibleStatus={visibleStatus}
								userId={'dba91e41-d7cf-4b9e-bcc8-b1202822bbb7'}
							/>
						)}
					</div>

					<div className="row">
						<LogsListSection />
					</div>
				</div>
			)}
		</>
	);
};

export default LogsPage;
