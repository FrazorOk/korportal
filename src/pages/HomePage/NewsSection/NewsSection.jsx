import s from './NewsSection.module.css';
import NewsList from './NewsList';
import { memo, useEffect, useState } from 'react';
import { getNews } from '../../../api/api';

const NewsSection = () => {
	let [marketingData, setMarketingData] = useState([]);
	let [companyData, setCompanyData] = useState([]);

	useEffect(() => {
		getNews(setMarketingData, 1, 3);
		getNews(setCompanyData, 1, 4);
		let interval = setInterval(() => {
			getNews(setMarketingData, 1, 3);
			getNews(setCompanyData, 1, 4);
		}, 300000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className={s.news_row}>
			<NewsList listTitle={'Новини маркетингу'} activetab={0} data={marketingData} type="marketing" />
			<NewsList listTitle={'Новини компанії'} activetab={1} data={companyData} type="company" />
			{/* <div className={s.overflow}>
				<p>НЕЗАБАРОМ</p>
			</div> */}
		</div>
	);
};

export default memo(NewsSection);
