import PlannedNewsItem from '../PlannedNewsItem/PlannedNewsItem';
import s from './PlannedNewsList.module.css';

const PlannedNewsList = () => {
	return (
		<div className={s.planned_list}>
			<PlannedNewsItem />
		</div>
	);
};

export default PlannedNewsList;
