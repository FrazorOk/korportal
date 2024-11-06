import { memo } from 'react';
import s from './PlannedNewsSection.module.css';
import PlannedNewsList from '../../../components/PlannedNewsList/PlannedNewsList';

const PlannedNewsSection = () => {
	return (
		<div className={`${s.planned_news} section-container`}>
			<h3>Заплановані</h3>

			<PlannedNewsList />
		</div>
	);
};

export default memo(PlannedNewsSection);
