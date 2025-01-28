import { memo, useEffect, useState } from 'react';
import s from './VivoChatSection.module.css';
import NewsList from '../NewsList/NewsList';
import { getNews } from '../../api/api';
import NewsFilter from '../NewsFilter/NewsFilter';
import arrowLinkIcon from '../../assets/img/icons/redirect-icon.svg';
import { Link } from 'react-router-dom';

const VivoChatSection = ({ ref1, adminStatus, title, fullScreen }) => {
	let [data, setData] = useState([]);
	let [tags, setTags] = useState([]);
	let [filterParams, setFilterParams] = useState({ params: 'Усі', tags: false });
	let [todayPosts, setTodayPosts] = useState(0);
	let [noSeenPotsLength, setNoSeenPotsLength] = useState(0);

	useEffect(() => {
		getNews(setData);
		let interval = setInterval(() => {
			getNews(setData);
		}, 300000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div ref={ref1} className={`${s.chat} section-container ${fullScreen && s.full_screen}`}>
			{title && (
				<Link className="title_link" title="Перейти" to={'feed-news'}>
					<h3>Стрічка останніх новин</h3>
					<img src={arrowLinkIcon} alt="" />
				</Link>
			)}

			<NewsFilter
				noSeenPotsLength={noSeenPotsLength}
				tags={tags}
				setFilterParams={setFilterParams}
				todayPosts={todayPosts}
				setData={setData}
				fullScreen={fullScreen}
			/>
			<NewsList
				setNoSeenPotsLength={setNoSeenPotsLength}
				adminStatus={adminStatus}
				setTags={setTags}
				data={data}
				filterParams={filterParams}
				setTodayPosts={setTodayPosts}
				fullScreen={fullScreen}
			/>
		</div>
	);
};

export default memo(VivoChatSection);
