import { useEffect, useReducer, useState } from 'react';
import s from './Header.module.css';
import { useMsal } from '@azure/msal-react';
import { callMe, callPhoto, getStructureCompany } from '../../api/graph';
import { loginRequest } from '../../authConfig';
import settingIcon from '../../assets/img/icons/settings-icon.svg';
import bellIcon from '../../assets/img/icons/bell-icon.svg';
import searchIcon from '../../assets/img/icons/search-icon.svg';
import logo from '../../assets/img/Frame 40.png';
import { NavLink } from 'react-router-dom';
import { sendUserProfile } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';

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

	function RequestProfileData() {
		instance
			.acquireTokenSilent({
				...loginRequest,
				account: accounts[0],
			})
			.then((response) => {
				callMe(response.accessToken).then((response) => {
					setGraphData(response);
				});
			});
	}

	function RequestStructureData() {
		instance
			.acquireTokenSilent({
				...loginRequest,
				account: accounts[0],
			})
			.then((response) => {
				getStructureCompany(response.accessToken)
					.then((response) => response.json())
					.then((result) => console.log(result));
			});
	}

	useEffect(() => {
		RequestProfileData();
		RequestProfilePhoto();
	}, []);

	useEffect(() => {
		if (accounts.length > 0 && graphData) {
			dispatch(setUser(graphData));
			sendUserProfile(graphData);
			console.log(graphData);
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
					{/* КНОПКИ НАЛАШТУВАННЯ ТА ОПОВІЩЕННЯ */}
					{/* <div className={s.header_btns}>
						<a href="">
							<img src={settingIcon} alt="setting icon" />
						</a>
						<a href="" className={s.active}>
							<img src={bellIcon} alt="bell icon" />
						</a>
					</div> */}
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
