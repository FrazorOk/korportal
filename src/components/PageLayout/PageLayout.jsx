import React, { useState } from 'react';
import s from './PageLayout.module.css';
import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';
import UserInfoModalWindow from '../UserInfoModalWindow/UserInfoModalWindow';

const PageLayout = (props) => {
	let [sideBarStatus, setSideBarStatus] = useState(false);
	let [mobileMode, toggleMobileMode] = useState(false);

	return (
		<div className={s.page_container}>
			<div
				className={`${s.page_container__left_column} ${mobileMode && s.visible}`}
				onMouseLeave={() => setSideBarStatus(false)}
				onMouseEnter={() => setSideBarStatus(true)}>
				<SideBar status={sideBarStatus} toggleMobileMode={toggleMobileMode} />
			</div>
			<div className={s.page_container__right_column}>
				<Header toggleMobileMode={toggleMobileMode} mobileMode={mobileMode} />
				<div className={`${s.overflow_container} main-scroll-block`}>
					<div className="content-container">{props.children}</div>
				</div>
			</div>

			<UserInfoModalWindow />
		</div>
	);
};

export default PageLayout;
