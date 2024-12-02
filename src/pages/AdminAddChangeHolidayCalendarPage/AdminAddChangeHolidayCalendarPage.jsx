import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import AdminHolidaysFormSection from './AdminHolidaysFormSection/AdminHolidaysFormSection';

const AdminAddChangeHolidayCalendarPage = () => {
	let { Id } = useParams();
   let [data, setData] = useState({});
   

	useEffect(() => {
		if (Id) {
			console.log(Id);
		}
	}, [Id]);

	return (
		<div>
			{Id ? <h1>Редагування святкову дату</h1> : <h1>Створення нової святкової дати</h1>}
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
	);
};

export default AdminAddChangeHolidayCalendarPage;
