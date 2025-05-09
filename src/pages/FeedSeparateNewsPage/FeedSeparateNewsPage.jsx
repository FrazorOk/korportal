import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getNewsFromID } from '../../api/api';
import { useScrollToTop } from '../../hooks/scrollToTop';
import NewsItem from '../../components/NewsItem/NewsItem';
import GoBackButton from '../../components/UI/GoBackButton/GoBackButton';
import NewsItemLow from '../../components/NewsItemLow/NewsItemLow';

const FeedSeparateNewsPage = () => {
	let { newsId } = useParams();
	let [data, setData] = useState(null);

	useScrollToTop();

	useEffect(() => {
		if (newsId) {
			let getNews = async () => {
				let result = await getNewsFromID(newsId);

				setData(result[0]);
			};
			getNews();
		}
	}, [newsId]);

	return (
		<div style={{ maxWidth: '1000px', margin: '0 auto' }}>
			<h1>Стрічка останніх подій</h1>

			<GoBackButton toLink={'/feed-news'} />

			<div className="row">
				{data ? (
					<NewsItemLow item={data} filterParams={true} adminStatus={false} fullScreen={true} viewed={true} />
				) : (
					<p style={{ color: '#7d7d7d' }}>Подію не знайдено</p>
				)}
			</div>
		</div>
	);
};

export default FeedSeparateNewsPage;
