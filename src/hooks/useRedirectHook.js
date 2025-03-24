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

export let useRedirectDevs = (redirectStatus) => {
	const devsID = ['dba91e41-d7cf-4b9e-bcc8-b1202822bbb7', '34655084-81b7-48d1-8393-c82ff3841d06', 'a2241277-148b-4e7f-b749-8e8cd7750ee6'];
	let [statusDev, setStatusDev] = useState(false);

	let userID = useSelector(userSelector.userData);
	let navigate = useNavigate();

	const findDevIds = (array) => {
		let findResult = array.find((itemID) => itemID === userID.id);

		if (findResult) {
			return true;
		} else {
			return false;
		}
	};

	useEffect(() => {
		if (userID.id) {
			let devStatus = findDevIds(devsID);

			if (devStatus) {
				setStatusDev(true);
			} else {
				redirectStatus && navigate('/error');
				!redirectStatus && setStatusDev(false);
			}
		}
	}, [userID]);

	return { statusDev };
};
