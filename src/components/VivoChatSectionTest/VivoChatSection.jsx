import { memo, useEffect, useState } from 'react';
import s from './VivoChatSection.module.css';
import NewsList from '../NewsListTest/NewsList';
import { getNews } from '../../api/api';
import NewsFilter from '../NewsFilterTest/NewsFilter';
import arrowLinkIcon from '../../assets/img/icons/redirect-icon.svg';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';
import Loader from '../UI/Loader/Loader';
import { getNewsList } from '../../api/apiNews';

const VivoChatSection = ({ ref1, adminStatus, title, fullScreen }) => {
	let user = useSelector(userSelector.userData);

	let [data, setData] = useState(false);
	let [isFetching, setFetching] = useState(false);

	let [filterParams, setFilterParams] = useState({ params: 'Усі', tags: false });
	let [fromToNumbers, setFromToNumbers] = useState({ from: 0, to: 20 });

	const fetchingNewNewsList = async (getDataParams) => {
		setFetching(true);
		let result = await getNewsList(getDataParams);
		if (result) {
			setData(result);
			setFetching(false);
		} else {
			setFetching(false);
			console.log(`error ${result}`);
		}
	};

	useEffect(() => {
		let getDataParams = {
			userID: user.id,
			fromNumber: fromToNumbers.from,
			limitNumber: fromToNumbers.to,
			filterType: filterParams.params,
			all: 0,
			categoryID: 1,
		};

		if (user && user.id) {
			setData(false);
			fetchingNewNewsList(getDataParams);
		}

		// let interval = setInterval(() => {
		// 	getNews(setData);
		// }, 300000);
		// return () => {
		// 	clearInterval(interval);
		// };
	}, [user, filterParams]);

	useEffect(() => {}, []);

	// const [searchParams, setSearchParams] = useSearchParams();
	// useEffect(() => {
	// 	let filterParam = searchParams.get('filter');
	// 	if (!isFirstLoad && filterParam && filterParam === 'noviews' && data && data.length > 0 && userSeenNews) {
	// 		setFirstLoad(true);
	// 		setFilterParams({ params: 'Не переглянуті', tags: false });
	// 	}
	// }, [data, searchParams, userSeenNews]);

	return (
		<div ref={ref1} className={`${s.chat} section-container ${fullScreen && s.full_screen}`}>
			{title && (
				<Link className="title_link" title="Перейти" to={'feed-news'}>
					<h3>Стрічка останніх новин</h3>
					<img src={arrowLinkIcon} alt="" />
				</Link>
			)}
			<NewsFilter isFetching={isFetching} setFilterParams={setFilterParams} fullScreen={fullScreen} />
			{data !== false && <NewsList adminStatus={adminStatus} data={data} fullScreen={fullScreen} filterParams={filterParams} />}
			{isFetching && (
				<div style={{ width: '100%', height: '100px', position: 'relative', marginTop: '40px' }}>
					<Loader />
				</div>
			)}
		</div>
	);
};

export default memo(VivoChatSection);
