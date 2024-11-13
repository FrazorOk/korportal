import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminPostSection from './AdminPostSection/AdminPostSection';
import { getNewsFromID } from '../../api/api';

const AdminAddChangeNewsPage = () => {
	let { newsId } = useParams();
	let [data, setData] = useState({});

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
		<div>
			{newsId ? <h1>Редагування події</h1> : <h1>Створення нової події</h1>}
			<div className="row">
				<div className="column-50">
					<AdminPostSection newsId={newsId} data={data} />
				</div>
			</div>
		</div>
	);
};

export default AdminAddChangeNewsPage;
