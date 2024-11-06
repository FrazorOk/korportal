import { useEffect, useState } from 'react';
import s from './NewsFilter.module.css';
import { getNews } from '../../api/api';

const NewsFilter = ({ tags, setFilterParams, todayPosts, setData }) => {
	let [activeButton, setActiveButton] = useState(0);

	return (
		<div className={s.filters}>
			<div className={`${s.filters_row} ${s.params}`}>
				<button
					title="Усі події"
					onClick={(e) => {
						async function onClickHandler(e) {
							await setActiveButton(0);
							await getNews(setData);
							setFilterParams({ params: e.target.textContent, tags: false });
						}
						onClickHandler(e);
					}}
					className={activeButton === 0 ? s.active : ''}>
					Усі
				</button>
				<button
					title="Фільтрувати за сьогодні"
					onClick={(e) => {
						async function onClickHandler(e) {
							await setActiveButton(1);
							await getNews(setData);
							setFilterParams({ params: 'Сьогодні', tags: false });
						}
						onClickHandler(e);
					}}
					className={activeButton === 1 ? s.active : ''}>
					Сьогодні ({todayPosts})
				</button>
				<button
					title="Сортувати за популярністю"
					onClick={(e) => {
						async function onClickHandler(e) {
							await setActiveButton(2);
							await getNews(setData);
							setFilterParams({ params: e.target.textContent, tags: false });
						}
						onClickHandler(e);
					}}
					className={activeButton === 2 ? s.active : ''}>
					Популярне
				</button>
			</div>
			<div className={`${s.filters_row} ${s.tags}`}>
				{tags.map((el, index) => {
					return (
						<button
							title="Фільтрувати за тегом"
							key={`tags buttons ${index}`}
							className={activeButton === index + 3 ? s.active : ''}
							onClick={(e) => {
								async function onClickHandler(e) {
									await setActiveButton(index + 3);
									await getNews(setData);
									setFilterParams({ params: e.target.textContent, tags: true });
								}
								onClickHandler(e);
							}}>
							{el}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default NewsFilter;
