import s from './NotificationModule.module.css';
import bellIcon from '../../assets/img/icons/bell-icon.svg';
import newsIcon from '../../assets/img/icons/fi-rs-apps.svg';
import { useEffect, useState } from 'react';
import { getNews } from '../../api/api';
import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { getNewsList } from '../../api/apiNews';

const NotificationModule = ({ mobileMode, toggleMobileMode }) => {
	let userSeenNews = useSelector(userSelector.userSeenNews);
	let user = useSelector(userSelector.userData);

	let [isOpenedStatus, setOpenedStatus] = useState(false);

	let [isUnVisibleCount, setUnVisibleCount] = useState(0);

	let getDataParams = (filterType) => {
		return {
			userID: user.id,
			fromNumber: 0,
			limitNumber: 100,
			filterType: filterType,
			qt: true,
			all: 0,
			categoryID: 1,
		};
	};

	useEffect(() => {
		if (user && user.id) {
			getNewsList(getDataParams('Не переглянуті')).then((result) => {
				setUnVisibleCount(result.qt);
			});
		}
	}, [user, userSeenNews]);

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
			<button onClick={linkOnClickHandler} title="Сповіщення" className={`${s.notification_btn} ${isUnVisibleCount > 0 && s.red_circle}`}>
				<img src={bellIcon} alt="bell icon" />
			</button>

			<div className={s.notification_body}>
				<p className={s.body_title}>Сповіщення ({isUnVisibleCount ? isUnVisibleCount : 0})</p>
				<div className={s.body_list}>
					{isUnVisibleCount > 0 ? (
						<a onClick={() => setOpenedStatus(false)} href={'/feed-news?filter=noviews'} className={s.body_link}>
							<img src={newsIcon} alt="" />
							<span>Непереглянуті новини ({isUnVisibleCount ? isUnVisibleCount : 0})</span>
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
