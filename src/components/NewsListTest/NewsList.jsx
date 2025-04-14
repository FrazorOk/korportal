import { memo, useEffect, useState } from 'react';
import s from './NewsList.module.css';
import NewsItem from '../NewsItem/NewsItem';
import circleArrowIcon from '../../assets/img/icons/circle-arrow-icon.svg';
import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';

const toDay = new Date().toJSON().slice(0, 10);

const NewsList = ({ data, filterParams, adminStatus, fullScreen }) => {
	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<div className={`${s.news_container} ${fullScreen && s.full_screen}`}>
			<div className={s.news}>
				{(data !== false && data.length < 0) || data.error ? (
					<p style={{ marginTop: '20px', color: 'rgb(125, 125, 125)' }}>Немає новин</p>
				) : (
					data.map((item) => {
						if (item && !item.error) {
							return <NewsItem adminStatus={adminStatus} item={item} key={item.id} filterParams={filterParams} fullScreen={fullScreen} />;
						}
						if (item.error) {
							return <p style={{ fontSize: '16px', color: '#7d7d7d' }}>Більше немає новин</p>;
						}
					})
				)}
			</div>
		</div>
	);
};

export default memo(NewsList);
