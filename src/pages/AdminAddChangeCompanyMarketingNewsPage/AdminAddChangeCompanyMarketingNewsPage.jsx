import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getHolidayFromID } from '../../api/api';
import { useRedirectAdmin } from '../../hooks/useRedirectHoook';
import { useScrollToTop } from '../../hooks/scrollToTop';
import GoBackButton from '../../components/UI/GoBackButton/GoBackButton';
import AdminNewsSection from './AdminNewsSection/AdminNewsSection';

const AdminAddChangeCompanyMarketingNewsPage = () => {
	let { statusAdmin } = useRedirectAdmin();
	let { newsId } = useParams();
	let [data, setData] = useState({});
	let [type, setType] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams();

	useScrollToTop();

	useEffect(() => {
		if (newsId && statusAdmin) {
			let getNews = async () => {
				let result = await getHolidayFromID(newsId, type === 'marketing' ? 3 : 4, 2);
				setData(result[0]);
				console.log(result);
			};
			getNews();
		}
	}, [newsId, statusAdmin]);

	useEffect(() => {
		let typeParams = searchParams.get('type');
		if (typeParams) setType(typeParams);
	}, [searchParams]);

	return (
		<>
			{statusAdmin && (
				<div>
					{newsId ? (
						<h1>Редагування новини {type && type === 'marketing' ? 'маркетингу' : 'компанії'}</h1>
					) : (
						<h1>Створення новини {type && type === 'marketing' ? 'маркетингу' : 'компанії'}</h1>
					)}

					<GoBackButton toLink={`/admin-company-marketing-news?activetab=${type && type === 'marketing' ? '0' : '1'}`} />

					<div className="row">
						<div className="column-50">
							<AdminNewsSection newsId={newsId} data={data} type={type} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AdminAddChangeCompanyMarketingNewsPage;
