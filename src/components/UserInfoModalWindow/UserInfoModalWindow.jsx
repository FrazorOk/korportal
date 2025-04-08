import { useEffect, useState } from 'react';
import ModalWidnow from '../UI/ModalWidnow/ModalWidnow';
import Loader from '../UI/Loader/Loader';
import s from './UserInfoModalWindow.module.css';
import { getPhotoUser, getUserById } from '../../api/graph';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
import mailIcon from '../../assets/img/icons/mail-gray-icon-1.svg';
import commentIcon from '../../assets/img/icons/comment-gray-icon.svg';
import phoneIcon from '../../assets/img/icons/call-outgoing-icon.svg';
import cakeIcon from '../../assets/img/icons/cake-birthday-icon.svg';
import userIcon from '../../assets/img/icons/fi-rs-user.svg';
import chartIcon from '../../assets/img/icons/chart-tree-icon.svg';
import { monthFullConverter } from '../../helpers/dateConverter';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInformationModalWindowIdUser, toggleUserInformationModalWindowStatus } from '../../store/interfaceSlice';
import { interfaceSelector } from '../../selectors/interfaceSelectors';

const UserInfoModalWindow = () => {
	let dispatch = useDispatch();
	const { instance, accounts } = useMsal();

	let [userData, setUserData] = useState(false);
	let [userImg, setUserImg] = useState('');
	let [isFetching, setIsFetching] = useState(false);

	let visibleStatus = useSelector(interfaceSelector.userInformationModalWindowStatus);
	let userId = useSelector(interfaceSelector.userInformationModalWindowIdUser);

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
	function closeModal() {
		dispatch(toggleUserInformationModalWindowStatus(false));
		dispatch(setUserInformationModalWindowIdUser(null));
	}

	useEffect(() => {
		userId && RequestUsersData(userId);
		userId && RequestProfilePhoto(userId);
		return () => {
			setUserData(false);
			setUserImg('');
		};
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
											<p className={s.user_job}>{userData.department}</p>
										</div>
									</div>
									<div className={s.user_contacts}>
										<p className={s.contacts_title}>Контактні данні</p>
										<ul className={s.contacts_list}>
											<li className={s.contacts_item}>
												<a
													href={`mailto:${userData.userPrincipalName ? userData.userPrincipalName : ''}`}
													className={s.contacts_item_container}>
													<img src={mailIcon} alt="" />
													<div target="_blank" className={`${s.contacts_content}`}>
														<p>Електронна пошта</p>
														<p className={s.blue}>{userData.userPrincipalName ? userData.userPrincipalName : 'не вказано'}</p>
													</div>
												</a>
											</li>
											<li className={s.contacts_item}>
												<a
													className={s.contacts_item_container}
													href={`https://teams.microsoft.com/l/chat/0/0?users=${
														userData.userPrincipalName ? userData.userPrincipalName : ''
													}`}>
													<img src={commentIcon} alt="" />
													<div target="_blank" className={`${s.contacts_content}`}>
														<p>Чат</p>
														<p className={s.blue}>Teams</p>
													</div>
												</a>
											</li>
											<li className={s.contacts_item}>
												<a
													className={s.contacts_item_container}
													href={`tel:${userData.mobilePhone ? userData.mobilePhone.replace(/[^+\d]/g, '') : ''}`}>
													<img src={phoneIcon} alt="" />
													<div target="_blank" className={`${s.contacts_content}`}>
														<p>Мобільний</p>
														<p className={s.blue}>{userData.mobilePhone ? userData.mobilePhone : 'не вказано'}</p>
													</div>
												</a>
											</li>
											<li className={s.contacts_item}>
												<div className={s.contacts_item_container}>
													<img src={cakeIcon} alt="" />
													<div className={`${s.contacts_content}`}>
														<p>День народження</p>
														<p>
															{userData.onPremisesExtensionAttributes.extensionAttribute2
																? `${userData.onPremisesExtensionAttributes.extensionAttribute2.slice(0, 2)}
																 ${monthFullConverter(userData.onPremisesExtensionAttributes.extensionAttribute2.slice(3, 5))}`
																: 'не вказано'}
														</p>
													</div>
												</div>
											</li>
											<li className={s.contacts_item}>
												<div className={s.contacts_item_container}>
													<img src={userIcon} alt="" />
													<div className={`${s.contacts_content}`}>
														<p>День стажу</p>
														<p>
															{userData.onPremisesExtensionAttributes.extensionAttribute1
																? `${userData.onPremisesExtensionAttributes.extensionAttribute1.slice(0, 2)}
																 ${monthFullConverter(
																		userData.onPremisesExtensionAttributes.extensionAttribute1.slice(3, 5)
																	)} ${userData.onPremisesExtensionAttributes.extensionAttribute1.slice(6, 10)}`
																: 'не вказано'}
														</p>
													</div>
												</div>
											</li>
											<li className={s.contacts_item}>
												<div className={s.contacts_item_container}>
													<img src={chartIcon} alt="" />
													<div className={`${s.contacts_content}`}>
														<p>Відділ</p>
														<p>{userData.department ? userData.department : 'не вказано'}</p>
													</div>
												</div>
											</li>
										</ul>
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
