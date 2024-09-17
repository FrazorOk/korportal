import React, { useState } from 'react';
import s from './PageLayout.module.css';
import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';

const PageLayout = (props) => {
	let [sideBarStatus, setSideBarStatus] = useState(false);

	return (
		<div className={s.page_container}>
			<div
				className={s.page_container__left_column}
				onMouseLeave={() => setSideBarStatus(false)}
				onMouseEnter={() => setSideBarStatus(true)}>
				<SideBar status={sideBarStatus} />
			</div>
			<div className={s.page_container__right_column}>
				<Header />
				<div className={s.overflow_container}>
					<div className="content-container">{props.children}</div>
				</div>
			</div>
		</div>
	);
};

export default PageLayout;
