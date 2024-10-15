import { useEffect, useState } from 'react';
import s from './NewsList.module.css';
import NewsItem from '../NewsItem/NewsItem';

const NewsList = ({ data }) => {
	let [news, setNews] = useState([]);

	useEffect(() => {
		setNews(data);
	}, [data]);

	useEffect(() => {
		if (news.length > 0) {
			console.log(data);
		}
	}, [news]);

	return (
		<div className={s.news}>
			{news.map((item, index) => {
				if (index < news.length - 1 && news.length > 0) {
					return <NewsItem item={item} key={index} />;
				}
			})}
		</div>
	);
};

export default NewsList;
