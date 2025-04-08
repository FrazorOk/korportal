import { memo, useEffect, useState } from 'react';
import s from './NewsList.module.css';
import NewsItem from '../NewsItem/NewsItem';
import circleArrowIcon from '../../assets/img/icons/circle-arrow-icon.svg';
import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';

const toDay = new Date().toJSON().slice(0, 10);

const NewsList = ({ data, filterParams, adminStatus, fullScreen }) => {
	return (
		<div className={`${s.news_container} ${fullScreen && s.full_screen}`}>
			<div className={s.news}>
				{(data !== false && data.length < 0) || data.error ? (
					<p style={{ marginTop: '20px', color: 'rgb(125, 125, 125)' }}>Немає новин</p>
				) : (
					data.map((item) => {
						if (item) {
							return <NewsItem adminStatus={adminStatus} item={item} key={item.id} filterParams={filterParams} fullScreen={fullScreen} />;
						}
					})
				)}
			</div>
		</div>
	);
};

export default memo(NewsList);
