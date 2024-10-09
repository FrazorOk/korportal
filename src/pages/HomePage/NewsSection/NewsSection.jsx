import s from './NewsSection.module.css';
import NewsList from './NewsList';

const NewsSection = () => {
	return (
		<div className={`${s.news}`}>
			<div className={s.news_row}>
				<NewsList listTitle={'Новини маркетингу'} />
				<NewsList listTitle={'Новини компанії'} />
			</div>
		</div>
	);
};

export default NewsSection;
