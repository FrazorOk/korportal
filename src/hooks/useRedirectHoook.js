import { useSelector } from 'react-redux';
import { userSelector } from '../selectors/userSelectors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export let useRedirectAdmin = () => {
	let [statusAdmin, setStatusAdmin] = useState(false);

	let adminStatus = useSelector(userSelector.userAdminStatus);
	let navigate = useNavigate();

	useEffect(() => {
		if (adminStatus === 'isAdmin') {
			setStatusAdmin(true);
		}
		if (adminStatus === 'notAdmin') {
			navigate('/error');
		}
	}, [adminStatus]);

	return { statusAdmin };
};
