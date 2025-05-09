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
	const [searchParams, setSearchParams] = useSearchParams();

	const step = 5;

	let [data, setData] = useState(false);

	let [isFetching, setFetching] = useState(false);
	let [isFetchingDisable, setFetchingDisable] = useState(false);
	let [isNullStatus, setNullStatus] = useState(false);
	let [isFirstLoad, setFirstLoad] = useState(false);

	let [filterParams, setFilterParams] = useState({ params: 'Усі', tags: false });
	let [fromToNumbers, setFromToNumbers] = useState({ from: 0, to: step });

	let [isEndScroll, setEndScroll] = useState(0);

	const fetchingNewNewsList = async (getDataParams, push = false) => {
		console.log(isEndScroll);

		setFetching(true);

		let result = await getNewsList(getDataParams);
		if (result) {
			if (push) {
				console.log(result);
				if (result.error) {
					setData((dataCur) => [...dataCur, result]);
				} else {
					setData((dataCur) => [...dataCur, ...result]);
				}
			} else {
				setData(result);
			}
			setFetching(false);
			let promise = new Promise((resolve, reject) => {
				setTimeout(() => {
					console.log('heare +');
					setFetchingDisable(false);
					return resolve('готово!');
				}, 500);
			});
			let result2 = await promise;
		} else {
			setFetching(false);
			let promise = new Promise((resolve, reject) => {
				setTimeout(() => {
					console.log('heare -');
					setFetchingDisable(false);
					return resolve('готово!');
				}, 500);
			});
			let result2 = await promise;
			console.log(`error ${result}`);
		}
	};
	const handleScroll = (e) => {
		console.log();

		if (!isFetchingDisable) {
			let block = e.currentTarget;
			// Відступ до кінця блоку
			let y = 10;
			if (Math.ceil(block.scrollTop + block.clientHeight) >= Math.ceil(block.scrollHeight) - y) {
				setFetchingDisable(true);
			}
		} else {
			console.log('no');
		}
	};

	let getDataParams = {
		userID: user.id,
		fromNumber: fromToNumbers.from,
		limitNumber: fromToNumbers.to,
		filterType: filterParams.params,
		tagsStatus: filterParams.tags,
		all: 0,
		categoryID: 1,
	};

	useEffect(() => {
		let el = document.querySelector('.main-scroll-block');
		el.addEventListener('scroll', (e) => handleScroll(e));
		return () => {
			el.removeEventListener('scroll', (e) => handleScroll(e));
		};
	}, []);

	useEffect(() => {
		let filterParam = searchParams.get('filter');

		if (user && user.id && !filterParam) {
			setData(false);
			fetchingNewNewsList(getDataParams);
		}
	}, [user]);

	useEffect(() => {
		if (user && user.id) {
			console.log('im heare');

			setNullStatus(true);
			setFetchingDisable(false);
			setData(false);
			setEndScroll(0);
			setFromToNumbers({ from: 0, to: step });
		}
	}, [filterParams]);

	useEffect(() => {
		if (isNullStatus && !data && isEndScroll === 0 && fromToNumbers.from === 0) {
			setNullStatus(false);
			fetchingNewNewsList(getDataParams);
		}
	}, [isNullStatus, data, isEndScroll, fromToNumbers]);

	useEffect(() => {
		if (isFetchingDisable) {
			setEndScroll((endScroll) => endScroll + 1);
		}
	}, [isFetchingDisable]);

	useEffect(() => {
		if (isEndScroll > 0 && data && !isNullStatus) {
			setFromToNumbers({ from: isEndScroll * step, to: step });
		}
	}, [isEndScroll]);

	useEffect(() => {
		if (isEndScroll > 0 && data && user && user.id && !isNullStatus && data[data.length - 1] && !data[data.length - 1].error) {
			fetchingNewNewsList(getDataParams, true);
		}
	}, [fromToNumbers]);

	useEffect(() => {
		let filterParam = searchParams.get('filter');

		console.log(filterParam);

		if (!isFirstLoad && filterParam && filterParam === 'noviews' && user && user.id) {
			console.log(isFirstLoad);

			setFirstLoad(true);
			setFilterParams({ params: 'Не переглянуті', tags: false });
		}
	}, [searchParams, user]);

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
