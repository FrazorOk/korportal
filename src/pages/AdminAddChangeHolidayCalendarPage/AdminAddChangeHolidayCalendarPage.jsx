import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import AdminHolidaysFormSection from './AdminHolidaysFormSection/AdminHolidaysFormSection';
import { getHolidayFromID } from '../../api/api';
import { useRedirectAdmin } from '../../hooks/useRedirectHook';
import { useScrollToTop } from '../../hooks/scrollToTop';

const AdminAddChangeHolidayCalendarPage = () => {
	let { statusAdmin } = useRedirectAdmin();
	let { Id } = useParams();
	let [data, setData] = useState({});

	useScrollToTop();
	useEffect(() => {
		if (Id && statusAdmin) {
			let getNews = async () => {
				let result = await getHolidayFromID(Id, 2);
				setData(result[0]);
			};
			getNews();
		}
	}, [Id, statusAdmin]);

	return (
		<>
			{statusAdmin && (
				<div>
					{Id ? <h1>Редагування святкової дати</h1> : <h1>Створення нової святкової дати</h1>}
					<div style={{ marginTop: '30px' }}>
						<Link style={{ display: 'flex', gap: '4px', alignItems: 'center', width: 'fit-content' }} to="/admin-holiday-calendar/">
							<img style={{ transform: 'rotate(90deg)' }} src={arrowIcon} alt="" />
							<p style={{ color: '#7d7d7d' }}>Повернутися</p>
						</Link>
					</div>
					<div className="row">
						<div className="column-50">
							<AdminHolidaysFormSection Id={Id} data={data} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AdminAddChangeHolidayCalendarPage;
