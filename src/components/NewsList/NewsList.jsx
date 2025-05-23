import { memo, useEffect, useState } from 'react';
import s from './NewsList.module.css';
import NewsItem from '../NewsItem/NewsItem';
import circleArrowIcon from '../../assets/img/icons/circle-arrow-icon.svg';
import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';
import NewsItemLow from '../NewsItemLow/NewsItemLow';

const toDay = new Date().toJSON().slice(0, 10);

const NewsList = ({ data, setTags, filterParams, setTodayPosts, setNoSeenPotsLength, adminStatus, fullScreen }) => {
	const indexStep = 10;
	let [news, setNews] = useState([]);
	let [visibleNews, setVisibleNews] = useState([]);

	let [paginationNews, setPaginationNews] = useState([]);
	let [stepPagination, setStepPagination] = useState(1);

	let userSeenNews = useSelector(userSelector.userSeenNews);

	const getTodayPostsLength = () => {
		if (news && news.length > 0) return news.filter((el, index) => index < data.length - 1 && el.pub_date.slice(0, 10) === toDay);
	};
	const getNotSeenPosts = () => {
		if (news && news.length > 0)
			return news.filter((el, index) => {
				if (el) {
					let found = userSeenNews.find((item) => item === el.id);

					if (found) {
						return false;
					} else {
						return true;
					}
				}
			});
	};
	const getUniqueTags = (arr) => {
		if (arr && arr.length > 0) {
			let concatedArray = [];

			arr.forEach((element, index) => {
				if (element && index !== arr.length - 1 && element.tags) {
					concatedArray = [...concatedArray, ...element.tags];
				}
			});

			let uniqueTags = [...new Set(concatedArray)];
			// Для видалення нуьовногу тегу
			let filteredTagsFromNull = uniqueTags.filter((tag) => tag.length > 0);

			return filteredTagsFromNull;
		}
	};
	const getFilteredNews = () => {
		if (filterParams.tags) {
			let filteredArray = news.filter((el, index) => {
				if (index < data.length - 1 && el.tags) {
					let statusTags = false;

					el.tags.forEach((item) => {
						if (!statusTags) {
							if (filterParams.params === item) {
								statusTags = true;
							} else {
								statusTags = false;
							}
						}
					});

					return statusTags;
				}
			});
			return (filteredArray = [...filteredArray, null]);
		} else {
			if (filterParams.params === 'Усі') {
				return news;
			}
			if (filterParams.params === 'Сьогодні') {
				let filteredArray = getTodayPostsLength();

				if (filteredArray && filteredArray.length > 0) {
					return (filteredArray = [...filteredArray, null]);
				}
			}
			if (filterParams.params === 'Не переглянуті') {
				if (news && news.length > 0) {
					let filteredArray = getNotSeenPosts();
					if (filteredArray && filteredArray.length > 0) {
						return (filteredArray = [...filteredArray, null]);
					}
				}
			}
			if (filterParams.params === 'Популярне') {
				if (news && news.length > 0) {
					let currentArray = news.map((el, index) => {
						if (index !== news.length - 1) {
							return el;
						}
					});
					currentArray.pop();

					function compare(a, b) {
						let aReactions = 0;
						let aComments = 0;
						let bReactions = 0;
						let bComments = 0;

						if (a.reaction) {
							aReactions = a.reaction.length;
						}
						if (a.comment) {
							aComments = a.comment.length;
						}
						if (b.reaction) {
							bReactions = b.reaction.length;
						}
						if (b.comment) {
							bComments = b.comment.length;
						}

						if (aReactions * 1 + aComments * 1 < bReactions * 1 + bComments * 1) {
							return 1;
						}
						if (aReactions * 1 + aComments * 1 > bReactions * 1 + bComments * 1) {
							return -1;
						}
						return 0;
					}
					let filteredArray = currentArray.sort(compare);

					return (filteredArray = [...filteredArray, null]);
				}
			}
		}
	};
	const getPaginationNews = () => {
		if (visibleNews && visibleNews.length > 0) {
			if (stepPagination * indexStep > visibleNews.length - 1) {
				setPaginationNews((arr) => [...visibleNews.slice(0, visibleNews.length)]);
			} else {
				setPaginationNews((arr) => [...visibleNews.slice(0, stepPagination * indexStep)]);
			}
		}
	};

	useEffect(() => {
		setNews(data);
		setTags(getUniqueTags(data));
	}, [data]);

	useEffect(() => {
		getTodayPostsLength() && setTodayPosts(getTodayPostsLength().length);
		setVisibleNews(getFilteredNews());
		setStepPagination(1);
	}, [news, filterParams]);

	useEffect(() => {
		getPaginationNews();
	}, [visibleNews, stepPagination]);

	// change counter not seen posts
	useEffect(() => {
		if (userSeenNews && news.length > 0) {
			let foundNotSeenPosts = getNotSeenPosts();

			setNoSeenPotsLength(foundNotSeenPosts.length);
		}
	}, [userSeenNews, news, filterParams]);

	const addMoreNewsHandler = () => {
		setStepPagination((count) => count + 1);
	};

	return (
		<div className={`${s.news_container} ${fullScreen && s.full_screen}`}>
			<div className={s.news}>
				{paginationNews && paginationNews[0] && paginationNews.length > 0 && visibleNews ? (
					paginationNews.map((item, index) => {
						if (item && paginationNews && index < visibleNews.length - 1 && paginationNews.length > 0) {
							return <NewsItem adminStatus={adminStatus} item={item} key={item.id} filterParams={filterParams} fullScreen={fullScreen} />;
						}
					})
				) : (
					<p style={{ marginTop: '20px', color: 'rgb(125, 125, 125)' }}>Немає новин</p>
				)}
			</div>
			{news && visibleNews && visibleNews.length > paginationNews.length + 1 && (
				<div className={s.add_more_btn_container}>
					<button onClick={addMoreNewsHandler} className={s.add_more_btn}>
						<img src={circleArrowIcon} alt="" />
						<p>Завантажити ще</p>
					</button>
				</div>
			)}
		</div>
	);
};

export default memo(NewsList);
