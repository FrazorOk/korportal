import s from './NewsSection.module.css';
import NewsList from './NewsList';
import { memo } from 'react';

const NewsSection = () => {
	return (
		<div className={s.news_row}>
			<NewsList listTitle={'Новини маркетингу'} />
			<NewsList listTitle={'Новини компанії'} />
		</div>
	);
};

export default memo(NewsSection);
