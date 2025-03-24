import { useEffect, useState } from 'react';
import s from './LogsListSection.module.css';
import { getLogs } from '../../../api/api';

const LogsListSection = () => {
	let [isLogs, setLogs] = useState([]);

	const fetchingLogs = async () => {
		let result = await getLogs();
		setLogs(result);
	};

	useEffect(() => {
		fetchingLogs();
	}, []);

	return (
		<div className="section-container" style={{ width: '100%', paddingTop: '25px' }}>
			<ul className={s.logs_list}>
				<li className={s.logs_item}>
					<p>
						<b>Id</b>
					</p>
					<p>
						<b>Date</b>
					</p>
					<p style={{ textAlign: 'center' }}>
						<b>Action</b>
					</p>
				</li>
				{isLogs && isLogs.length > 0 ? (
					isLogs.map(
						(log) =>
							log && (
								<li className={s.logs_item}>
									<p>{log.id}</p>
									<p>{log.cdate}</p>
									<p>{log.action}</p>
								</li>
							)
					)
				) : (
					<p>Немає запитів</p>
				)}
			</ul>
		</div>
	);
};

export default LogsListSection;
