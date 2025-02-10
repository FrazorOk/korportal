import { useEffect, useState } from 'react';
import GoBackButton from '../../components/UI/GoBackButton/GoBackButton';
import { getHolidayFromID } from '../../api/api';
import { useParams } from 'react-router-dom';
import { useScrollToTop } from '../../hooks/scrollToTop';
import HtmlSectionNews from '../../components/HtmlSectionNews/HtmlSectionNews';

const MarketingSeparateNewsPage = () => {
	let { newsId } = useParams();
	let [data, setData] = useState(null);

	useScrollToTop();

	useEffect(() => {
		if (newsId) {
			let getNews = async () => {
				let result = await getHolidayFromID(newsId, 3);

				setData(result[0]);
			};
			getNews();
		}
	}, [newsId]);

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<div>
			{data && (
				<>
					<h1>{data.title}</h1>
					<GoBackButton toLink={'/company-marketing-news?activetab=0'} />
					<HtmlSectionNews htmlBody={data.html} />
				</>
			)}
		</div>
	);
};

export default MarketingSeparateNewsPage;
