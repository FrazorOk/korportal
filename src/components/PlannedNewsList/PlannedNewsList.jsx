import { useEffect, useRef } from 'react';
import PlannedNewsItem from '../PlannedNewsItem/PlannedNewsItem';
import s from './PlannedNewsList.module.css';

const PlannedNewsList = ({ data }) => {
	return (
		<div className={s.planned_list}>
			{data && !data.error && data.length > 0 && data.map((item) => item && <PlannedNewsItem key={item.id} data={item} />)}
			{data && data.error && <p style={{ color: '#7d7d7d' }}>Немає запланованих подій</p>}
		</div>
	);
};

export default PlannedNewsList;
