import { memo, useEffect, useState } from 'react';
import s from './PlannedNewsSection.module.css';
import PlannedNewsList from '../../../components/PlannedNewsList/PlannedNewsList';
import { getNews } from '../../../api/api';

const PlannedNewsSection = () => {
	let [data, setData] = useState(null);

	useEffect(() => {
		getNews(setData, 2);
		let interval = setInterval(() => {
			getNews(setData, 2);
		}, 300000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className={`${s.planned_news} section-container`}>
			<h3>Заплановані</h3>

			<PlannedNewsList data={data} />
		</div>
	);
};

export default memo(PlannedNewsSection);
