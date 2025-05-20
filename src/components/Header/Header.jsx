import { useEffect, useReducer, useState } from 'react';
import s from './Header.module.css';
import { useMsal } from '@azure/msal-react';
import { callMe, callPhoto, getAdminGroup, getAdminMembers, getGroups, getStructureCompany } from '../../api/graph';
import { loginRequest } from '../../authConfig';
import settingIcon from '../../assets/img/icons/settings-icon.svg';
import searchIcon from '../../assets/img/icons/search-icon.svg';
import logo from '../../assets/img/Frame 40.png';
import { NavLink } from 'react-router-dom';
import { devMode, sendUserProfile } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setAdmin, setUser } from '../../store/userSlice';
import { fetchSeenNews } from '../../store/thunks';
import Cookies from 'js-cookie';
import NotificationModule from '../NotificationModule/NotificationModule';
import { msalInstance } from '../..';
import ShoppingCartModule from '../ShoppingCartModule/ShoppingCartModule';
import SoftCoinModule from '../SoftCoinModule/SoftCoinModule';

const Header = ({ toggleMobileMode, mobileMode }) => {
	const dispatch = useDispatch();
	const { instance, accounts } = useMsal();
	let [urlImg, setUrlImg] = useState(null);
	let [graphData, setGraphData] = useState(null);

	function RequestProfilePhoto() {
		instance
			.acquireTokenSilent({
				...loginRequest,
				account: accounts[0],
			})
			.then((response) => {
				callPhoto(response.accessToken)
					.then((response) => response.blob())
					.then((result) => {
						const url = window.URL || window.webkitURL;
						const blobUrl = url.createObjectURL(result);
						setUrlImg(blobUrl);
					});
			});
	}

	async function RequestProfileData() {
		const accounts1 = msalInstance.getAllAccounts();
		if (!accounts1 || accounts1.length === 0) {
			alert('No user account found');
		}
		try {
			let response = await msalInstance.acquireTokenSilent({
				...loginRequest,
				account: accounts1[0],
			});
			let result = await callMe(response.accessToken);
			setGraphData(result);
		} catch (error) {
			msalInstance.acquireTokenRedirect({
				...loginRequest,
				account: accounts1[0],
			});
		}
	}

	function RequestAdminsGroupData() {
		instance
			.acquireTokenSilent({
				...loginRequest,
				account: accounts[0],
			})
			.then((response) => {
				getAdminMembers(response.accessToken)
					.then((response) => {
						return response.json();
					})
					.then((result) => {
						let adminStatus = result.value.find(({ id }) => id === graphData.id);
						if (adminStatus) {
							dispatch(setAdmin('isAdmin'));
						} else {
							dispatch(setAdmin('notAdmin'));
						}
						return result;
					});
			});
	}

	// function RequestAdminsGroupName() {
	// 	instance
	// 		.acquireTokenSilent({
	// 			...loginRequest,
	// 			account: accounts[0],
	// 		})
	// 		.then((response) => {
	// 			getAdminGroup(response.accessToken)
	// 				.then((response) => {
	// 					console.log(response);
	// 					return response.json();
	// 				})
	// 				.then((result) => {
	// 					console.log(result);
	// 				});
	// 		});
	// }

	useEffect(() => {
		RequestProfileData();
		RequestProfilePhoto();
	}, []);

	useEffect(() => {
		if (accounts.length > 0 && graphData) {
			dispatch(setUser(graphData));
			dispatch(fetchSeenNews(graphData.id));
			sendUserProfile(graphData);
			RequestAdminsGroupData();
		}
	}, [graphData]);

	return (
		<header>
			<div className={`content-container ${s.header} `}>
				<div className={s.header_column}>
					<NavLink to="/" className={s.header_logo}>
						<img src={logo} alt="" />
					</NavLink>

					{/* Панель ПОШУКУ */}
					{/* <div className={s.header_search}>
						<button>
							<img src={searchIcon} alt="bell icon" />
						</button>
						<input type="text" placeholder="Пошук тут..." />
					</div> */}
				</div>
				<div className={s.header_column}>
					{/* КНОПКА НАЛАШТУВАННЯ */}
					<div className={s.header_btns}>
						{/*	<a href="">
							<img src={settingIcon} alt="setting icon" />
						</a>*/}
						{devMode && <SoftCoinModule desctop={true} />}
						{devMode && <ShoppingCartModule toggleMobileMode={toggleMobileMode} mobileMode={mobileMode} />}
						<NotificationModule toggleMobileMode={toggleMobileMode} mobileMode={mobileMode} />
					</div>
					<div className={s.header_profile}>
						{urlImg && <img src={`${urlImg}`} alt="" />}
						{graphData && (
							<div>
								<p>{graphData.displayName}</p>
								<p>{graphData.jobTitle}</p>
							</div>
						)}
					</div>
					<div className={`${s.header_mobile__button}`}>
						<button className={`${mobileMode && s.visible}`} onClick={(e) => toggleMobileMode((button) => !button)}>
							<span></span>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
