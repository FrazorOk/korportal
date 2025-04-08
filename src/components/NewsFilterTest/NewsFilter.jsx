import { useEffect, useState } from 'react';
import s from './NewsFilter.module.css';
import { useSearchParams } from 'react-router-dom';

const btsArray = [
	{
		textBtn: 'Усі',
		title: 'Усі події',
	},
	{
		textBtn: 'Популярне',
		title: 'Сортувати за популярністю',
	},
	{
		textBtn: 'Сьогодні',
		title: 'Фільтрувати за сьогодні',
	},
	{
		textBtn: 'Не переглянуті',
		title: 'Фільтрувати за переглядом',
	},
];

const NewsFilter = ({ setFilterParams, fullScreen, isFetching }) => {
	let [activeButton, setActiveButton] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		let filterParam = searchParams.get('filter');
		if (filterParam === 'noviews') {
			setActiveButton(3);
		}
	}, [searchParams]);

	return (
		<div className={`${s.filters} ${fullScreen && s.full_screen}`}>
			<div className={`${s.filters_row} ${s.params}`}>
				{btsArray.map((item, index) => (
					<button
						title={item.title}
						disabled={isFetching}
						onClick={(e) => {
							async function onClickHandler(e) {
								await setFilterParams({ params: e.target.textContent, tags: false });
								setActiveButton(index);
							}
							onClickHandler(e);
						}}
						className={`${activeButton === index ? s.active : ''} ${index === 3 && s.nonSeen}`}>
						{item.textBtn}
					</button>
				))}
			</div>
		</div>
	);
};

export default NewsFilter;
