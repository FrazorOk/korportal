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
		<div className={s.news_container}>
			<div className={s.news}>
				{news.length > 0 ? (
					news.map((item, index) => {
						if (index < news.length - 1 && news.length > 0) {
							return <NewsItem item={item} key={index} />;
						}
					})
				) : (
					<p>Нічого не знайдено</p>
				)}
			</div>
		</div>
	);
};

export default NewsList;
