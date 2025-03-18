import s from './NotificationModule.module.css';
import bellIcon from '../../assets/img/icons/bell-icon.svg';
import newsIcon from '../../assets/img/icons/fi-rs-apps.svg';
import { useEffect, useState } from 'react';
import { getNews } from '../../api/api';
import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const NotificationModule = ({ mobileMode, toggleMobileMode }) => {
	let [isOpenedStatus, setOpenedStatus] = useState(false);
	let [data, setData] = useState([]);
	let [isNoSeenPotsLength, setNoSeenPotsLength] = useState(0);
	let userSeenNews = useSelector(userSelector.userSeenNews);

	useEffect(() => {
		getNews(setData);
		let interval = setInterval(() => {
			getNews(setData);
		}, 300000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	useEffect(() => {
		if (data && data.length > 0 && userSeenNews) {
			let result = data.filter((el, index) => {
				if (el) {
					let found = userSeenNews.find((item) => item === el.id);

					if (found) {
						return false;
					} else {
						return true;
					}
				}
			});
			setNoSeenPotsLength(result.length);
		}
	}, [data, userSeenNews]);

	useEffect(() => {
		mobileMode && setOpenedStatus(false);
	}, [mobileMode]);

	const linkOnClickHandler = () => {
		mobileMode && toggleMobileMode((button) => !button);
		setOpenedStatus((status) => !status);
	};

	return (
		<div
			className={`${s.notification_container} ${isOpenedStatus && s.active}`}
			ref={useOutsideClick(() => isOpenedStatus && setOpenedStatus(false))}>
			<button onClick={linkOnClickHandler} title="Сповіщення" className={`${s.notification_btn} ${isNoSeenPotsLength > 0 && s.red_circle}`}>
				<img src={bellIcon} alt="bell icon" />
			</button>

			<div className={s.notification_body}>
				<p className={s.body_title}>Сповіщення ({isNoSeenPotsLength})</p>
				<div className={s.body_list}>
					{isNoSeenPotsLength > 0 ? (
						<a onClick={() => setOpenedStatus(false)} href={'/feed-news?filter=noviews'} className={s.body_link}>
							<img src={newsIcon} alt="" />
							<span>Непереглянуті новини ({isNoSeenPotsLength})</span>
						</a>
					) : (
						<p style={{ color: '#7d7d7d' }}>Немає нових сповіщень</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default NotificationModule;
