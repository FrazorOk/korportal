import { useEffect, useState } from 'react';
import s from './NewsFilter.module.css';
import { getNews } from '../../api/api';

const NewsFilter = ({ tags, setFilterParams, todayPosts, setData, noSeenPotsLength, fullScreen }) => {
	let [activeButton, setActiveButton] = useState(0);
	let [disableStatus, setDisableStatus] = useState(false);

	return (
		<div className={`${s.filters} ${fullScreen && s.full_screen}`}>
			<div className={`${s.filters_row} ${s.params}`}>
				<button
					title="Усі події"
					disabled={disableStatus}
					onClick={(e) => {
						async function onClickHandler(e) {
							await setDisableStatus(true);
							await setActiveButton(0);
							await getNews(setData);
							await setFilterParams({ params: e.target.textContent, tags: false });
							await setDisableStatus(false);
						}
						onClickHandler(e);
					}}
					className={activeButton === 0 ? s.active : ''}>
					Усі
				</button>
				<button
					title="Сортувати за популярністю"
					disabled={disableStatus}
					onClick={(e) => {
						async function onClickHandler(e) {
							await setDisableStatus(true);
							await setActiveButton(1);
							await getNews(setData);
							await setFilterParams({ params: e.target.textContent, tags: false });
							await setDisableStatus(false);
						}
						onClickHandler(e);
					}}
					className={activeButton === 1 ? s.active : ''}>
					Популярне
				</button>
				<button
					title="Фільтрувати за сьогодні"
					disabled={disableStatus}
					onClick={(e) => {
						async function onClickHandler(e) {
							await setDisableStatus(true);
							await setActiveButton(2);
							await getNews(setData);
							await setFilterParams({ params: 'Сьогодні', tags: false });
							await setDisableStatus(false);
						}
						onClickHandler(e);
					}}
					className={activeButton === 2 ? s.active : ''}>
					Сьогодні ({todayPosts})
				</button>
				<button
					title="Фільтрувати за переглядом"
					disabled={disableStatus}
					onClick={(e) => {
						async function onClickHandler(e) {
							await setDisableStatus(true);
							await setActiveButton(3);
							await getNews(setData);
							await setFilterParams({ params: 'Не переглянуті', tags: false });
							await setDisableStatus(false);
						}
						onClickHandler(e);
					}}
					className={`${activeButton === 3 ? s.active : ''} ${noSeenPotsLength > 0 ? s.nonSeen : ''}`}>
					Не переглянуті ({noSeenPotsLength})
				</button>
			</div>
			<div className={`${s.filters_row} ${s.tags}`}>
				{tags &&
					tags.length > 0 &&
					tags.map((el, index) => {
						return (
							<button
								title="Фільтрувати за тегом"
								disabled={disableStatus}
								key={`tags buttons ${index}`}
								className={activeButton === index + 4 ? s.active : ''}
								onClick={(e) => {
									async function onClickHandler(e) {
										await setDisableStatus(true);
										await setActiveButton(index + 4);
										await getNews(setData);
										await setFilterParams({ params: e.target.textContent, tags: true });
										await setDisableStatus(false);
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
