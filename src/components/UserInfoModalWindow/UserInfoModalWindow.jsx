import { useEffect, useState } from 'react';
import ModalWidnow from '../UI/ModalWidnow/ModalWidnow';
import Loader from '../UI/Loader/Loader';
import s from './UserInfoModalWindow.module.css';
import { getPhotoUser, getUserById } from '../../api/graph';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';

const UserInfoModalWindow = ({ userId, visibleStatus, closeModal }) => {
	const { instance, accounts } = useMsal();
	let [userData, setUserData] = useState(false);
	let [userImg, setUserImg] = useState('');
	let [isFetching, setIsFetching] = useState(false);

	function RequestUsersData(id) {
		setIsFetching(true);
		instance
			.acquireTokenSilent({
				scopes: ['User.Read.All'],
				account: accounts[0],
			})
			.then((response) => {
				getUserById(response.accessToken, id)
					.then((response) => response.json())
					.then((result) => {
						setIsFetching(false);
						setUserData(result);
						console.log(result);
					})
					.catch((rerror) => {
						setIsFetching(false);
					});
			});

		setTimeout(() => {
			setIsFetching(false);
		}, 12000);
	}

	function RequestProfilePhoto(id) {
		return instance
			.acquireTokenSilent({
				...loginRequest,
				account: accounts[0],
			})
			.then((response) => {
				return getPhotoUser(response.accessToken, id)
					.then((response) => {
						if (response) {
							return response.blob();
						} else {
							return '';
						}
					})
					.then((result) => {
						const url = window.URL || window.webkitURL;
						const blobUrl = url.createObjectURL(result);

						if (result.type === 'application/json') {
							return '';
						}

						setUserImg(blobUrl);
					})
					.catch((error) => console.log(error));
			});
	}

	useEffect(() => {
		console.log(userId);
		RequestUsersData(userId);
		RequestProfilePhoto(userId);
	}, [userId]);

	return (
		<>
			{visibleStatus && (
				<ModalWidnow closeModal={closeModal}>
					{isFetching ? (
						<Loader />
					) : (
						<>
							{userData && (
								<div className={s.info_container}>
									<div className={s.user_row}>
										<img className={s.user_img} src={userImg} alt="" />
										<div>
											<p className={s.user_title}>{userData.displayName}</p>
											<p className={s.user_job}>{userData.jobTitle}</p>
										</div>
									</div>
								</div>
							)}
						</>
					)}
				</ModalWidnow>
			)}
		</>
	);
};

export default UserInfoModalWindow;
