import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminPostSection from './AdminPostSection/AdminPostSection';
import { getNewsFromID } from '../../api/api';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import { useRedirectAdmin } from '../../hooks/useRedirectHook';
import { useScrollToTop } from '../../hooks/scrollToTop';

const AdminAddChangeNewsPage = () => {
	let { statusAdmin } = useRedirectAdmin();
	let { newsId } = useParams();
	let [data, setData] = useState({});

	useScrollToTop();
	useEffect(() => {
		if (newsId && statusAdmin) {
			let getNews = async () => {
				let result = await getNewsFromID(newsId, null, null, 2);
				setData(result[0]);
			};
			getNews();
		}
	}, [newsId, statusAdmin]);

	return (
		<>
			{statusAdmin && (
				<div>
					{newsId ? <h1>Редагування події</h1> : <h1>Створення нової події</h1>}
					<div style={{ marginTop: '30px' }}>
						<Link style={{ display: 'flex', gap: '4px', alignItems: 'center', width: 'fit-content' }} to="/admin-news-feed/">
							<img style={{ transform: 'rotate(90deg)' }} src={arrowIcon} alt="" />
							<p style={{ color: '#7d7d7d', fontWeight: '500' }}>Повернутися</p>
						</Link>
					</div>
					<div className="row">
						<div className="column-50">
							<AdminPostSection newsId={newsId} data={data} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AdminAddChangeNewsPage;
