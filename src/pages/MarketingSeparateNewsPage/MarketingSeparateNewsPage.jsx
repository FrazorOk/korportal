import { useEffect, useState } from 'react';
import GoBackButton from '../../components/UI/GoBackButton/GoBackButton';
import { getHolidayFromID } from '../../api/api';
import { useParams } from 'react-router-dom';
import { useScrollToTop } from '../../hooks/scrollToTop';

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
					<div className="row">
						<div
							className="section-container"
							style={{ maxWidth: '1200px', width: '100%' }}
							dangerouslySetInnerHTML={{ __html: data.html }}></div>
					</div>
				</>
			)}
		</div>
	);
};

export default MarketingSeparateNewsPage;
